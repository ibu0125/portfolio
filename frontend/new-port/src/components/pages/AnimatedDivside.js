import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./AnimatedDivside.css";

function AnimatedDivside({ children }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = containerRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="animated-container"
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: isVisible ? 1 : 1, x: isVisible ? 0 : -200 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedDivside;
