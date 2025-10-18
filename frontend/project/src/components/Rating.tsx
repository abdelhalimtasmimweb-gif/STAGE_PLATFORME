"use client";

import { Star } from "lucide-react";

interface RatingProps {
  value: number; // la note ex: 4.2
  max?: number;  // nombre max d'étoiles (par défaut 5)
}

export default function Rating({ value, max = 5 }: RatingProps) {
  // arrondi pour gérer les demi-étoiles
  const rounded = Math.round(value * 2) / 2;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1;

        return (
          <Star
            key={i}
            className={`w-5 h-5 ${
              rounded >= starValue
                ? "fill-yellow-400 text-yellow-400"
                : rounded >= starValue - 0.5
                ? "fill-yellow-400/70 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        );
      })}
      <span className="ml-2 text-sm text-gray-600">({value})</span>
    </div>
  );
}
