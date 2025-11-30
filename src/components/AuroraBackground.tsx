import React from "react";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const AuroraBackground = ({ children, className, ...props }: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden bg-black transition-bg duration-500",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 z-0">
        {/* Capa de fondo oscuro */}
        <div className="absolute inset-0 bg-black/90" />
        
        {/* Capas de Aurora (simulando ondas de luz) */}
        <div className="aurora-layer-1 absolute bottom-0 left-0 w-full h-1/2 opacity-50" />
        <div className="aurora-layer-2 absolute bottom-0 left-0 w-full h-1/3 opacity-40" />
        <div className="aurora-layer-3 absolute bottom-0 left-0 w-full h-1/4 opacity-30" />
      </div>
      
      {/* Contenido (título, etc.) */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default AuroraBackground;