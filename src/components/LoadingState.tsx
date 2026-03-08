import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

const MESSAGES = [
  "Analyzing time complexity...",
  "Checking for bugs...",
  "Reviewing memory usage...",
  "Generating optimizations...",
];

const LoadingState = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <Loader2 className="w-12 h-12 text-primary animate-spin-slow" />
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-muted-foreground text-lg font-medium"
        >
          {MESSAGES[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default LoadingState;
