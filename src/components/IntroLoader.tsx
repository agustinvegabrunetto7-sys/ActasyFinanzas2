import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface IntroLoaderProps {
  onComplete: () => void;
}

const IntroLoader = ({ onComplete }: IntroLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [showMainText, setShowMainText] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    // Show main text after a short delay
    const mainTextTimer = setTimeout(() => {
      setShowMainText(true);
    }, 500); // Aparece el texto principal después de 0.5 segundos

    // Start loading progress after main text appears
    const loadingDuration = 9000; // 9 segundos
    const intervalTime = 50; // Actualizar cada 50ms
    const totalSteps = loadingDuration / intervalTime;
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

    // Show subtitle and loading line after main text and a bit of progress
    const subtitleTimer = setTimeout(() => {
      setShowSubtitle(true);
    }, 1500); // Aparece el subtítulo y la línea de carga después de 1.5 segundos

    return () => {
      clearTimeout(mainTextTimer);
      clearTimeout(subtitleTimer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      <div
        className={cn(
          "text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter text-sky-400 drop-shadow-2xl transition-all duration-1000 ease-out",
          showMainText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        ESTUDIANTES UNIDOS
      </div>

      <div
        className={cn(
          "mt-8 flex items-center space-x-4 transition-all duration-1000 ease-out delay-500",
          showSubtitle ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="w-40 h-1 bg-sky-400/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-sky-400 transition-all duration-50 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xl sm:text-2xl font-medium text-white/90 tracking-wide">
          Actas y Finanzas
        </p>
      </div>
    </div>
  );
};

export default IntroLoader;