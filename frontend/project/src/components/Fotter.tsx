import React from 'react'

const Fotter = () => {
  return (
    <div>{/* Footer */}
<footer className="bg-[#111827] text-gray-300 py-12 mt-16">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
    {/* Logo + description */}
    <div>
      <h2 className="text-xl font-bold text-white">StageMatch AI</h2>
      <p className="mt-4 text-sm">
        La plateforme intelligente qui connecte étudiants et entreprises 
        pour des stages adaptés à vos ambitions.
      </p>
    </div>

    {/* Liens rapides */}
    <div>
      <h3 className="text-lg font-semibold text-white">Navigation</h3>
      <ul className="mt-4 space-y-2">
        <li><a href="#" className="hover:text-[#3B82F6]">Accueil</a></li>
        <li><a href="#" className="hover:text-[#3B82F6]">Stages</a></li>
        <li><a href="#" className="hover:text-[#3B82F6]">Entreprises</a></li>
        <li><a href="#" className="hover:text-[#3B82F6]">Contact</a></li>
      </ul>
    </div>

    {/* Ressources */}
    <div>
      <h3 className="text-lg font-semibold text-white">Ressources</h3>
      <ul className="mt-4 space-y-2">
        <li><a href="#" className="hover:text-[#10B981]">Aide</a></li>
        <li><a href="#" className="hover:text-[#10B981]">FAQ</a></li>
        <li><a href="#" className="hover:text-[#10B981]">Conditions</a></li>
        <li><a href="#" className="hover:text-[#10B981]">Confidentialité</a></li>
      </ul>
    </div>

    {/* Réseaux sociaux */}
    <div>
      <h3 className="text-lg font-semibold text-white">Suivez-nous</h3>
      <div className="flex gap-4 mt-4">
        <a href="#" className="hover:text-[#F97316]">🌐</a>
        <a href="#" className="hover:text-[#F97316]">🐦</a>
        <a href="#" className="hover:text-[#F97316]">💼</a>
      </div>
    </div>
  </div>

  {/* Ligne du bas */}
  <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
    © {new Date().getFullYear()} StageMatch AI. Tous droits réservés.
  </div>
</footer>
</div>
  )
}


export default Fotter
