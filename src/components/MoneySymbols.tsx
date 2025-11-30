import React from "react";
import { DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface MoneySymbolsProps {
  scrollY: number;
  subtitleTranslateY: number;
  subtitleStaticOffsetY: number;
}

const MoneySymbols = ({ scrollY, subtitleTranslateY, subtitleStaticOffsetY }: MoneySymbolsProps) => {
  const startScroll = 100; // Scroll position when symbols start appearing
  const endScroll = 400; // Scroll position when symbols finish their animation

  const symbolsData = [
    // Symbol 1: Left of subtitle, slightly above
    { initialX: 0, initialY: -200, finalX: -280, finalY: -20, delay: 0 },
    // Symbol 2: Right of subtitle, slightly above
    { initialX: 0, initialY: -200, finalX: 280, finalY: -20, delay: 0.1 },
    // Symbol 3: Left of subtitle, slightly below
    { initialX: 0, initialY: 200, finalX: -280, finalY: 20, delay: 0.2 },
    // Symbol 4: Right of subtitle, slightly below
    { initialX: 0, initialY: 200, finalX: 280, finalY: 20, delay: 0.3 },
  ];

  return (
    <>
      {symbolsData.map((data, index) => {
        const currentProgress = Math.min(1, Math.max(0, (scrollY - (startScroll + data.delay * 100)) / (endScroll - startScroll)));

        const opacity = currentProgress;
        const scale = 0.5 + 0.5 * currentProgress; // Scale from 0.5 to 1
        const translateX = data.initialX + (data.finalX - data.initialX) * currentProgress;
        // Combine static offset, scroll-based translateY of the subtitle, and symbol's own finalY
        const translateY = data.initialY + (data.finalY - data.initialY) * currentProgress + subtitleTranslateY + subtitleStaticOffsetY;

        return (
          <DollarSign
            key={index}
            className={cn(
              "absolute text-white w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20",
              "transition-all duration-500 ease-out neon-glow"
            )}
            style={{
              opacity: opacity,
              transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
              visibility: opacity > 0 ? 'visible' : 'hidden', // Hide completely when not visible
              zIndex: 10, // Ensure symbols are above the background
            }}
          />
        );
      })}
    </>
  );
};

export default MoneySymbols;