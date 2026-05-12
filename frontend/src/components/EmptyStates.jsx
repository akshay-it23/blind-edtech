import { motion } from 'framer-motion';
import { FolderOpen, Search, TrendingUp } from 'lucide-react';

export function NoPostsEmpty() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <FolderOpen className="w-16 h-16 text-gray-300 mb-4" />
      <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts yet</h3>
      <p className="text-gray-400 text-center max-w-md">
        Start a conversation! Create the first post in this forum.
      </p>
    </motion.div>
  );
}

export function NoLessonsEmpty() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <TrendingUp className="w-16 h-16 text-gray-300 mb-4" />
      <h3 className="text-xl font-semibold text-gray-600 mb-2">
        No lessons completed yet
      </h3>
      <p className="text-gray-400 text-center max-w-md">
        Complete your first lesson to see your progress here.
      </p>
    </motion.div>
  );
}

export function NoSearchResults({ query = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <Search className="w-16 h-16 text-gray-300 mb-4" />
      <h3 className="text-xl font-semibold text-gray-600 mb-2">
        No results found
      </h3>
      <p className="text-gray-400 text-center max-w-md">
        {query
          ? `No results for "${query}". Try different keywords.`
          : 'Try searching for something.'}
      </p>
    </motion.div>
  );
}

export function EmptyState({ icon: Icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12"
    >
      {Icon && <Icon className="w-16 h-16 text-gray-300 mb-4" />}
      <h3 className="text-xl font-semibold text-gray-600 mb-2">{title}</h3>
      <p className="text-gray-400 text-center max-w-md">{description}</p>
    </motion.div>
  );
}
