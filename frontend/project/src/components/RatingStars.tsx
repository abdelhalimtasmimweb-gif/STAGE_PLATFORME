"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";

interface RatingStarsProps {
  maxStars?: number;                     // Nombre d’étoiles max (par défaut 5)
  onRatingChange?: (value: number) => void; // Fonction callback vers le parent
  initialValue?: number;                 // Note initiale optionnelle
}

const RatingStars: React.FC<RatingStarsProps> = ({
  maxStars = 5,
  onRatingChange,
  initialValue = 0,
}) => {
  const [rating, setRating] = useState(initialValue);
  const [hover, setHover] = useState(0);

  const handleClick = (value: number) => {
    setRating(value);
    if (onRatingChange) onRatingChange(value);
  };

  return (
    <div className="flex items-center space-x-1">
      {[...Array(maxStars)].map((_, index) => {
        const value = index + 1;
        return (
          <Star
            key={index}
            onClick={() => handleClick(value)}
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(0)}
            className={`w-7 h-7 cursor-pointer transition 
              ${
                value <= (hover || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-400"
              }`}
          />
        );
      })}
      <span className="ml-2 text-sm text-gray-600">{rating} / {maxStars}</span>
    </div>
  );
};

export default RatingStars;
