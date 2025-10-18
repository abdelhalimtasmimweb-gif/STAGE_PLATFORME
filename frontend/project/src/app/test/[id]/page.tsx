"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Building2, Globe, Mail, MapPin, Phone, Users, Star } from "lucide-react";
import Image from "next/image";
import { theme } from "@/lib/theme";
import ThemeToggle from "@/components/ui/ThemeToggle";


interface Company {
  _id: string;
  name: string;
  logo?: string;
  description?: string;
  foundedYear?: number;
  employees?: number;
  country?: string;
  city?: string;
  address?: string;
  postalCode?: string;
  industry?: string;
  specialties?: string[];
  companyType?: string;
  email?: string;
  phone?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  availableInternships?: number;
  jobOffers?: number;
  partnerships?: string[];
  rating?: number;
  isHiring?: boolean;
}

export default function CompanyDetailsPage() {
  const { id } = useParams();
  const [company, setCompany] = useState<Company | null>(null);
  const { colors } = theme.light;

//   useEffect(() => {
//     const fetchCompany = async () => {
//       try {
//         const res = await fetch(`http://localhost:3000/companies/${id}`);
//         const data = await res.json();
//         setCompany(data);
//       } catch (error) {
//         console.error("Erreur lors du chargement de l’entreprise :", error);
//       }
//     };
//     fetchCompany();
//   }, [id]);
  setCompany({
     _id: "1",
      name: "TechNova Solutions",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png",
      description:
        "TechNova Solutions est une entreprise innovante spécialisée dans le développement de solutions logicielles basées sur l’intelligence artificielle et le cloud computing.",
      foundedYear: 2018,
      employees: 85,
      country: "Maroc",
      city: "Casablanca",
      industry: "Technologie et Innovation",
      specialties: ["IA", "Développement Web", "Cloud", "Big Data"],
      email: "contact@technova.ma",
      phone: "+212 612-345678",
      website: "https://technova.ma",
      linkedin: "https://linkedin.com/company/technova",
      twitter: "https://twitter.com/technova",
      availableInternships: 3,
      jobOffers: 5,
      rating: 4.6,
      isHiring: true,
  });
  if (!company) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Chargement des informations...
      </div>
    );
  }

  return (
    <div
          className="min-h-screen flex flex-col items-center p-8 transition-colors duration-300"
          style={{ backgroundColor: colors.background, color: colors.text }}
        >
           <ThemeToggle/>
    
          <div className="w-full max-w-4xl bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-8">
            {/* HEADER */}
            <div className="flex items-center space-x-6 border-b pb-6">
              {company.logo ? (
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={100}
                  height={100}
                  className="rounded-xl object-cover border"
                />
              ) : (
                <div className="w-24 h-24 rounded-xl bg-gray-200 flex items-center justify-center">
                  <Building2 size={40} className="text-gray-500" />
                </div>
              )}
    
              <div className="flex flex-col">
                <h1 className="text-3xl font-bold">{company.name}</h1>
                <p className="text-gray-500">{company.industry || "Secteur non défini"}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Star className="text-yellow-400 w-5 h-5" />
                  <span>{company.rating?.toFixed(1) || 0} / 5</span>
                </div>
              </div>
            </div>
    
            {/* DESCRIPTION */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">À propos</h2>
              <p className="text-gray-700">{company.description}</p>
            </div>
    
            {/* INFOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <Info icon={<Users className="text-blue-600" />} label={`${company.employees} employés`} />
              <Info icon={<MapPin className="text-red-500" />} label={`${company.city}, ${company.country}`} />
              <Info icon={<Phone className="text-green-600" />} label={company.phone || "Non disponible"} />
              <Info icon={<Mail className="text-purple-600" />} label={company.email || "Non disponible"} />
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-blue-600"
                >
                  <Globe className="text-blue-500" />
                  <span>Site web</span>
                </a>
              )}
            </div>
    
            {/* SPÉCIALITÉS */}
            {company.specialties?.length ? (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-2">Spécialités</h2>
                <div className="flex flex-wrap gap-2">
                  {company.specialties.map((spec, i) => (
                    <span key={i} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
    
            {/* OFFRES */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Offer title="Stages disponibles" value={company.availableInternships ?? 0} color="green" />
              <Offer title="Offres d’emploi" value={company.jobOffers ?? 0} color="orange" />
            </div>
    
            {/* LIENS SOCIAUX */}
            <div className="mt-8 flex space-x-4">
              {company.linkedin && (
                <a href={company.linkedin} target="_blank" className="text-blue-700 hover:underline">
                  LinkedIn
                </a>
              )}
              {company.twitter && (
                <a href={company.twitter} target="_blank" className="text-sky-500 hover:underline">
                  Twitter
                </a>
              )}
            </div>
          </div>
        </div>
      );
    }
    
    // 🔹 Composants réutilisables
    function Info({ icon, label }: { icon: React.ReactNode; label: string }) {
      return (
        <div className="flex items-center space-x-3">
          {icon}
          <span>{label}</span>
        </div>
      );
    }
    
    function Offer({ title, value, color }: { title: string; value: number; color: string }) {
      const bg =
        color === "green"
          ? "bg-green-100 text-green-800"
          : "bg-orange-100 text-orange-800";
      return (
        <div className={`${bg} p-4 rounded-lg flex flex-col items-center`}>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-3xl font-bold">{value}</p>
        </div>
      );
}
// function useTheme(): { colors: any; } {
//     throw new Error("Function not implemented.");
// }

