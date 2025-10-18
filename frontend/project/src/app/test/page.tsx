"use client";

import React, { useState } from "react";
import StageListBlock from "@/components/StageListBlock";
import SearchComponent from "@/components/SearchComponent";
import CvLinksModal from "@/lib/CvLinksModal";
import StudentNavbar from "@/components/StudentNavbar";
import Header from "@/components/Header";
import CompanyList from "@/components/CompanyList";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Rating from "@/components/Rating";
import Fotter from "@/components/Fotter";
import MesStages from "@/components/MesStages";
import ChatBoot from "@/components/chatBoot";
import LocationMap from "@/components/LocationMap";


const page = () => {
  const fakeStages = [
    {
      id: 1,
      title: "Stage Développeur Web React",
      description: "Participer au développement d'une application web avec React et TailwindCSS.",
      location: "Casablanca, Maroc",
      image: "https://images.unsplash.com/photo-1581090700227-4c4f50b39d2d?fit=crop&w=600&q=80",
      remote: false,
      salary: 3000,
    },
    {
      id: 2,
      title: "Stage Data Analyst",
      description: "Analyser des données clients et produire des tableaux de bord avec Python et PowerBI.",
      location: "Rabat, Maroc",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?fit=crop&w=600&q=80",
      remote: true,
      salary: 4000,
    },
    {
      id: 3,
      title: "Stage Marketing Digital",
      description: "Contribuer à la stratégie de communication et gérer les campagnes publicitaires en ligne.",
      location: "Marrakech, Maroc",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?fit=crop&w=600&q=80",
      remote: true,
      salary: 2500,
    },
  ];

  const [results, setResults] = useState(fakeStages);

  return (
    <div>
        <ErrorMessage/>

        <div className="m-52">
        <Header></Header>
        </div>
       <div className="top-14 left-0 mb-11 fixed z-50 w-full">
        <StudentNavbar></StudentNavbar>
         
        </div>
      {/* <CvLinksModal /> */}
     
      {/* Formulaire de recherche */}
      <div id="stages">
       <SearchComponent stages={fakeStages} onResults={setResults} />
       </div>
      {/* Liste filtrée */}
      <div>
      <StageListBlock stages={results} />
      </div>
         <div>
            <CompanyList/>
        </div>

        <MesStages/>
        
        
         <ChatBoot></ChatBoot>
        

        <Fotter/>


    </div>
    
  );
};

export default page;



