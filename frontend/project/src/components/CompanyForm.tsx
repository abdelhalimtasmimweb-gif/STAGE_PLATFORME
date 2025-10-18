
"use client";


import React, { useState, useMemo, useEffect } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import ListOfLists from "@/components/ui/ListOfLists";

const CreateCompanyForm = ({ domainesData }: { domainesData: any[] }) => {
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    description: "",
    foundedYear: "",
    employees: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
    googleMapsLink: "",
    latitude: 0,
    longitude: 0,
    industry: "",
    specialties: [] as string[],
    companyType: "",
    email: "",
    phone: "",
    website: "",
    linkedin: "",
    twitter: "",
    availableInternships: 0,
    jobOffers: 0,
    partnerships: [] as string[],
    rating: 0,
    isHiring: false,
  });

  const options = useMemo(() => countryList().getData(), []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Gestion du changement de pays
  const handleCountryChange = (value: any) => {
    setFormData((prev) => ({ ...prev, country: value.label }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Entreprise créée :", formData);
    alert("Entreprise ajoutée avec succès !");
  };

  const handleSpecialtiesChange = (selected: string[]) => {
  setFormData((prev) => ({
    ...prev,
    specialties: selected,
  }));
};


 

  return (
    
    <div className="max-w-4xl mx-auto shadow-lg rounded-2xl p-8 mt-8 backdrop-blur-xl bg-white">

      <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
        🏢 Créer une nouvelle entreprise
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations de base */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nom de l'entreprise"
            value={formData.name}
            onChange={handleChange}
            required
            className="border rounded-xl p-2.5 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            name="logo"
            placeholder="URL du logo"
            value={formData.logo}
            onChange={handleChange}
            className="border rounded-xl p-2.5 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <textarea
          name="description"
          placeholder="Description de l'entreprise"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-xl p-2.5 focus:ring-2 focus:ring-blue-400 outline-none min-h-[90px]"
        />

        {/* Informations générales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <input
            type="number"
            name="foundedYear"
            placeholder="Année de création"
            value={formData.foundedYear}
            onChange={handleChange}
            className="border rounded-xl p-2.5 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="number"
            name="employees"
            placeholder="Nombre d'employés"
            value={formData.employees}
            onChange={handleChange}
            className="border rounded-xl p-2.5 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* ✅ Sélecteur de pays */}
          <div className="col-span-2">
            <Select
              options={options}
              value={options.find((opt) => opt.label === formData.country)}
              onChange={handleCountryChange}
              placeholder="Sélectionnez un pays"
              className="text-sm"
            />
          </div>
        </div>

        {/* Adresse */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="address"
            placeholder="Adresse"
            value={formData.address}
            onChange={handleChange}
            className="border rounded-xl p-2.5 focus:ring-2 focus:ring-blue-400 outline-none md:col-span-2"
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Code postal"
            value={formData.postalCode}
            onChange={handleChange}
            className="border rounded-xl p-2.5 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          {/* <input
            type="text"
            name="industry"
            placeholder="Secteur d'activité"
            value={formData.industry}
            onChange={handleChange}
            className="border rounded-xl p-2.5 focus:ring-2 focus:ring-blue-400 outline-none"
          /> */}
        </div>
        {/* Localisation géographique */}
<div className="grid grid-cols-1 md:grid-cols-7 gap-4 mt-4">
    <input
    type="text"
    name="googleMapsLink"
    placeholder="Lien Google Maps"
    value={formData.googleMapsLink}
    onChange={handleChange}
    className="border rounded-xl p-2.5 focus:ring-2 focus:ring-blue-400 outline-none md:col-span-3"
  />
  
    <input
    type="number"
    name="latitude"
    placeholder="Latitude"
    value={formData.latitude || ""}
    onChange={handleChange}
    step="any"
    className="border rounded-xl p-2.5 focus:ring-2 focus:ring-blue-400 outline-none col-span-2"
  />
  <input
    type="number"
    name="longitude"
    placeholder="Longitude"
    value={formData.longitude || ""}
    onChange={handleChange}
    step="any"
    className="border rounded-xl p-2.5 focus:ring-2 focus:ring-blue-400 outline-none col-span-2"
  />
  </div>


        {/* Informations supplémentaires */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <input
    type="text"
    name="city"
    placeholder="Ville"
    value={formData.city}
    onChange={handleChange}
    className="border rounded-xl p-2.5 focus:ring-2 focus:ring-blue-400 outline-none"
  />
  
  <input
    type="text"
    name="industry"
    placeholder="Secteur d'activité"
    value={formData.industry}
    onChange={handleChange}
    className="border rounded-xl p-2.5 focus:ring-2 focus:ring-blue-400 outline-none"
  />
  <input
    type="text"
    name="companyType"
    placeholder="Type d'entreprise"
    value={formData.companyType}
    onChange={handleChange}
    className="border rounded-xl p-2.5 focus:ring-2 focus:ring-blue-400 outline-none"
  />
  <input
    type="email"
    name="email"
    placeholder="Email"
    value={formData.email}
    onChange={handleChange}
    className="border rounded-xl p-2.5 focus:ring-2 focus:ring-blue-400 outline-none"
  />
  <input
    type="text"
    name="phone"
    placeholder="Téléphone"
    value={formData.phone}
    onChange={handleChange}
    className="border rounded-xl p-2.5 focus:ring-2 focus:ring-blue-400 outline-none"
  />
  <input
    type="text"
    name="website"
    placeholder="Site web"
    value={formData.website}
    onChange={handleChange}
    className="border rounded-xl p-2.5 focus:ring-2 focus:ring-blue-400 outline-none"
  />
  <input
    type="text"
    name="linkedin"
    placeholder="LinkedIn"
    value={formData.linkedin}
    onChange={handleChange}
    className="border rounded-xl p-2.5 focus:ring-2 focus:ring-blue-400 outline-none"
  />
  <input
    type="text"
    name="twitter"
    placeholder="Twitter"
    value={formData.twitter}
    onChange={handleChange}
    className="border rounded-xl p-2.5 focus:ring-2 focus:ring-blue-400 outline-none"
  />
</div>

{/* Offres et partenariats */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
  <input
    type="number"
    name="availableInternships"
    placeholder="Stages disponibles"
    value={formData.availableInternships}
    onChange={handleChange}
    className="border rounded-xl p-2.5 focus:ring-2 focus:ring-blue-400 outline-none"
  />
  <input
    type="number"
    name="jobOffers"
    placeholder="Offres d'emploi"
    value={formData.jobOffers}
    onChange={handleChange}
    className="border rounded-xl p-2.5 focus:ring-2 focus:ring-blue-400 outline-none"
  />
  <input
    type="text"
    name="partnerships"
    placeholder="Partenariats (séparés par des virgules)"
    value={formData.partnerships.join(", ")}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        partnerships: e.target.value.split(",").map((s) => s.trim()),
      }))
    }
    className="border rounded-xl p-2.5 focus:ring-2 focus:ring-blue-400 outline-none"
  />
</div>

{/* Rating et recrutement */}
<div className="flex items-center space-x-4 mt-4">
  {/* <input
    type="number"
    name="rating"
    placeholder="Note de l'entreprise (0-5)"
    value={formData.rating}
    onChange={handleChange}
    min={0}
    max={5}
    className="border rounded-xl p-2.5 focus:ring-2 focus:ring-blue-400 outline-none w-32"
  /> */}

  <label className="flex items-center space-x-2">
    <input
      type="checkbox"
      name="isHiring"
      checked={formData.isHiring}
      onChange={handleChange}
      className="w-5 h-5"
    />
    <span>Recrute actuellement</span>
  </label>
</div>


        {/* Domaines d’activité */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-blue-700 mb-3">
            Domaines d’activité
          </h3>
          <ListOfLists domainesData={domainesData} onSelectionChange={handleSpecialtiesChange} selectedSpecialties={formData.specialties}/>
        </div>

        {/* Bouton d’enregistrement */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold rounded-xl py-2 hover:bg-blue-700 transition"
        >
          Enregistrer l'entreprise
        </button>
      </form>
    </div>
    
  );
};

export default CreateCompanyForm;
