import { motion } from 'framer-motion';

// Reusable button with hover/tap effects
export function AnimatedButton({ children, onClick, className = '', ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// Reusable card with hover shadow effect
export function AnimatedCard({ children, className = '', ...props }) {
  return (
    <motion.div
      whileHover={{ boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)' }}
      transition={{ duration: 0.3 }}
      className={`transition-shadow ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Animated link with underline effect
export function AnimatedLink({ children, className = '', ...props }) {
  return (
    <motion.a
      whileHover={{ color: '#fbbf24' }}
      transition={{ duration: 0.2 }}
      className={`transition-colors ${className}`}
      {...props}
    >
      {children}
    </motion.a>
  );
}

// Table row with hover effect
export function AnimatedTableRow({ children, className = '', ...props }) {
  return (
    <motion.tr
      whileHover={{ backgroundColor: '#f3f4f6' }}
      transition={{ duration: 0.2 }}
      className={className}
      {...props}
    >
      {children}
    </motion.tr>
  );
}

// Message bubble animation
export function AnimatedMessage({ children, isOwn = false, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className={`mb-3 ${isOwn ? 'text-right' : 'text-left'}`}
    >
      <div
        className={`inline-block px-4 py-2 rounded-lg ${
          isOwn
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800'
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
}

// Badge with entrance animation
export function AnimatedBadge({ children, color = 'bg-blue-100', className = '', delay = 0 }) {
  return (
    <motion.span
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.3 }}
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${color} ${className}`}
    >
      {children}
    </motion.span>
  );
}
