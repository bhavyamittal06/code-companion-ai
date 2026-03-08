import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const MESSAGES = [
  "Analyzing time complexity...",
  "Checking for bugs...",
  "Reviewing memory usage...",
  "Generating optimizations...",
];

const LoadingState = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % MESSAGES.length);
        setVisible(true);
      }, 300);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <Loader2 className="w-12 h-12 text-primary animate-spin-slow" />
      <p
        className={`text-muted-foreground text-lg font-medium transition-all duration-300 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        {MESSAGES[index]}
      </p>
    </div>
  );
};

export default LoadingState;
