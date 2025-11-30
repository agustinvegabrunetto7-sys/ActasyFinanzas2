import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface IntroLoaderProps {
  onComplete: () => void;
}

const IntroLoader = ({ onComplete }: IntroLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [showMainText, setShowMainText] = useState(false);
  const [showSubtitleLine, setShowSubtitleLine] = useState(false);
  const [currentSubtitleWordIndex, setCurrentSubtitleWordIndex] = useState(0);

  const mainText = "ESTUDIANTES UNIDOS";
  const subtitleWords = ["Finanzas", "Actas", "Transparencia"];
  const loadingDuration = 9000; // 9 segundos
  const intervalTime = 50; // Actualizar cada 50ms
  const totalSteps = loadingDuration / intervalTime;

  useEffect(() => {
    // Show main text after a short delay
    const mainTextTimer = setTimeout(() => {
      setShowMainText(true);
    }, 500); // Aparece el texto principal después de 0.5 segundos

    let currentStep = 0;
    const progressInterval = setInterval(() => {
      currentStep++;
      const newProgress = (currentStep / totalSteps) * 100;
      setProgress(Math.min(newProgress, 100));

      if (newProgress >= 100) {
        clearInterval(progressInterval);
        // Permitir un pequeño retraso para que la barra completa sea visible antes de desvanecerse
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, intervalTime);

    // Show subtitle line and start word cycling after main text appears
    const subtitleLineTimer = setTimeout(() => {
      setShowSubtitleLine(true);
      // Start cycling subtitle words
      const wordCycleInterval = setInterval(() => {
        setCurrentSubtitleWordIndex((prevIndex) => (prevIndex + 1) % subtitleWords.length);
      }, loadingDuration / subtitleWords.length); // Cycle words evenly over the loading duration

      return () => clearInterval(wordCycleInterval);
    }, 1500); // Aparece el subtítulo y la línea de carga después de 1.5 segundos

    return () => {
      clearTimeout(mainTextTimer);
      clearTimeout(subtitleLineTimer);
      clearInterval(progressInterval);
    };
  }, [onComplete, subtitleWords.length]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      <h1
        className={cn(
          "text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter drop-shadow-2xl transition-all duration-1000 ease-out",
          showMainText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        {mainText.split("").map((char, index) => {
          // Calculate opacity for each character based on progress
          const charProgressThreshold = (index / mainText.length) * 100;
          const charOpacity = Math.min(1, Math.max(0.2, (progress - charProgressThreshold + 20) / 20)); // +20 for a slight delay, /20 for transition speed

          return (
            <span
              key={index}
              style={{
                color: `rgba(255, 255, 255, ${charOpacity})`, // Animate to white
                transition: 'color 0.1s linear',
              }}
              className="inline-block" // Ensure span respects spacing
            >
              {char}
            </span>
          );
        })}
      </h1>

      <div
        className={cn(
          "mt-8 flex items-center space-x-4 transition-all duration-1000 ease-out delay-500",
          showSubtitleLine ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="w-40 h-[2px] bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-sky-400 transition-all duration-50 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xl sm:text-2xl font-medium text-white/90 tracking-wide min-w-[120px] text-left">
          {subtitleWords[currentSubtitleWordIndex]}
        </p>
      </div>
    </div>
  );
};

export default IntroLoader;