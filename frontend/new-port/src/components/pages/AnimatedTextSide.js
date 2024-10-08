import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./AnimatedTextSide.css";

function AnimatedTextSide({ text }) {
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const currentRef = textRef.current; // ref の値を変数にコピー

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // 画面の10%が表示されていれば反応
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []); // 空の依存配列で、コンポーネントのマウント時とアンマウント時にのみ実行

  return (
    <div className="animation-wrapper" ref={textRef}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="text"
          initial={{ opacity: 0, x: 200 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            x: isVisible ? 0 : 200,
          }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}

export default AnimatedTextSide;
