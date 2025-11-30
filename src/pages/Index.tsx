import { MadeWithDyad } from "@/components/made-with-dyad";
import AuroraBackground from "@/components/AuroraBackground";

const Index = () => {
  return (
    <AuroraBackground className="min-h-screen">
      <div className="max-w-5xl w-full mx-auto p-4 flex flex-col items-center justify-center h-full text-center">
        
        {/* Título principal: Grande, negrita, celeste brillante */}
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter text-sky-400 drop-shadow-2xl mb-4 transition-all duration-500">
          ESTUDIANTES UNIDOS
        </h1>
        
        {/* Subtítulo: Limpio, blanco, elegante */}
        <p className="text-xl sm:text-2xl md:text-3xl font-medium text-white/90 tracking-wide transition-all duration-500">
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