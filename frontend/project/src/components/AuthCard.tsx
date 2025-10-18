// "use client";

// import { useState } from "react";
// import { Mail, Lock } from "lucide-react"; // icons

// export default function AuthCard() {
//   const [isLogin, setIsLogin] = useState(true);

//   return (
//     <div className="relative z-10 w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
//       {/* Tabs */}
//       <div className="flex justify-around mb-6">
//         <button
//           onClick={() => setIsLogin(true)}
//           className={`w-1/2 text-center py-2 font-semibold ${
//             isLogin
//               ? "text-blue-600 border-b-4 border-blue-600"
//               : "text-gray-400 border-b-4 border-transparent"
//           }`}
//         >
//           Login
//         </button>
//         <button
//           onClick={() => setIsLogin(false)}
//           className={`w-1/2 text-center py-2 font-semibold ${
//             !isLogin
//               ? "text-blue-600 border-b-4 border-blue-600"
//               : "text-gray-400 border-b-4 border-transparent"
//           }`}
//         >
//           Sign Up
//         </button>
//       </div>

//       {/* Form */}
//       <form className="space-y-4">
//         <div className="relative">
//           <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="relative">
//           <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
//           <input
//             type="password"
//             placeholder="Mot de passe"
//             className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg font-semibold shadow"
//         >
//           {isLogin ? "Se connecter" : "Créer un compte"}
//         </button>
//       </form>

//       {isLogin && (
//         <p className="text-sm text-gray-500 text-center mt-4">
//           Mot de passe oublié ?{" "}
//           <a href="#" className="text-blue-600 hover:underline">
//             Réinitialiser
//           </a>
//         </p>
//       )}
//     </div>
//   );
// }















"use client";

import { FaGoogle, FaLinkedin, FaMoon, FaStar } from "react-icons/fa";
import Image from "next/image";
import { Mail, Lock, User } from "lucide-react";
import { useEffect, useState } from "react";
import ThemeToggle from "./ui/ThemeToggle";
import ErrorMessage from "./ui/ErrorMessage";

