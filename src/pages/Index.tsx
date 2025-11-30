import { MadeWithDyad } from "@/components/made-with-dyad";
import AuroraBackground from "@/components/AuroraBackground";
import ScrollDownIndicator from "@/components/ScrollDownIndicator";
import MoneySymbols from "@/components/MoneySymbols";
import React, { useState, useEffect } from "react";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const timeoutId = setTimeout(() => {
      window.addEventListener("scroll", handleScroll);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollThreshold = 200; // Pixels scrolled before animation completes

  const mainTitleTranslateY = Math.max(0, 40 - (scrollY / scrollThreshold) * 40);
  const subtitleTranslateY = mainTitleTranslateY * 0.6; // Subtitle moves less

  // Estimate the static vertical offset of the subtitle from the center of the flex container.
  // This is a rough estimate based on typical font sizes and margin-bottom.
  // h1 (text-9xl) is roughly 120px tall, p (text-3xl) is roughly 40px tall, mb-4 is 16px.
  // The center of the 'p' element is approximately 68px below the center of the parent flex container.
  const subtitleStaticOffsetY = 68; 

  return (
    <AuroraBackground className="min-h-[150vh]">
      
      <ScrollDownIndicator />

      <div className="max-w-5xl w-full mx-auto p-4 flex flex-col items-center justify-center min-h-screen text-center relative">
        
        <MoneySymbols
          scrollY={scrollY}
          subtitleTranslateY={subtitleTranslateY}
          subtitleStaticOffsetY={subtitleStaticOffsetY}
        />

        {/* Título principal: Grande, negrita, celeste brillante */}
        <h1 
          className="text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter text-sky-400 drop-shadow-2xl mb-4"
          style={{ opacity: Math.min(1, scrollY / scrollThreshold), transform: `translateY(${mainTitleTranslateY}px)`, transition: 'opacity 0.3s ease-out, transform 0.3s ease-out' }}
        >
          ESTUDIANTES UNIDOS
        </h1>
        
        {/* Subtítulo: Limpio, blanco, elegante */}
        <p 
          className="text-xl sm:text-2xl md:text-3xl font-medium text-white/90 tracking-wide"
          style={{ opacity: Math.min(1, scrollY / scrollThreshold), transform: `translateY(${subtitleTranslateY}px)`, transition: 'opacity 0.3s ease-out, transform 0.3s ease-out' }}
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