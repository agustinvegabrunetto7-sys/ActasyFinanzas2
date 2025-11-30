import { MadeWithDyad } from "@/components/made-with-dyad";
import AuroraBackground from "@/components/AuroraBackground";
import GlassCard from "@/components/GlassCard";
import IntroLoader from "@/components/IntroLoader";
import React, { useState, useEffect } from "react";
import { Lightbulb, Handshake, ShieldCheck } from "lucide-react"; // Import icons
import { cn } from "@/lib/utils"; // Import cn for conditional class names

const Index = () => {
  const [showIntro, setShowIntro] = useState(true); // State to control intro visibility
  const [heroAnimated, setHeroAnimated] = useState(false); // State for subtitle animation

  const handleIntroComplete = () => {
    setShowIntro(false);
    // Trigger subtitle animation shortly after intro unmounts
    setTimeout(() => {
      setHeroAnimated(true);
    }, 100);
  };

  if (showIntro) {
    return <IntroLoader onComplete={handleIntroComplete} />;
  }

  return (
    <>
      {/* Sección Hero */}
      <AuroraBackground className="min-h-screen">
        <div className="max-w-5xl w-full mx-auto p-4 flex flex-col items-center justify-center min-h-screen text-center relative">
          <h1
            className="text-5xl sm:text-8xl md:text-8xl font-extrabold tracking-tighter drop-shadow-2xl mb-4 text-sky-400"
          >
            ESTUDIANTES UNIDOS
          </h1>

          <p
            className={cn(
              "text-xl sm:text-2xl md:text-3xl font-medium tracking-wide",
              "transition-all duration-1000 ease-out delay-200", // Add a slight delay for the subtitle
              heroAnimated
                ? "opacity-100 translate-y-0 text-white/90"
                : "opacity-0 translate-y-5 text-gray-500" // Start slightly transparent, lower, and muted white
            )}
          >
            Secretaria de Actas y Finanzas.
          </p>
        </div>
      </AuroraBackground>

      {/* Sección "Nuestra Misión" */}
      <section
        className="relative z-20 bg-gradient-to-b from-black to-gray-900 py-20 px-4 min-h-screen flex items-center justify-center"
      >
        <div className="max-w-4xl mx-auto">
          <GlassCard className="text-white text-left">
            <h2 className="text-4xl font-bold text-sky-300 mb-6 neon-glow text-center">Nuestra Misión</h2>
            <p className="text-lg mb-4 leading-relaxed">
              En Estudiantes Unidos, la División Actas y Finanzas se dedica a garantizar la transparencia y eficiencia en la gestión de los recursos de nuestra comunidad estudiantil. Nos esforzamos por mantener registros precisos y accesibles, asegurando que cada decisión financiera refleje los intereses y necesidades de nuestros miembros.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Sección "Nuestros Valores" */}
      <section
        className="relative z-20 bg-gradient-to-b from-gray-900 to-black py-20 px-4 min-h-screen flex items-center justify-center"
      >
        <div className="max-w-5xl mx-auto">
          <GlassCard className="text-white text-center">
            <h2 className="text-4xl font-bold text-sky-300 mb-10 neon-glow">Nuestros Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center p-6 bg-black/30 rounded-xl border border-sky-500/30 shadow-lg hover:shadow-sky-400/50 transition-shadow duration-300">
                <Lightbulb className="w-16 h-16 text-sky-400 mb-4 neon-glow" />
                <h3 className="text-2xl font-semibold text-white mb-2">Innovación</h3>
                <p className="text-gray-300 text-center">
                  Buscamos constantemente nuevas formas de mejorar y optimizar la forma de cumunicación de nuestras decisiones, como esta web.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-black/30 rounded-xl border border-sky-500/30 shadow-lg hover:shadow-sky-400/50 transition-shadow duration-300">
                <Handshake className="w-16 h-16 text-sky-400 mb-4 neon-glow" />
                <h3 className="text-2xl font-semibold text-white mb-2">Transparencia</h3>
                <p className="text-gray-300 text-center">
                  Garantizamos la claridad y accesibilidad de toda la información financiera con esta página.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-black/30 rounded-xl border border-sky-500/30 shadow-lg hover:shadow-sky-400/50 transition-shadow duration-300">
                <ShieldCheck className="w-16 h-16 text-sky-400 mb-4 neon-glow" />
                <h3 className="text-2xl font-semibold text-white mb-2">Integridad</h3>
                <p className="text-gray-300 text-center">
                  Actuamos con honestidad y ética en todas nuestras gestiones y decisiones.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Made with Dyad al final de la página */}
      <div className="w-full bg-black py-8"> {/* Asegura un fondo para el componente */}
        <MadeWithDyad />
      </div>
    </>
  );
};

export default Index;