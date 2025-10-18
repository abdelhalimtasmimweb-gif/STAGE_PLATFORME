"use client";
import React, { useState } from "react";
import { MessageCircle, Send } from "lucide-react"; // icons
import { SiReact } from "react-icons/si";
import ThemeToggle from "./ui/ThemeToggle";

const ChatBot = () => {
  const [theme,setTheme]= useState(localStorage.getItem("theme"));
  
  const [background,setBackground]=useState<"#111827"|"#ffff">(theme==="light"?"#ffff":"#111827");
  const ThemeToggle=()=>{
     theme==="light"?setTheme("dark"):setTheme("light");
     theme==="light"?setBackground("#ffff"):setBackground("#111827");
     
  }
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Bonjour 👋, comment puis-je vous aider ?" },
  ]);
  const [input, setInput] = useState("");

  // Lorsqu'on envoie un message
  const handleSend = () => {
    if (!input.trim()) return;

    // Ajouter le message utilisateur
    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Simuler une réponse automatique (ici tu pourras remplacer par ton API)
    setTimeout(() => {
      const botReply = {
        from: "bot",
        text: "Merci pour votre question ! 😊 (Réponse simulée)",
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);
  };

  return (
    <div>
      {/* --- Bouton du chat flottant --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        <MessageCircle size={26} />
      </button>

      {/* --- Fenêtre du chat --- */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 shadow-xl rounded-2xl border border-gray-200 flex flex-col overflow-hidden max-h-96"
        style={{backgroundColor:"#ffff"}}>
          <div className="bg-[#10b981] text-white p-3 text-center font-semibold">
            Assistant de Stage 💼
          </div>

          {/* Zone des messages */}
          <div className="flex-1 p-3 space-y-2 overflow-y-auto h-64">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-2 rounded-xl max-w-[75%] text-sm ${
                    msg.from === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Champ d'envoi */}
          <div className="flex border-t border-gray-200">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrivez un message..."
              className="flex-1 p-2 text-sm outline-none pl-3"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="p-2 bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
