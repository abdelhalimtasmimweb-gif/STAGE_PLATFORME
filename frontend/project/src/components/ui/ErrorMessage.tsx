"use client";
import { useState } from "react";



export default function ErrorBox() {
  const [error, setError] = useState<string | null>("Une erreur est survenue. Veuillez réessayer.");
  
  let theme=localStorage.getItem("theme");

  if (!error) return null; // si pas d'erreur → rien afficher

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="inset-0 bg-red-500 opacity-20 fixed"></div>
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full text-center opacity-100 z-50">
        <h2 className="text-red-600 text-xl font-bold mb-2">❌ Erreur</h2>
        <p className="text-gray-700 mb-4">{error}</p>
        <button
          onClick={() => setError(null)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
