"use client";

import { useState } from "react";
import { User, Phone, MapPin, GraduationCap, Landmark, Globe, Type } from "lucide-react"; 
import UploadProfileImage from "./ui/upload/page"; 
import Header from "./Header";
import ThemeToggle from "./ui/ThemeToggle";
import CountryList from "./ui/CountryList";
import Image from "next/image";
import { Button } from "./ui/Button";
import CvLinksModal from "@/lib/CvLinksModal";

export default function StudentProfileForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    familyName: "",
    age: "",
    tel: 0,
    linkdin: "",
    description: "",
    etablissement: "",
    pays: "",
    ville: "",
    parcours: "",
    userId: "", // récupéré depuis ton auth
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/student-profiles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erreur lors de l’envoi du profil");

      const data = await response.json();
      console.log("Profil créé :", data);
      alert("Profil créé avec succès !");
    } catch (error) {
      console.error(error);
      alert("Échec de la création du profil");
    }
  };

  return (
    <div className="bg-[#10B981]">
        <div className="p-10">
      <Header /> 
      <ThemeToggle />
      </div> 
      <div className="flex flex-row gap-6 bg-[#10B981]">
    <div className="ml-2.5 w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-6">
      
      

      <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-300 mb-6">
        Créer mon profil étudiant
      </h2>

      {/* Upload image */}
      <div className="flex justify-center mb-6">
        <input/>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Prénom */}
        <div className="relative">
          <Type className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            name="firstName"
            placeholder="Prénom"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Nom de famille */}
        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            name="familyName"
            placeholder="Nom de famille"
            value={formData.familyName}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Âge */}
        <div className="relative">
          <input
            type="number"
            name="age"
            placeholder="Âge"
            value={formData.age}
            onChange={handleChange}
            className="w-full pl-3 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Téléphone */}
        <div className="relative">
          <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="tel"
            name="tel"
            placeholder="Téléphone"
            value={formData.tel}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* LinkedIn */}
        <div className="relative">
          <Globe className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            name="linkdin"
            placeholder="Lien LinkedIn"
            value={formData.linkdin}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Établissement */}
        <div className="relative">
          <Landmark className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            name="etablissement"
            placeholder="Établissement"
            value={formData.etablissement}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Pays */}
        <div className="relative">
            <CountryList classe="w-full pl-3 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
        </div>

        {/* Ville */}
        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            name="ville"
            placeholder="Ville"
            value={formData.ville}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Parcours scolaire */}
        <div className="relative">
          <GraduationCap className="absolute left-3 top-3 text-gray-400" size={18} />
          <textarea
            name="parcours"
            placeholder="Décrivez votre parcours scolaire..."
            value={formData.parcours}
            onChange={handleChange}
            rows={3}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <textarea
            name="description"
            placeholder="Décrivez-vous..."
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-semibold shadow"
        >
          Enregistrer mon profil
        </button>
      </form>
    </div>
   <div className="relative w-full md:w-1/2 rounded-lg overflow-hidden shadow-lg mb-6">
      {/* Image avec filtre sombre */}
      <Image
        src="/ecofriendly-green-office-building-trees-260nw-2587568947.jpg"
        alt="Image inspiration étudiante"
        width={600}
        height={200}
        className="w-full h-full object-cover"
      />
       {/* filtre sombre */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#065F46]/80 via-[#000000]/30 to-transparent blur-md" />



      {/* Contenu au-dessus de l’image */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6 mb-32">
        {/* filtre Blur */}
        <div className="absolute h-52 w-full z-0 bg-black opacity-30 blur-sm"></div>



        {/* Texte intro */}
        <p className="mb-4 text-lg font-semibold drop-shadow-md z-50">
          Déposez vos documents et présentez vos projets pour enrichir votre profil étudiant.
        </p>

        {/* Boutons */}
        <div className=" absolute gap-3 z-0 bg-white h-14 mt-16 opacity-40 w-full blur-sm"/>
        <div className="flex flex-col sm:flex-row gap-3 z-50">

            

          <Button>📄 Upload CV</Button>
          <CvLinksModal/>
          <Button>🔗 Lien Portfolio</Button>
          <Button variant="outline">🌐 Créer Portfolio</Button>
        </div>
      </div>
    </div>
   </div> 
   </div> 
  );
}
