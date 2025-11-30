import React from "react";

const ScrollDownIndicator = () => {
  return (
    <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20">
      <p className="text-white text-lg font-bold neon-glow animate-neon-blink">
        Deslizá hacia abajo
      </p>
    </div>
  );
};

export default ScrollDownIndicator;