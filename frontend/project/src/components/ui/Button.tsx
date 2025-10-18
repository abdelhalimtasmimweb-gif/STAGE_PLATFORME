import * as React from "react";
import { cn } from "@/lib/utils"; // petite fonction pour merger les classes

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "px-4 py-2 rounded-2xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm",
          variant === "default" &&
            "bg-[#1E3A8A] text-white hover:bg-[#3B82F6]",
          variant === "outline" &&
            "border border-[#3B82F6] text-[#1E3A8A] hover:bg-[#F3F4F6]",
          variant === "ghost" &&
            "text-gray-700 hover:bg-gray-100",  
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
