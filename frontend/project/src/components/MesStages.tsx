"use client";

import { useState } from "react";
import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";

type Stage = {
  id: number;
  title: string;
  company: string;
  status: "suivi" | "demande" | "attente" | "refuse";
};

const stages: Stage[] = [
  { id: 1, title: "Stage Développeur Web", company: "Tech Solutions", status: "suivi" },
  { id: 2, title: "Stage Data Analyst", company: "DataCorp", status: "demande" },
  { id: 3, title: "Stage Marketing Digital", company: "MarketingPro", status: "attente" },
  { id: 4, title: "Stage DevOps", company: "Cloudify", status: "refuse" },
  { id: 4, title: "Stage DevOps", company: "Cloudify", status: "attente" },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "suivi":
      return <CheckCircle className="text-[#10B981]" size={20} />;
    case "demande":
      return <Clock className="text-[#1E3A8A]" size={20} />;
    case "attente":
      return <AlertCircle className="text-orange-500" size={20} />;
    case "refuse":
      return <XCircle className="text-red-500" size={20} />;
    default:
      return null;
  }
};

export default function MesStages() {
  const [showAll, setShowAll] = useState(false);

  // Les stages suivis en premier
  const stagesSuivis = stages.filter((s) => s.status === "suivi");
  const autresStages = stages.filter((s) => s.status !== "suivi");

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">Mes Stages</h2>

      {/* Stages suivis */}
      <div className="space-y-4">
        {stagesSuivis.map((stage) => (
          <div
            key={stage.id}
            className="flex items-center justify-between p-4 shadow-md rounded-lg bg-white"
          >
            <div>
              <h3 className="font-semibold text-lg">{stage.title}</h3>
              <p className="text-gray-500">{stage.company}</p>
            </div>
            {getStatusIcon(stage.status)}
          </div>
        ))}
      </div>

      {/* Bouton pour voir plus */}
      <div className="text-center mt-6">
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-6 py-2 rounded-lg bg-[#1E3A8A] text-white font-medium"
        >
          {showAll ? "Réduire" : "Voir plus"}
        </button>
      </div>

      {/* Autres stages */}
      {showAll && (
        <div className="space-y-4 mt-6">
          {autresStages.map((stage) => (
            <div
              key={stage.id}
              className="flex items-center justify-between p-4 shadow-md rounded-lg bg-white"
            >
              <div>
                <h3 className="font-semibold text-lg">{stage.title}</h3>
                <p className="text-gray-500">{stage.company}</p>
              </div>
              {getStatusIcon(stage.status)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
