import React from "react";
import { Button } from "./ui/Button";

type Stage = {
  id: number;
  title: string;
  description: string;
  location: string;
  image: string;
};

interface StageListBlockProps {
  stages: Stage[];
}

export default function StageListBlock({ stages }: StageListBlockProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 text-center">
      <h2 className="text-3xl font-bold text-[#1E3A8A]">
        Stages disponibles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className="p-6 rounded-2xl bg-white shadow-md border border-gray-200 hover:shadow-lg transition"
          >
            <div className="w-11/12 mx-auto mb-1 text-center">
              <img
                src={stage.image}
                alt={stage.title}
                className="mx-auto w-11/12 h-44 object-cover rounded-lg"
              />
            
           

            </div>

            <h3 className="font-semibold text-lg text-[#111827]">
              {stage.title}
            </h3>
            <p className="text-gray-600 mt-2">{stage.description}</p>
            <p className="text-sm text-gray-500 mt-1">📍 {stage.location}</p>

            <Button className="mt-4 bg-[#1E3A8A] text-white px-6 py-2 rounded-lg hover:bg-[#3B82F6]">
              Voir plus
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
