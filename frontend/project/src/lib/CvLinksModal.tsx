"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function CvLinksModal() {
  const [open, setOpen] = useState(false);

  const sites = [
    { name: "Zety", url: "https://zety.fr/" },
    { name: "SweetCV", url: "https://sweetcv.com/fr" },
    { name: "Renderforest", url: "https://www.renderforest.com/fr/resume-websites" },
    { name: "Jimdo", url: "https://www.jimdo.com/fr/site-internet/cv-en-ligne/" },
    { name: "WebCV (Maroc)", url: "https://webcv.ma/" },
    { name: "Proonweb", url: "https://proonweb.net/" },
    { name: "Kickresume", url: "https://kickresume.com/" },
    { name: "Canvas", url: "https://www.canva.com/s/templates?query=cv" },
  ];

  return (
    <div>
      {/* Bouton qui ouvre le modal */}
      <Button onClick={() => setOpen(true)} variant="outline">✍️ Créer CV</Button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 w-96 relative">
            
            {/* Bouton fermer */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4 text-center text-blue-600 dark:text-blue-300">
              🌐 Sites pour créer un CV
            </h2>

            <ul className="space-y-3">
              {sites.map((site) => (
                <li key={site.name}>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {site.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
