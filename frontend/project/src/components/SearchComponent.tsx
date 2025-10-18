"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "./ui/Button";

type Stage = {
  id: number;
  title: string;
  description: string;
  location: string;
  image: string;
  remote?: boolean;
  salary?: number;
};

export default function SearchComponent({
  stages,
  onResults,
}: {
  stages: Stage[];
  onResults: (results: Stage[]) => void;
}) {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [minSalary, setMinSalary] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const filteredStages = stages.filter((stage) => {
      const matchKeyword = stage.title.toLowerCase().includes(keyword.toLowerCase());
      const matchLocation = location ? stage.location.toLowerCase().includes(location.toLowerCase()) : true;
      const matchRemote = remoteOnly ? stage.remote === true : true;
      const matchSalary = stage.salary ? stage.salary >= minSalary : true;

      return matchKeyword && matchLocation && matchRemote && matchSalary;
    });

    // ✅ renvoie les résultats filtrés au parent
    onResults(filteredStages);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 mb-10 px-6"
    >
      {/* Champ mot-clé */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Mot clé (ex: Développement, Marketing...)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Champ lieu */}
      <input
        type="text"
        placeholder="Lieu"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />

      {/* Filtre remote */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={remoteOnly}
          onChange={(e) => setRemoteOnly(e.target.checked)}
        />
        Télétravail uniquement
      </label>

      {/* Salaire minimum */}
      <input
        type="number"
        placeholder="Salaire min"
        value={minSalary}
        onChange={(e) => setMinSalary(Number(e.target.value))}
        className="w-28 px-2 py-1 border rounded-lg"
      />

      {/* Bouton */}
      <Button type="submit" className="bg-[#1E3A8A] text-white px-6 py-2 rounded-lg">
        Rechercher
      </Button>
    </form>
  );
}
