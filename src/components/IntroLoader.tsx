import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface IntroLoaderProps {
  onComplete: () => void;
}

const IntroLoader = ({ onComplete }: IntroLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [showSubtitleLine, setShowSubtitleLine] = useState(false); // Mantener el estado para controlar la visibilidad
  const [currentSubtitleWordIndex, setCurrentSubtitleWordIndex] = useState(0);

  const mainTextLines = ["ESTUDIANTES", "UNIDOS"];
  const subtitleWords = ["Finanzas", "Actas", "Transparencia"];
  const loadingDuration = 13000; // Aumentado a 13 segundos (9 + 4)
  const intervalTime = 50; // Actualizar cada 50ms

  // Calcular el total de caracteres para la revelación lineal del texto principal
  const combinedText = mainTextLines.join("");
  const combinedTextLength = combinedText.length;
  
  // Usamos una ref para mantener el índice global de caracteres a través de los renders
  const globalCharIndexRef = useRef(0);

  useEffect(() => {
    const startTime = Date.now();

    // Mostrar el logo después de un pequeño retraso
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 100);

    // Hacer que la línea del subtítulo aparezca instantáneamente
    setShowSubtitleLine(true); 
    const wordCycleInterval = setInterval(() => {
      setCurrentSubtitleWordIndex((prevIndex) => (prevIndex + 1) % subtitleWords.length);
    }, loadingDuration / subtitleWords.length); // Ciclar palabras uniformemente durante la duración de la carga


    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const targetProgressBasedOnTime = (elapsedTime / loadingDuration) * 100;

      // Introducir aleatoriedad para el efecto de "tirones"
      const minJump = 0.5; // Incremento mínimo de progreso por intervalo
      const maxJump = 2.5; // Incremento máximo de progreso por intervalo
      let randomJump = Math.random() * (maxJump - minJump) + minJump;

      // Asegurarse de que el progreso no exceda el 100%
      currentProgress = Math.min(100, currentProgress + randomJump);

      // Si nos estamos quedando muy atrás del objetivo basado en el tiempo, acelerar para alcanzarlo
      if (currentProgress < targetProgressBasedOnTime - 5) { // Si está más de un 5% por detrás
        currentProgress = Math.min(100, targetProgressBasedOnTime + Math.random() * 2); // Ponerse al día con un pequeño impulso aleatorio
      }
      
      // Asegurarse de que llegue al 100% exactamente al final de la duración
      if (elapsedTime >= loadingDuration) {
        currentProgress = 100;
      }

      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        clearInterval(wordCycleInterval); // Limpiar también el intervalo de palabras
        // Permitir un pequeño retraso para que la barra completa sea visible antes de desvanecerse
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, intervalTime);

    return () => {
      clearTimeout(logoTimer);
      clearInterval(progressInterval);
      clearInterval(wordCycleInterval); // Asegurarse de limpiar el intervalo de palabras
    };
  }, [onComplete, subtitleWords.length, loadingDuration, intervalTime]);

  // Resetear el índice global de caracteres al inicio de cada renderizado
  globalCharIndexRef.current = 0;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      <img
        src="/EUGABLANCO.png"
        alt="Estudiantes Unidos Logo"
        className={cn(
          "absolute top-[15%] left-1/2 -translate-x-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 transition-all duration-700 ease-out",
          showLogo ? "opacity-100 scale-100" : "opacity-0 scale-75"
        )}
      />
      <div className="flex flex-col items-center"> {/* Contenedor para las líneas de texto principal */}
        {mainTextLines.map((line, lineIndex) => (
          <div
            key={`line-${lineIndex}`}
            className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter drop-shadow-2xl"
          >
            {line.split("").map((char, charIndex) => {
              const currentGlobalCharIndex = globalCharIndexRef.current;
              globalCharIndexRef.current++; // Incrementar para el siguiente carácter

              // Calcular el umbral de progreso para revelar este carácter
              const charRevealThreshold = (currentGlobalCharIndex / combinedTextLength) * 100;
              const charOpacity = progress > charRevealThreshold ? 1 : 0.1; // Opacidad baja hasta que se revela

              return (
                <span
                  key={`char-${lineIndex}-${charIndex}`}
                  className={cn("inline-block transition-opacity duration-100", {
                    "neon-glow": progress > charRevealThreshold, // Aplicar brillo neón cuando se revela
                  })}
                  style={{ opacity: charOpacity }}
                >
                  {char}
                </span>
              );
            })}
          </div>
        ))}
      </div>

      <div
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 transition-all duration-1000 ease-out delay-500",
          // showSubtitleLine ? "opacity-100" : "opacity-0" // Ya no es necesario el delay, aparece instantáneo
          "opacity-100" // Siempre visible desde el inicio
        )}
      >
        <p
          key={currentSubtitleWordIndex} // La clave cambia, forzando la re-renderización y la animación
          className={cn(
            "text-xl sm:text-2xl font-medium text-white/90 tracking-wide text-center",
            "animate-subtitle-flip-in" // Aplicar la animación
          )}
        >
          {subtitleWords[currentSubtitleWordIndex]}
        </p>
        <div className="w-40 h-[2px] bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-sky-400 transition-all duration-50 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default IntroLoader;