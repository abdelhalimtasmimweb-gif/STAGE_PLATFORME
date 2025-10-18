"use client"; // pour Next.js App Router (client-side)

import { useState } from "react";

export default function UploadProfileImage(endpoint:string) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Sélection de fichier
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Upload vers le backend
  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    
    try {
      const response = await fetch(endpoint, { // endpoint NestJS
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setImageUrl(data.imageUrl); // URL sur Cloudinary
      setPreview(null);
      setFile(null);
    } catch (error) {
      console.error("Erreur upload:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
   
    <div className="flex flex-col items-center gap-4">
      {preview && <img src={preview} alt="preview" className="w-32 h-32 object-cover rounded-full" />}
      {imageUrl && <img src={imageUrl} alt="uploaded" className="w-32 h-32 object-cover rounded-full border" />}
      
      <input type="file" accept="image/*" onChange={handleFileChange} />
      
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
   
);
}

