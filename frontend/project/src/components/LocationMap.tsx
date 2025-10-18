"use client";

import React, { useState } from "react";
import { MapPin } from "lucide-react"; // icône moderne
import { Button } from "@/components/ui/Button"; // bouton stylisé (si tu utilises shadcn/ui)

interface LocationMapProps {
  locationUrl: string; // lien Google Maps
}

const LocationMap: React.FC<LocationMapProps> = ({ locationUrl }) => {
  const [showMap, setShowMap] = useState(false);

  const toggleMap = () => setShowMap(!showMap);

  return (
    <div className="flex flex-col items-center bg-white rounded-2xl shadow-md p-6 w-full">
      <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center gap-2">
        <MapPin className="text-blue-500" /> Localisation géographique
      </h3>

      <Button
        onClick={toggleMap}
        className="bg-blue-600 text-white hover:bg-blue-700 transition rounded-xl"
      >
        {showMap ? "Masquer la carte" : "Afficher la carte"}
      </Button>

      {showMap && (
        <div className="mt-4 w-full h-72 rounded-xl overflow-hidden shadow-md">
          <iframe
            src={locationUrl}
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}

      <a
        href={locationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 text-blue-500 hover:underline text-sm"
      >
        🔗 Ouvrir dans Google Maps
      </a>
    </div>
  );
};

export default LocationMap;
