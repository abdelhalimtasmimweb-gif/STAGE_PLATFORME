"use client";
import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

type Domaine = {
  id: number;
  categorie: string;
  sous_domaines: string[];
};

type Props = {
  domainesData: Domaine[];
  onSelectionChange?: (selected: string[]) => void; // 🟩 callback pour le parent
  selectedSpecialties?: string[];

};

const ListOfLists: React.FC<Props> = ({ domainesData,onSelectionChange }) => {
  const [openDomains, setOpenDomains] = useState<number[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [autreDomaine, setAutreDomaine] = useState({
    domaine: "",
    secteur: "",
    description: "",
  });

  // ✅ Gérer les cases cochées
  const handleCheckboxChange = (sous: string, checked: boolean) => {
    setSelectedItems((prev) =>
      checked ? [...prev, sous] : prev.filter((item) => item !== sous)
    );
  };

  // ✅ Ajouter le domaine "Autre"
  const handleAddClick = () => {
    if (autreDomaine.domaine.trim() !== "") {
      const newEntry = `${autreDomaine.domaine} (${autreDomaine.secteur || "non spécifié"})`;
      setSelectedItems((prev) => [...new Set([...prev, newEntry])]);
      setAutreDomaine({ domaine: "", secteur: "", description: "" }); // réinitialiser
    }
  };

  // ✅ Ouvrir / fermer un domaine
  const toggleDomain = (id: number) => {
    setOpenDomains((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  

  
  // 🟩 Quand la liste change, prévenir le parent
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedItems);
    }
  }, [selectedItems, onSelectionChange]);


  return (
    <div className="space-y-4">
      {domainesData.map((domaine) => {
        const isOpen = openDomains.includes(domaine.id);

        return (
          <div
            key={domaine.id}
            className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
          >
            {/* En-tête du domaine */}
            <div
              onClick={() => toggleDomain(domaine.id)}
              className="flex items-center justify-between text-blue-700 font-semibold cursor-pointer select-none"
            >
              <span>{domaine.categorie}</span>
              {isOpen ? (
                <ChevronDown className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </div>

            {/* Sous-domaines */}
            {isOpen && (
              <ul className="ml-4 mt-2 list-disc text-gray-700">
                {domaine.sous_domaines.map((sous, i) => {
                  const checkboxId = `chk-${domaine.id}-${i}`;
                  return (
                    <li
                      key={checkboxId}
                      className="hover:bg-gray-700 hover:text-white hover:rounded-3xl hover:pl-2 p-1"
                    >
                      <input
                        type="checkbox"
                        id={checkboxId}
                        className="mr-2 accent-blue-600"
                        onChange={(e) =>
                          handleCheckboxChange(sous, e.target.checked)
                        }
                      />
                      <label
                        htmlFor={checkboxId}
                        className="max-w-11/12 ml-1.5 cursor-pointer w-full"
                        style={{ paddingRight: "20rem" }}
                      >
                        {sous}
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}

      {/* SECTION AUTRE */}
      <div className="border rounded-2xl p-4 bg-white shadow hover:shadow-md transition">
        <div
          onClick={() => toggleDomain(100)}
          className="flex items-center justify-between text-blue-700 font-semibold cursor-pointer select-none"
        >
          <span>Autre ...</span>
          {openDomains.includes(100) ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </div>

        {openDomains.includes(100) && (
          <div className="mt-3 space-y-3 ml-2">
            <input
              type="text"
              placeholder="Entrer le domaine"
              value={autreDomaine.domaine}
              onChange={(e) =>
                setAutreDomaine({ ...autreDomaine, domaine: e.target.value })
              }
              className="w-full border rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <input
              type="text"
              placeholder="Secteur spécifique"
              value={autreDomaine.secteur}
              onChange={(e) =>
                setAutreDomaine({ ...autreDomaine, secteur: e.target.value })
              }
              className="w-full border rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <textarea
              name="Description"
              placeholder="Description du domaine"
              value={autreDomaine.description}
              onChange={(e) =>
                setAutreDomaine({ ...autreDomaine, description: e.target.value })
              }
              className="w-full border rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition min-h-[90px] resize-none"
            ></textarea>

            <button
              onClick={handleAddClick}
              className="w-full bg-blue-600 text-white font-semibold rounded-xl py-2 hover:bg-blue-700 transition"
            >
              Ajouter
            </button>
          </div>
        )}
      </div>

            {/* LISTE DES ÉLÉMENTS AJOUTÉS */}
      {selectedItems.length > 0 && (
        <div className="bg-gray-100 border rounded-xl p-4 mt-4">
          <h3 className="text-blue-700 font-semibold mb-2">
            ✅ Liste des domaines sélectionnés :
          </h3>
          <ul className="list-disc ml-5 text-gray-800">
            {selectedItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      
    </div>
  );
};

export default ListOfLists;
