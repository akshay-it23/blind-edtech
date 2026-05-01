import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Plus, Trash2, GripVertical, CheckCircle2, Clock, ListTodo } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function KanbanBoard() {
  const [columns, setColumns] = useState({
    todo: {
      id: "todo",
      title: "To Do",
      icon: <ListTodo className="text-rose-400" />,
      items: [
        { id: "task-1", content: "Master 'A' and 'B' signs" },
        { id: "task-2", content: "Complete Biology Quiz" },
      ]
    },
    progress: {
      id: "progress",
      title: "In Progress",
      icon: <Clock className="text-amber-400" />,
      items: [
        { id: "task-3", content: "Watching Visual Storytelling" },
      ]
    },
    done: {
      id: "done",
      title: "Completed",
      icon: <CheckCircle2 className="text-emerald-400" />,
      items: [
        { id: "task-4", content: "Installed MediaPipe" },
      ]
    }
  });

  const [newTask, setNewTask] = useState("");

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceCol = columns[source.droppableId];
      const destCol = columns[destination.droppableId];
      const sourceItems = [...sourceCol.items];
      const destItems = [...destCol.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceCol, items: sourceItems },
        [destination.droppableId]: { ...destCol, items: destItems }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: { ...column, items: copiedItems }
      });
    }
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const item = { id: `task-${Date.now()}`, content: newTask };
    setColumns({
      ...columns,
      todo: { ...columns.todo, items: [...columns.todo.items, item] }
    });
    setNewTask("");
  };

  return (
    <div className="flex flex-col gap-8 text-white h-full">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center bg-white/5 p-6 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md"
      >
        <div>
          <h2 className="text-3xl font-black tracking-tight">Today's Focus</h2>
          <p className="text-gray-400">Manage your learning tasks for today</p>
        </div>
        <div className="flex gap-3">
          <input 
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What's next?"
            className="bg-white/10 border border-white/20 rounded-2xl px-6 py-3 outline-none focus:border-indigo-500 min-w-[300px] transition-all"
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addTask}
            className="bg-indigo-600 p-4 rounded-2xl hover:bg-indigo-500 transition-colors shadow-lg"
          >
            <Plus />
          </motion.button>
        </div>
      </motion.header>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          {Object.values(columns).map((column, colIdx) => (
            <motion.div 
              key={column.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: colIdx * 0.1 }}
              className="flex flex-col bg-white/5 rounded-3xl border border-white/10 overflow-hidden backdrop-blur-sm"
            >
                <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                        {column.icon}
                        <h3 className="text-xl font-bold">{column.title}</h3>
                    </div>
                    <span className="bg-white/10 px-3 py-1 rounded-full text-sm font-mono">{column.items.length}</span>
                </div>

                <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`flex-1 p-4 transition-colors gap-4 flex flex-col min-h-[400px] ${snapshot.isDraggingOver ? 'bg-white/5' : ''}`}
                        >
                            <AnimatePresence>
                                {column.items.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided, snapshot) => (
                                            <motion.div
                                                layout
                                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`bg-gray-800 p-6 rounded-2xl border border-white/10 shadow-xl transition-all ${
                                                    snapshot.isDragging ? 'rotate-3 scale-105 border-indigo-500 z-50' : 'hover:border-white/20'
                                                }`}
                                            >
                                                <div className="flex gap-4">
                                                    <GripVertical className="text-gray-600 mt-1 shrink-0" size={20} />
                                                    <p className="text-lg leading-snug">{item.content}</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </Draggable>
                                ))}
                            </AnimatePresence>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </motion.div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

