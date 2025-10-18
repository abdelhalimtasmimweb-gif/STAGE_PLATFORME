
// "use client";

// import { useEffect, useState } from "react";
// import { FaMoon, FaSun } from "react-icons/fa";

// export default function ThemeToggle() {
//   const [theme, setTheme] = useState<"light" | "dark">("light");

//   // Charger la préférence depuis localStorage au montage
//   useEffect(() => {
//     const storedTheme = localStorage.getItem("theme");
//     if (storedTheme === "dark" || storedTheme === "light") {
//       setTheme(storedTheme);
//       document.documentElement.classList.toggle("dark", storedTheme === "dark");
//     }
//   }, []);

//   // Sauvegarder dans localStorage et mettre à jour le document
//   useEffect(() => {
//     localStorage.setItem("theme", theme);
//     document.documentElement.classList.toggle("dark", theme === "dark");
//   }, [theme]);

//   return (
//     <button
//       onClick={() => setTheme(theme === "light" ? "dark" : "light")}
//       className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 fixed top-4 right-4 shadow-md"
//     >
//       {theme === "light" ? <FaMoon /> : <FaSun />}
//     </button>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";
// import { FaMoon, FaSun } from "react-icons/fa";

// export default function ThemeToggle() {
//   const [theme, setTheme] = useState<"light" | "dark">("light");

//   // Charger le thème au montage + écouter les changements
//   useEffect(() => {
//     // Charger depuis localStorage si dispo
//     const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
//     if (savedTheme) {
//       setTheme(savedTheme);
//       document.documentElement.classList.toggle("dark", savedTheme === "dark");
//     }

//     // Observer les changements manuels sur <html>
//     const observer = new MutationObserver(() => {
//       if (document.documentElement.classList.contains("dark")) {
//         setTheme("dark");
//       } else {
//         setTheme("light");
//       }
//     });

//     observer.observe(document.documentElement, { attributes: true });

//     return () => observer.disconnect();
//   }, []);

//   // Fonction pour basculer le thème
//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);

//     // Appliquer à <html>
//     document.documentElement.classList.toggle("dark", newTheme === "dark");

//     // Sauvegarder
//     localStorage.setItem("theme", newTheme);
//   };

//   return (
//     <button
//       onClick={toggleTheme}
//       className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 fixed top-4 right-4 shadow-md"
//     >
//       {theme === "light" ? <FaMoon /> : <FaSun />}
//     </button>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import { FaMoon, FaSun } from "react-icons/fa";

// export default function ThemeToggle() {
//   // null = pas encore initialisé (évite les problèmes de hydration)
//   const [theme, setTheme] = useState<"light" | "dark" | null>(null);

//   const applyTheme = (t: "light" | "dark") => {
//     if (t === "dark") document.documentElement.classList.add("dark");
//     else document.documentElement.classList.remove("dark");
//   };

//   useEffect(() => {
//     // initialisation côté client seulement
//     const init = () => {
//       try {
//         const saved = localStorage.getItem("theme") as "light" | "dark" | null;
//         if (saved === "light" || saved === "dark") {
//           setTheme(saved);
//           applyTheme(saved);
//           return;
//         }

//         // si pas de préférence sauvegardée → suivre préférence système
//         const prefersDark =
//           typeof window !== "undefined" &&
//           window.matchMedia &&
//           window.matchMedia("(prefers-color-scheme: dark)").matches;

//         const initial = prefersDark ? "dark" : "light";
//         setTheme(initial);
//         applyTheme(initial);
//       } catch {
//         // si localStorage indisponible → fallback
//         setTheme("light");
//         applyTheme("light");
//       }
//     };

//     init();

//     // écouter storage (autres onglets)
//     const onStorage = (e: StorageEvent) => {
//       if (e.key === "theme" && (e.newValue === "light" || e.newValue === "dark")) {
//         applyTheme(e.newValue as "light" | "dark");
//         setTheme(e.newValue as "light" | "dark");
//       }
//     };
//     window.addEventListener("storage", onStorage);

//     // observer changements manuels sur <html class="...">
//     const mo = new MutationObserver((mutations) => {
//       for (const m of mutations) {
//         if (m.type === "attributes") {
//           setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
//         }
//       }
//     });
//     mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

//     return () => {
//       window.removeEventListener("storage", onStorage);
//       mo.disconnect();
//     };
//   }, []);

//   const toggle = () => {
//     if (!theme) return;
//     const newTheme = theme === "dark" ? "light" : "dark";
//     setTheme(newTheme);
//     applyTheme(newTheme);
//     try {
//       localStorage.setItem("theme", newTheme);
//     } catch {
//       // ignore
//     }
//   };

//   // pendant l'initialisation on évite d'afficher des classes qui pourraient causer un mismatch
//   if (theme === null) {
//     return (
//       <button
//         aria-hidden
//         className="p-2 rounded-full fixed top-4 right-4 opacity-0 pointer-events-none"
//       />
//     );
//   }

//   return (
//     <button
//       onClick={toggle}
//       aria-label="Basculer thème"
//       className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 fixed top-4 right-4 shadow-md"
//     >
//       {theme === "light" ? <FaMoon /> : <FaSun />}
//     </button>
//   );
// }




// ui/ThemeToggle.tsx
"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  // lazy init sécurisée (évite de casser si window non défini)
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
    const prefersDark =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  // applique la classe <html> et sauvegarde quand theme change
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore si localStorage bloqué */
    }
  }, [theme]);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    // log pour debug
    console.log("[ThemeToggle] toggled →", next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Basculer thème"
      aria-pressed={theme === "dark"}
      data-theme={theme}
      title={`Thème : ${theme}`}
      className="p-2 rounded-full fixed top-4 right-4 z-50 cursor-pointer pointer-events-auto bg-gray-200 dark:bg-gray-800 shadow-md"
    >
      {theme === "dark" ? <FaSun /> : <FaMoon />}
    </button>
  );
}
