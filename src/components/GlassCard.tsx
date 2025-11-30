import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "p-8 md:p-12 rounded-3xl shadow-2xl backdrop-blur-lg transition-all duration-500",
          // Glassmorphism: fondo negro semi-transparente, borde celeste (sky-400)
          "bg-black/20 border border-sky-400/40",
          // Sombra interna para profundidad y un toque 'super producido'
          "shadow-[0_0_30px_rgba(125,211,252,0.1)] hover:shadow-[0_0_50px_rgba(125,211,252,0.3)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GlassCard.displayName = "GlassCard";

export default GlassCard;