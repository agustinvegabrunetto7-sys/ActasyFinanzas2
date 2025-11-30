import { MadeWithDyad } from "@/components/made-with-dyad";
import GlassCard from "@/components/GlassCard";

const Index = () => {
  return (
    // Aplicamos el fondo animado. Usamos min-h-screen y flex para centrar el contenido.
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-4 animated-gradient-bg">
      <div className="max-w-3xl w-full mx-auto">
        <GlassCard>
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-2 tracking-tight text-sky-400 drop-shadow-lg">
              Estudiantes Unidos
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-200 mt-4">
              División Actas y Finanzas
            </p>
          </div>
        </GlassCard>
      </div>
      <div className="absolute bottom-0 w-full">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;