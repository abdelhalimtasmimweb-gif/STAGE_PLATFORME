
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-xl font-bold text-[#1E3A8A]">
            StageMatch <span className="text-[#3B82F6]">AI</span>
          </h1>
          <nav className="flex gap-8 text-[#1E3A8A] font-medium">
            <a href="/Home" className="hover:text-[#3B82F6]">Accueil</a>
            <a href="#stages" className="hover:text-[#3B82F6]">Stages</a>
            <a href="#entreprises" className="hover:text-[#3B82F6]">Entreprise</a>
            <a href="./Auth/login" className="hover:text-[#3B82F6]">Connexion</a>
          </nav>
        </div>
      </header>

  )
}

export default Header
