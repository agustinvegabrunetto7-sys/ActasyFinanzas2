import { MadeWithDyad } from "@/components/made-with-dyad";
import AuroraBackground from "@/components/AuroraBackground";
import ScrollDownIndicator from "@/components/ScrollDownIndicator"; // Import the new component
import React, { useState, useEffect } from "react";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Add a small delay to ensure the scroll listener is attached after render
    const timeoutId = setTimeout(() => {
      window.addEventListener("scroll", handleScroll);
    }, 100); // Small delay

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollThreshold = 200; // Pixels scrolled before animation completes

  // Calculate opacity: starts at 0, reaches 1 at scrollThreshold
  const opacity = Math.min(1, scrollY / scrollThreshold);
  // Calculate translateY: starts at 40px, reaches 0px at scrollThreshold
  const translateY = Math.max(0, 40 - (scrollY / scrollThreshold) * 40);

  return (
    <AuroraBackground className="min-h-[150vh]"> {/* Make it scrollable */}
      
      <ScrollDownIndicator /> {/* Add the new component here, at the top */}

      <div className="max-w-5xl w-full mx-auto p-4 flex flex-col items-center justify-center min-h-screen text-center">
        
        {/* Título principal: Grande, negrita, celeste brillante */}
        <h1 
          className="text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter text-sky-400 drop-shadow-2xl mb-4"
          style={{ opacity, transform: `translateY(${translateY}px)`, transition: 'opacity 0.3s ease-out, transform 0.3s ease-out' }}
        >
          ESTUDIANTES UNIDOS
        </h1>
        
        {/* Subtítulo: Limpio, blanco, elegante */}
        <p 
          className="text-xl sm:text-2xl md:text-3xl font-medium text-white/90 tracking-wide"
          style={{ opacity, transform: `translateY(${translateY * 0.6}px)`, transition: 'opacity 0.3s ease-out, transform 0.3s ease-out' }}
        >
          División Actas y Finanzas.
        </p>
        
      </div>
      
      <div className="absolute bottom-0 w-full">
        <MadeWithDyad />
      </div>
    </AuroraBackground>
  );
};

export default Index;