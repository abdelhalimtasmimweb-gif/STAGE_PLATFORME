import React from "react";
import Rating from "./Rating";

const companies = [
  {
    id: 1,
    name: "Tech Solutions",
    description: "Entreprise spécialisée dans le développement logiciel et les solutions cloud.",
    logo: "https://via.placeholder.com/150x100.png?text=Tech+Solutions",
  },
  {
    id: 2,
    name: "MarketingPro",
    description: "Agence de marketing digital pour booster la visibilité des entreprises.",
    logo: "https://via.placeholder.com/150x100.png?text=Marketing+Pro",
  },
  {
    id: 3,
    name: "DataCorp",
    description: "Experts en analyse de données et intelligence artificielle.",
    logo: "https://via.placeholder.com/150x100.png?text=DataCorp",
  },
  {
    id: 4,
    name: "CyberShield",
    description: "Solutions de cybersécurité et protection des infrastructures IT.",
    logo: "https://via.placeholder.com/150x100.png?text=CyberShield",
  },
];

const CompanyList = () => {
  return (
    <div className="items-center py-12" id="entreprises">
      <h2 className="text-center text-3xl text-[#1E3A8A] font-bold">
        Entreprises
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mx-16 mt-14">
        {companies.map((company) => (
          <div
            key={company.id}
            className="w-full h-72 bg-white rounded-xl shadow-md shadow-[#10b981] p-6 flex flex-col items-center justify-between hover:shadow-lg transition"
          >
            {/* Logo */}
            <img
              src={company.logo}
              alt={company.name}
              className="w-28 h-20 object-contain"
            />
             <div>
            <Rating value={3.5}/>
            </div>

            {/* Nom */}
            <h3 className="text-lg font-semibold text-[#1E3A8A] text-center mt-2">
              {company.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 text-center line-clamp-2">
              {company.description}
            </p>

            {/* Bouton */}
            <button className="mt-3 bg-[#10b981] text-white px-4 py-2 rounded-lg hover:bg-[#059669]">
              Voir plus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
