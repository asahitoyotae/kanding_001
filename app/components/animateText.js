"use client";
import React from "react";

const AnimateText = ({ delay, text }) => {
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayText((prevText) => prevText + text[charIndex]);
      setCharIndex((prevIndex) => prevIndex + 1);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [charIndex, delay, text]);

  return <span>{displayText}</span>;
};

export default AnimateText;
