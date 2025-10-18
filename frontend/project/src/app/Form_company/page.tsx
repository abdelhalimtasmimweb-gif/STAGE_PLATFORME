
import ListOfLists from '@/components/ui/ListOfLists';
import React from 'react'
import Data from '@/../public/Data/Intership_Fields.json';
import CompanyForm from '@/components/CompanyForm';
import Header from '@/components/Header';

const page = () => {


  return (
    <div 
    style={{
    backgroundImage: "url('/depositphotos_65718495-stock-photo-abstract-blue-background-technology-background.jpg')",
    backgroundSize: "cover",         // image couvre tout l'écran
    backgroundPosition: "center",    // centrée
    backgroundRepeat: "no-repeat",   // pas de répétition
    minHeight: "100vh",              // hauteur = 100% de la fenêtre
    width: "100%",                   // largeur = 100%
  }}>
        <div className='pb-3.5 mb-6'>
            <Header/>
        </div>
        <div className='pt-3.5 mt-6'/>
        <CompanyForm domainesData={Data.domaines_stage}/>
         
        {/* <div className="p-8 bg-gray-100 min-h-screen">  
           <ListOfLists domainesData={Data.domaines_stage}/> 
        </div>  */}
    </div>
  )
}

export default page