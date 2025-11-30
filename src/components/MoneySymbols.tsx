import React from "react";
import { DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface MoneySymbolsProps {
  scrollY: number;
  h1TranslateY: number;
}

const MoneySymbols = ({ scrollY, h1TranslateY }: MoneySymbolsProps) => {
  const startScroll = 100; // Scroll position when symbols start appearing
  const endScroll = 400; // Scroll position when symbols finish their animation

  const symbolsData = [
    // Symbol 1: Top-left of title
    { initialX: 0, initialY: -200, finalX: -250, finalY: -100, delay: 0 },
    // Symbol 2: Top-right of title
    { initialX: 0, initialY: -200, finalX: 250, finalY: -100, delay: 0.1 },
    // Symbol 3: Bottom-left of title
    { initialX: 0, initialY: 200, finalX: -200, finalY: 50, delay: 0.2 },
    // Symbol 4: Bottom-right of title
    { initialX: 0, initialY: 200, finalX: 200, finalY: 50, delay: 0.3 },
  ];

  return (
    <>
      {symbolsData.map((data, index) => {
        const currentProgress = Math.min(1, Math.max(0, (scrollY - (startScroll + data.delay * 100)) / (endScroll - startScroll)));

        const opacity = currentProgress;
        const scale = 0.5 + 0.5 * currentProgress; // Scale from 0.5 to 1
        const translateX = data.initialX + (data.finalX - data.initialX) * currentProgress;
        const translateY = data.initialY + (data.finalY - data.initialY) * currentProgress + h1TranslateY; // Adjust with h1's translateY

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