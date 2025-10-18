import { Button } from "./ui/Button";
import Image from "next/image";

export default function StageList(){
    
    
    const stageImages=[];
    const descriptions=[];
    const titles=[];
    
    return(
<div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#1E3A8A]">
            Stages disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {["Titre du stage", "Titre du stage", "Titre du stage"].map(
              (title, index) => (
               
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white shadow-md border border-gray-200 hover:shadow-lg transition"
                >
                  <div className="w-11/12 mx-auto mb-1 text-center">
                    <img src="/Zz0xNGM4YjhlNjZiNGExMWVmYTQ2ZTVhNDFmOGU3ZGZkZg==.jpeg"
                    className="mx-auto w-11/12 h-44"/>
                  </div>

                  <h3 className="font-semibold text-lg text-[#111827]">
                    {title}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Description rapide du stage ici...
                  </p>
                  <Button className="mt-4 bg-[#1E3A8A] text-white px-6 py-2 rounded-lg hover:bg-[#3B82F6]">
                    Voir plus
                  </Button>
                </div>
              )
            )}
          </div>
        </div>

        );}    