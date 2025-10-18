"use client";

import { Button } from "@/components/ui/Button";
import { Search, Handshake, FileText, Rocket } from "lucide-react";
import Image from "next/image";
import StageList from "@/components/StageList";
import Header from "@/components/Header";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import ChatBot from "@/components/chatBoot";


export default function Home() {
     const router = useRouter();

    return (

    <main className="bg-[#F3F4F6] min-h-screen flex flex-col pt-0.5">
      {/* Header */}
      {/* <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-xl font-bold text-[#1E3A8A]">
            StageMatch <span className="text-[#3B82F6]">AI</span>
          </h1>
          <nav className="flex gap-8 text-[#1E3A8A] font-medium">
            <a href="#" className="hover:text-[#3B82F6]">Accueil</a>
            <a href="#" className="hover:text-[#3B82F6]">Stages</a>
            <a href="#" className="hover:text-[#3B82F6]">Entreprise</a>
            <a href="#" className="hover:text-[#3B82F6]">Connexion</a>
          </nav>
        </div>
      </header> */}
       <Header/>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white py-20">
        <div className="max-w-7xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Bienvenue sur <span className="text-[#10B981] text-shadow-2xs text-shadow-cyan-50">
                StageMatch AI</span>
          </h2>
          <p className="mt-4 text-lg text-gray-200">
            La plateforme qui connecte <strong>étudiants</strong> et{" "}
            <strong>entreprises</strong> pour construire l’avenir.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 justify-center">
            <Button className="bg-[#10B981] text-white px-8 py-4 rounded-xl shadow-lg hover:bg-[#059669]" onClick={() => router.push("/test")}>
              Explorer les stages
            </Button>
            <Button className="bg-[#F97316] text-white px-8 py-4 rounded-xl shadow-lg hover:bg-[#ea580c]">
              Publier un stage
            </Button>
          </div>
          <div className="mt-10 flex justify-center">
            <Image
              src="/Zz0xNGM4YjhlNjZiNGExMWVmYTQ2ZTVhNDFmOGU3ZGZkZg==.jpeg"
              alt="Illustration"
              width={1920}
              height={320}
              className="rounded-2xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Pourquoi choisir notre plateforme */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#1E3A8A]">
            Pourquoi choisir StageMatch AI ?
          </h2>
          <p className="mt-3 text-gray-600">
            Une solution moderne, fiable et simple d’utilisation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
            <div className="p-6 rounded-2xl bg-[#F9FAFB] shadow-sm hover:shadow-md transition">
              <Search className="text-[#1E3A8A] w-10 h-10 mx-auto" />
              <h3 className="mt-4 font-semibold text-lg text-[#111827]">
                Recherche simplifiée
              </h3>
              <p className="text-gray-600 mt-2">
                Accédez facilement aux stages qui vous intéressent.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#F9FAFB] shadow-sm hover:shadow-md transition">
              <Handshake className="text-[#3B82F6] w-10 h-10 mx-auto" />
              <h3 className="mt-4 font-semibold text-lg text-[#111827]">
                Connexion directe
              </h3>
              <p className="text-gray-600 mt-2">
                Contactez les entreprises en toute simplicité.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#F9FAFB] shadow-sm hover:shadow-md transition">
              <FileText className="text-[#10B981] w-10 h-10 mx-auto" />
              <h3 className="mt-4 font-semibold text-lg text-[#111827]">
                Gestion facile
              </h3>
              <p className="text-gray-600 mt-2">
                Suivez vos candidatures de manière efficace.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#F9FAFB] shadow-sm hover:shadow-md transition">
              <Rocket className="text-[#F97316] w-10 h-10 mx-auto" />
              <h3 className="mt-4 font-semibold text-lg text-[#111827]">
                Opportunités variées
              </h3>
              <p className="text-gray-600 mt-2">
                Profitez d’un large choix de stages adaptés.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stages disponibles */}
      <section className="bg-[#F3F4F6] py-16" id="stages">
           <StageList/>
      </section>
      {/* Footer */}
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
      <ChatBot/>
    </main>
  );
}
