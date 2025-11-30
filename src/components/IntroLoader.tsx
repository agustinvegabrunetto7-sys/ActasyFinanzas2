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
  const [showLogo, setShowLogo] = useState(false); // New state for logo visibility

  const mainTextLines = ["ESTUDIANTES", "UNIDOS"];
  const combinedTextLength = mainTextLines.join("").length; // Total length for progress calculation
  const subtitleWords = ["Finanzas", "Actas", "Transparencia"];
  const loadingDuration = 9000; // 9 segundos
  const intervalTime = 50; // Actualizar cada 50ms
  const totalSteps = loadingDuration / intervalTime;

  useEffect(() => {
    // Show logo after a very short delay
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 100);

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
      clearTimeout(logoTimer);
      clearTimeout(mainTextTimer);
      clearTimeout(subtitleLineTimer);
      clearInterval(progressInterval);
    };
  }, [onComplete, subtitleWords.length]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      <img
        src="/EUGABLANCO.png"
        alt="Estudiantes Unidos Logo"
        className={cn(
          "w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-8 transition-all duration-700 ease-out",
          showLogo ? "opacity-100 scale-100" : "opacity-0 scale-75"
        )}
      />
      {mainTextLines.map((line, lineIndex) => (
        <div
          key={`line-${lineIndex}`}
          className={cn(
            "text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter drop-shadow-2xl transition-all duration-1000 ease-out",
            showMainText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          {line.split("").map((char, charIndex) => {
            // Calculate overall character index for progress
            const offset = mainTextLines.slice(0, lineIndex).join("").length;
            const overallCharIndex = offset + charIndex;
            const charProgressThreshold = (overallCharIndex / combinedTextLength) * 100;
            const charOpacity = Math.min(1, Math.max(0.2, (progress - charProgressThreshold + 20) / 20));

            return (
              <span
                key={`char-${lineIndex}-${charIndex}`}
                style={{
                  color: `rgba(255, 255, 255, ${charOpacity})`,
                  transition: 'color 0.1s linear',
                }}
                className="inline-block"
              >
                {char}
              </span>
            );
          })}
        </div>
      ))}

      <div
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-4 transition-all duration-1000 ease-out delay-500",
          showSubtitleLine ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="w-40 h-[2px] bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-sky-400 transition-all duration-50 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p
          key={currentSubtitleWordIndex} // Key changes, forcing re-render and animation
          className={cn(
            "text-xl sm:text-2xl font-medium text-white/90 tracking-wide min-w-[120px] text-left",
            "animate-subtitle-flip-in" // Apply the animation
          )}
        >
          {subtitleWords[currentSubtitleWordIndex]}
        </p>
      </div>
    </div>
  );
};

export default IntroLoader;