export default function LoginPage() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  // const [theme,setTheme]=useState<string|null>(null);
   const initialTheme=localStorage.getItem("theme");
   const [theme, setTheme] = useState<"light" | "dark">("light");

     useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    }
  }, []);

    const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  







  
  const [formData,setformData]= useState({
    name:"",
    email:"",
    password:"",
  });
  const [usernameError,setUsernameError]=useState("");

  const [users,setUsers]=useState({user:['Admin','testeur']});
  const [pwdError,setErrorPassword]=useState("");
  
  
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setformData ({
      ...formData,
      [e.target.name]:e.target.value,
      
    });

  }
 


    const validatePassword = (password: string) => {
    // Regex :
    // - au moins 8 caractères
    // - au moins une minuscule
    // - au moins une majuscule
    // - au moins un chiffre
    // - au moins un symbole
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[A-Za-z\d@$!%*?&^#.,;:!?+-]{8,}$/
;
      
    return !regex.test(password)?"Le mot de passe doit contenir 8 caractères, un chiffre, une majuscule, une minuscule et un symbole.":"";
  };



  useEffect(()=>{
     
    if(users.user.includes(formData.name) && formData.name!=="") {
          setUsernameError("Ce nom d'utilisateur existe déjà !");
          // return;
    }
    else if(formData.name.length<3 && formData.name!==""){
               setUsernameError("Ce nom d'utilisateur est courte !");
          }
    
    else{

       console.log('salam');
       setUsernameError(""); 
    }
    //pour password
   if (formData.password !== "") {
           setErrorPassword(validatePassword(formData.password));
   }else{
           setErrorPassword("");
   }




    
  },[formData]);
     
  const signIn=async ()=>{
    try{
      const response=await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/login`,{

        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          
          email:formData.email,    
          password:formData.password,
        }),

      });
       if (!response.ok) {
      const text = await response.text(); // récupère le texte brut pour debug
      throw new Error(`Erreur API : ${text}`);
    }
       const data=await response.json();
       console.log("Réponse login :", data);
  } catch (error) {
    console.error("Erreur login :", error);
  }
    };

  

  const signup=async ()=>{

    try{
      const responce = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/register`,{
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formData),
      });
      
      const data=await responce.json();
      
    console.log("Réponse signup :", data);
  } catch (error) {
    console.error("Erreur signup :", error);
  };
   console.log(process.env.NEXT_PUBLIC_BACKEND_API?.toString());
                           
  }

  return (
     
    <div className={theme!=='dark'? 
      "flex min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-gray-900":
      "flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100"
      }  >

        <ErrorMessage/>
       <div onClick={toggleTheme}>
       <ThemeToggle />
       </div>
      {/* Zone gauche : Auth Card */}
      <div className="flex w-full items-center justify-center lg:w-1/2 relative">


        {/* Container Form */}
        <div className={theme!=='dark'?"z-10 w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
          :"z-10 w-full max-w-md rounded-2xl bg-gray-600 p-8 shadow-xl"}>
          
          <h1 className={theme!=='dark'?"text-2xl font-bold text-center text-blue-900"
            :"text-2xl font-bold text-center text-gray-50"}>
            StageMatch AI
          </h1>
          <p className={theme!=='dark'?"mt-2 text-center text-gray-600":"mt-2 text-center text-gray-200"}>
            Connectez-vous ou créez un compte
          </p>

          {/* Onglets Login / Signup */}
          <div className="mt-6 flex rounded-lg bg-gray-100 p-1">
            {theme!=='dark'?(<button
              className={`flex-1 py-2 rounded-md text-sm font-medium ${
                tab === "login"
                  ? "bg-white border-b-4 border-b-[#10B981]"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setTab("login")}
            >
              Login
            </button>):( 
              <button
  className={`flex-1 py-2 rounded-md text-sm font-medium ${
    tab === "login"
      ? "bg-white dark:bg-gray-800 border-b-4 border-b-emerald-500 text-blue-900 dark:text-white"
      : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
  }`}
  onClick={() => setTab("login")}
>
  Login
</button>
)}


            <button
              className={`flex-1 py-2 rounded-md text-sm font-medium ${
                tab === "signup"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setTab("signup")}
            >
              Sign Up
            </button>
          </div>

          {/* Formulaire */}
          <form className="mt-6 space-y-4"
          
              onSubmit={(e) => {
              e.preventDefault(); 
              tab === "login" ? signIn() : signup();
               }}
               >
            {/* Champ email */}

          {/* Username visible seulement en SignUp */}

          {tab==="signup" && (
                      <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  name="name"
                  type="text"
                  onChange={handleChange}
                  placeholder="Nom d'utilisateur"
                  className="w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none"
                />
                
                 {usernameError && (
                 <p className="text-red-500 text-sm mt-1">{usernameError}</p>
                  )}

              </div>

            
          )}     


              <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                name="email"
                type="email"
                onChange={handleChange}
                placeholder="Email"
                className="w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none"
              />

            </div>

            {/* Champ password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mot de passe"
                className="w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none"
                autoComplete="current-password"
              />
               {pwdError && (
                 <p className="text-red-500 text-sm mt-1">{pwdError}</p>
                  )}

            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="rounded border-gray-300" />
                Remember me
              </label>
              <a href="#" className={theme!=="dark"?"text-sm text-blue-600 hover:underline":
                "text-sm text-blue-300 hover:underline"
              }>
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-2 text-white font-semibold hover:bg-blue-700 transition"
              // onClick={tab === "login" ? signIn : signup}
            
            
            > 
            

              {tab === "login" ? "Se connecter" : "Créer un compte"}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 flex items-center">
            <hr className="flex-1 border-gray-300" />
            <span className={theme!=='dark'?"px-2 text-sm text-gray-500"
              :"px-2 text-sm text-gray-200"}>ou</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Boutons sociaux */}
          <div className="mt-4 flex gap-3">
            <button className="flex items-center justify-center gap-2 flex-1 rounded-lg border border-gray-300 py-2 text-sm hover:bg-gray-50">
                <FaGoogle className="text-gray-400" size={18} />
                <span className={theme==='dark'&&"hover hover:text-gray-400"}>Google</span>
              
            </button>
            <button className="items-center gap-2 flex justify-center flex-1 rounded-lg border border-gray-300 py-2 text-sm hover:bg-gray-50">
                <FaLinkedin className="text-gray-400" size={18}/>
                 <span className={theme==='dark'&&"hover hover:text-gray-400"}>LinkedIn</span>
                 
            </button>
          </div>
        </div>
      </div>

      {/* Zone droite : Illustration */}
      <div className="hidden lg:flex w-1/2 items-center justify-right relative">
        {/* Tu peux mettre ici ton image d’illustration */}
        <Image
          src="/illustration .png" // mets ton illustration ici (public/student.png)
          alt="Étudiant"
          width={400}
          height={400}
          className="drop-shadow-lg"
        />
      </div>

      {/* Cercle bleu clair */}
      {theme!=='dark'?(
        <>
<div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-blue-400 opacity-30 blur-2xl"></div>

{/* Cercle bleu moyen */}
<div className="absolute bottom-20 right-16 w-40 h-40 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>

{/* Cercle violet pour contraste */}
<div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-indigo-500 opacity-20 blur-xl"></div>

<div className="absolute bottom-40 left-28 w-40 h-40 rounded-full bg-white opacity-40 blur-3xl"></div>
   
   <div className="absolute bottom-5 right-2.5 w-60 h-60 rounded-full bg-blue-400 opacity-70 blur-2xl" ></div>
            {/* Cercles décoratifs */}
  <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-blue-400 opacity-30 blur-2xl"></div>
    <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-blue-300 opacity-30 blur-2xl"></div>   
    
    </>  
    ):(
  <>
    {/* Lune principale */}
    <FaMoon
      className="absolute top-10 left-10 text-gray-400 opacity-70"
      size={64} // taille en pixels
    />

    {/* Plusieurs étoiles */}
    <FaStar
      className="absolute top-1/4 left-2/3 text-gray-300 opacity-80"
      size={20}
    />
    <FaStar
      className="absolute top-1/3 left-3/4 text-gray-400 opacity-60"
      size={15}
    />
    <FaStar
      className="absolute top-2/3 left-1/2 text-gray-200 opacity-90"
      size={18}
    />
    <FaStar
      className="absolute top-3/4 left-1/5 text-gray-300 opacity-70"
      size={12}
    />

    {/* Deuxième lune */}
    <FaMoon
      className="absolute bottom-10 right-10 text-gray-500 opacity-60"
      size={80}
    />
      <FaMoon
      className="absolute top-40 right-30 text-gray-500 opacity-60"
      size={80}
    />
  </>
)}
 
   </div>
  );
}














