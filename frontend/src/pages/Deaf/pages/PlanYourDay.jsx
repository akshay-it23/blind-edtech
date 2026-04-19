import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Sidebar from "../components/Sidebar";

const PlanYourDay = () => {
  const [columns, setColumns] = useState({
    todo: {
      name: "To Do",
      items: [
        { id: "1", title: "Learn Signs" },
        { id: "2", title: "Practice Alphabets" },
      ],
    },
    inprogress: {
      name: "In Progress",
      items: [{ id: "3", title: "Build Project UI" }],
    },
    done: {
      name: "Done",
      items: [{ id: "4", title: "Setup React App" }],
    },
  });

  const [newTask, setNewTask] = useState("");

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];

    const sourceItems = [...sourceCol.items];
    const destItems = [...destCol.items];
    const [movedItem] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceCol,
          items: sourceItems,
        },
      });
      return;
    }

    destItems.splice(destination.index, 0, movedItem);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceCol,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destCol,
        items: destItems,
      },
    });
  };

  const addTask = () => {
    if (!newTask.trim()) return;

    setColumns((prev) => ({
      ...prev,
      todo: {
        ...prev.todo,
        items: [
          ...prev.todo.items,
          {
            id: Date.now().toString(),
            title: newTask.trim(),
          },
        ],
      },
    }));

    setNewTask("");
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100 min-h-screen ml-64">
        <div className="mb-6 flex gap-2">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="p-2 border rounded"
            placeholder="Add new task"
          />
          <button onClick={addTask} className="bg-blue-500 text-white px-4 rounded">
            Add
          </button>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4">
            {Object.entries(columns).map(([colId, col]) => (
              <Droppable droppableId={colId} key={colId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-white p-4 rounded shadow w-1/3"
                  >
                    <h2 className="font-bold mb-4">{col.name}</h2>

                    {col.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(dragProvided) => (
                          <div
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                            className="bg-gray-200 p-2 mb-2 rounded shadow"
                          >
                            {item.title}
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default PlanYourDay;
