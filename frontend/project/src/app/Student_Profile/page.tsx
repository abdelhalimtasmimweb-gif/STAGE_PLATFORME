
"use client";
import StudentProfile from "@/components/StudentProfile";
import { useState } from "react";



export default function StudentProfilePage() {
  const fakeProfile = {
    id: 1,
    firstName: "Oussama",
    familyName: "Bennani",
    age: 23,
    cv: "https://example.com/cv_oussama.pdf",
    tel: +212612345678,
    linkdin: "https://linkedin.com/in/oussama-bennani",
    description:
      "Étudiant en ingénierie logicielle passionné par les technologies web et l’intelligence artificielle.",
    pays: "Maroc",
    ville: "Agadir",
    etablissement: "ENSA Agadir",
    parcours: "Cycle ingénieur - Génie informatique",
    portfolio: "https://oussama-portfolio.vercel.app",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  };
  const [theme,setTheme]=useState();
  const changeTheme=(newTheme:any)=>{
    setTheme(newTheme);
  }

  const handleUpdate = (updatedData: any) => {
    console.log("📤 Données mises à jour :", updatedData);
    // Exemple : tu pourrais ensuite faire
    // fetch("http://localhost:3000/student-profiles/"+updatedData.id, {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(updatedData),
    // });
  };

  return (
    <div className={theme==="light"?"p-10 bg-gray-100 min-h-screen":"p-10 bg-gray-900 min-h-screen"}>
      <StudentProfile profile={fakeProfile} onUpdate={handleUpdate} changeFunction={changeTheme}/>
    </div>
  );
}
