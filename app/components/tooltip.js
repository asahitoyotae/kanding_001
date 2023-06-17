"use client";
import React, { useEffect, useState } from "react";

const Tooltip = ({ textTip, top, right }) => {
  const [text, setText] = useState("");
  const [topf, setTop] = useState(0);
  const [rightf, setRight] = useState(0);

  useEffect(() => {
    setText(textTip);
    setRight(right);
    setTop(top);
  }, [textTip, top, right]);
  return (
    <div
      className={`rounded-xl px-4 py-2 bg-gray-700 text-white text-sm text-center absolute top-${topf} right-${rightf}`}
    >
      {text}
    </div>
  );
};

export default Tooltip;
