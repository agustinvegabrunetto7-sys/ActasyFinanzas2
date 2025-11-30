import { MadeWithDyad } from "@/components/made-with-dyad";
import AuroraBackground from "@/components/AuroraBackground";
import ScrollDownIndicator from "@/components/ScrollDownIndicator";
import MoneySymbols from "@/components/MoneySymbols";
import GlassCard from "@/components/GlassCard"; // Import the GlassCard component
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

  // --- Animaciones de la Sección Hero ---
  const heroScrollThreshold = 200; // Píxeles de scroll antes de que la animación del hero se complete

  const heroOpacity = Math.min(1, scrollY / heroScrollThreshold);
  const heroTranslateY = Math.max(0, 40 - (scrollY / heroScrollThreshold) * 40);

  const subtitleTranslateY = heroTranslateY * 0.6;
  const subtitleStaticOffsetY = 68; // Offset estático estimado para el subtítulo

  // --- Animaciones de la Nueva Sección de Contenido ---
  const contentStartScroll = 500; // Posición de scroll donde el nuevo contenido empieza a aparecer
  const contentEndScroll = 800;   // Posición de scroll donde la animación del nuevo contenido se completa

  const contentProgress = Math.min(1, Math.max(0, (scrollY - contentStartScroll) / (contentEndScroll - contentStartScroll)));

  const contentOpacity = contentProgress;
  const contentSlideY = Math.max(0, 50 - contentProgress * 50); // Se desliza hacia arriba de 50px a 0px

  return (
    <>
      {/* Sección Hero */}
      <AuroraBackground className="min-h-[120vh]"> {/* Ajustado min-h para una mejor transición */}
        <ScrollDownIndicator />

        <div className="max-w-5xl w-full mx-auto p-4 flex flex-col items-center justify-center min-h-screen text-center relative">
          <MoneySymbols
            scrollY={scrollY}
            subtitleTranslateY={subtitleTranslateY}
            subtitleStaticOffsetY={subtitleStaticOffsetY}
          />

          <h1
            className="text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter text-sky-400 drop-shadow-2xl mb-4"
            style={{ opacity: heroOpacity, transform: `translateY(${heroTranslateY}px)`, transition: 'opacity 0.3s ease-out, transform 0.3s ease-out' }}
          >
            ESTUDIANTES UNIDOS
          </h1>

          <p
            className="text-xl sm:text-2xl md:text-3xl font-medium text-white/90 tracking-wide"
            style={{ opacity: heroOpacity, transform: `translateY(${subtitleTranslateY}px)`, transition: 'opacity 0.3s ease-out, transform 0.3s ease-out' }}
          >
            División Actas y Finanzas.
          </p>
        </div>
      </AuroraBackground>

      {/* Nueva Sección de Contenido */}
      <section
        className="relative z-20 bg-gradient-to-b from-black to-gray-900 py-20 px-4 min-h-screen flex items-center justify-center"
        style={{ opacity: contentOpacity, transform: `translateY(${contentSlideY}px)`, transition: 'opacity 0.5s ease-out, transform 0.5s ease-out' }}
      >
        <div className="max-w-4xl mx-auto">
          <GlassCard className="text-white text-left">
            <h2 className="text-4xl font-bold text-sky-300 mb-6 neon-glow">Nuestra Misión</h2>
            <p className="text-lg mb-4 leading-relaxed">
              En Estudiantes Unidos, la División Actas y Finanzas se dedica a garantizar la transparencia y eficiencia en la gestión de los recursos de nuestra comunidad estudiantil. Nos esforzamos por mantener registros precisos y accesibles, asegurando que cada decisión financiera refleje los intereses y necesidades de nuestros miembros.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              Trabajamos incansablemente para fomentar una cultura de responsabilidad fiscal y participación activa, empoderando a los estudiantes con la información necesaria para tomar decisiones informadas y contribuir al crecimiento sostenible de nuestra organización.
            </p>
            <div className="mt-8 flex justify-center">
              <img
                src="/FINANZAS.jpg"
                alt="Finanzas"
                className="rounded-lg shadow-lg max-w-full h-auto md:max-w-md lg:max-w-lg"
              />
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Made with Dyad al final de la página */}
      <div className="w-full bg-gray-900"> {/* Asegura un fondo para el componente */}
        <MadeWithDyad />
      </div>
    </>
  );
};

export default Index;