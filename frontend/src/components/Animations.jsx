import { motion } from 'framer-motion';

export function FadeIn({ children, delay = 0, duration = 0.5 }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration }}
    >
      {children}
    </motion.div>
  );
}

export function SlideInLeft({ children, delay = 0, duration = 0.5 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration }}
    >
      {children}
    </motion.div>
  );
}

export function SlideInRight({ children, delay = 0, duration = 0.5 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration }}
    >
      {children}
    </motion.div>
  );
}

export function ScaleUp({ children, delay = 0, duration = 0.5 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, staggerDelay = 0.1 }) {
  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      {Array.isArray(children)
        ? children.map((child, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}

export function Flip({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ rotateY: -180, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      transition={{ delay, duration: 0.6 }}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}

export function Pop({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay,
        duration: 0.4,
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
}

export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
