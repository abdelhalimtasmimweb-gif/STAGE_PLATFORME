"use client";

import Link from "next/link";

export default function StudentNavbar() {
  return (
    // <nav className="bg-[#1E3A8A] text-white px-6 py-3 shadow-lg">
    <nav className="bg-[#10B981] text-white px-6 py-3 shadow-lg">
      <ul className="flex items-center justify-between gap-6">
        {/* Recherche */}
        <li>
          <Link href="/search" className="hover:text-gray-200">
            Recherche
          </Link>
        </li>


        {/* Liste des stages (scroll vers section) */}
        <li>
          <a href="#stages" className="hover:text-gray-200">
            Liste des stages
          </a>
        </li>

        {/* Entreprises (scroll vers section) */}
        <li>
          <a href="#entreprises" className="hover:text-gray-200">
            Entreprises
          </a>
        </li>


        {/* Portefeuille enregistré */}
        <li>
          <Link href="/saved" className="hover:text-gray-200">
            Portefeuille enregistré
          </Link>
        </li>


        
        {/* Mes stages */}
        <li>
          <Link href="/search" className="hover:text-gray-200">
            Mes stages
          </Link>
        </li>


        {/* Portfolio */}
        <li>
          <Link href="/portfolio" className="hover:text-gray-200">
            Portfolio
          </Link>
        </li>

        {/* Profil */}
        <li>
          <Link href="/profile" className="hover:text-gray-200">
            Profil
          </Link>
        </li>
      </ul>
    </nav>
  );
}
