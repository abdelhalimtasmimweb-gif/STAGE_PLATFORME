"use client";

import React, { useState } from "react";
import Header from "./Header";
import ThemeToggle from "./ui/ThemeToggle";
import { Theme } from "react-select";

interface StudentProfileProps {
  profile: {
    id: number;
    firstName: string;
    familyName: string;
    age: number;
    cv: string;
    tel: number;
    linkdin: string;
    description: string;
    pays: string;
    ville: string;
    etablissement: string;
    parcours: string;
    portfolio: string;
    imageUrl: string;
  };
  onUpdate?: (updatedProfile: any) => void;     // callback pour sauvegarder les modifications
  changeFunction :(theme: any)=>void;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ profile, onUpdate ,changeFunction }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [theme,setTheme]=useState(localStorage.getItem("theme"));
  const [newImageUrl, setImageUrl] = useState("/default-avatar.png"); // image par défaut

  const changeToggle=async ()=>{
    const newval=await theme==="dark"?"light":"dark";
    setTheme(newval);
    changeFunction(newval);
}

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    if (onUpdate) onUpdate(editedProfile);
    console.log("✅ Profil mis à jour :", editedProfile);
  };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Prévisualisation immédiate
      const reader = new FileReader();
      reader.onload = async (e) => {
        await setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      profile.imageUrl=newImageUrl;
    }
  };

  return (
    <div className={theme==="light"?"max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 mt-10":
        "max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-6 mt-10"}>      
      {/* Header */}
      <div className="mb-9">
          <Header/>
       </div>   
      <div onClick={changeToggle}>
          <ThemeToggle/>
      </div>
      <div className="flex items-center justify-between mb-6">
        <h2 className={theme==="light"?"text-2xl font-semibold text-gray-800"
            :"text-2xl font-semibold text-gray-200"
        }>Profil étudiant</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700"
        >
          {isEditing ? "Annuler" : "Modifier"}
        </button>
      </div>

      {/* Photo et infos principales */}
      <div className="flex items-center space-x-6">
        {isEditing ? (
                       <div>
            <label htmlFor="imageUpload" className="cursor-pointer">
            <img
          src={editedProfile.imageUrl}
          alt="photo etudiant"
          id="IMG"
          className="w-32 h-32 object-cover rounded-full border-4 border-blue-400"
        />
        </label>
              <input
        id="imageUpload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
                 </div> 
        ):(
               <img
          src={editedProfile.imageUrl}
          alt="photo etudiant"
          className="w-32 h-32 object-cover rounded-full border-4 border-blue-400"
        />
        )}

        <div className="flex flex-col space-y-2">
          {isEditing ? (
            <>
              <input
                name="firstName"
                value={editedProfile.firstName}
                onChange={handleChange}
                className={theme==="dark"?"border p-1 rounded-lg text-gray-400"
                    :"border p-1 rounded-lg"}
              />
              <input
                name="familyName"
                value={editedProfile.familyName}
                onChange={handleChange}
                className={theme==="dark"?"border p-1 rounded-lg text-gray-400"
                    :"border p-1 rounded-lg"}
              />
              <input
                name="parcours"
                value={editedProfile.parcours}
                onChange={handleChange}
                className={theme==="dark"?"border p-1 rounded-lg text-gray-400"
                    :"border p-1 rounded-lg"}
              />
              <input
                name="etablissement"
                value={editedProfile.etablissement}
                onChange={handleChange}
                className={theme==="dark"?"border p-1 rounded-lg text-gray-400"
                    :"border p-1 rounded-lg"}
              />
            </>
          ) : (
            <>
              <h2 className={theme==="dark"?"text-2xl font-semibold text-white":"text-2xl font-semibold"}>
                {editedProfile.firstName} {editedProfile.familyName}
              </h2>
              <p className={theme==="light"?"text-gray-500":"text-gray-300"}>{editedProfile.parcours}</p>
              <p className={theme==="light"?"text-gray-500":"text-gray-300"}>{editedProfile.etablissement}</p>
              <p className={theme==="light"?"text-gray-700":"text-gray-500"}>
                📍 {editedProfile.ville}, {editedProfile.pays}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Informations supplémentaires */}
      <div className="mt-6 space-y-3">
        {[
          { label: "Âge", name: "age", type: "number" },
          { label: "Téléphone", name: "tel", type: "text" },
          { label: "Pays", name: "pays", type: "text" },
          { label: "Ville", name: "ville", type: "text" },
          { label: "Portfolio", name: "portfolio", type: "url" },
          { label: "LinkedIn", name: "linkdin", type: "url" },
          { label: "CV", name: "cv", type: "url" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <span className={theme==="light"?"font-semibold":"font-semibold text-gray-50"}>{label} :</span>{" "}
            {isEditing ? (
              <input
                name={name}
                type={type}
                value={(editedProfile as any)[name]}
                onChange={handleChange}
                className={theme==="light"?"border rounded-lg p-1 ml-2":
                    "border rounded-lg p-1 ml-2 bg-gray-800 text-gray-400"}
              />
            ) : name === "cv" || name === "portfolio" || name === "linkdin" ? (
              <a
                href={(editedProfile as any)[name]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Voir
              </a>
            ) : (
              <span className={theme==="dark"?"text-gray-300":""}>{(editedProfile as any)[name]}</span>
            )}
          </div>
        ))}

        <div className={theme==="dark"?"text-gray-2000":""}>
          <h3 className={theme==="dark"?"font-semibold text-lg mb-2 text-white":
            "font-semibold text-lg mb-2"}>Description :</h3>
          {isEditing ? (
            <textarea
              name="description"
              value={editedProfile.description}
              onChange={handleChange}
              className={theme==="dark"?"w-full border p-2 rounded-xl text-gray-200"
                    :"w-full border p-2 rounded-xl"}
              
            />
          ) : (
            <p className="text-gray-700 bg-gray-50 p-3 rounded-xl">
              {editedProfile.description}
            </p>
          )}
        </div>
      </div>

      {/* Bouton de sauvegarde */}
      {isEditing && (
        <div className="mt-6 text-center">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
          >
            
            💾 Sauvegarder les modifications
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
