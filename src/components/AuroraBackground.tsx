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
      <div className="aurora-background" />
      
      {/* Contenido (título, etc.) */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default AuroraBackground;