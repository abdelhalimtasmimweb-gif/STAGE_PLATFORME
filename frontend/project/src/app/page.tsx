"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function IndexPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("ended", () => {
        router.push("/Home"); // Redirection vers la page Home
      });
    }

    return () => {
      if (video) {
        video.removeEventListener("ended", () => {
          router.push("/home");
        });
      }
    };
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      {/* Vidéo logo */}
      <video
        ref={videoRef}
        src="Cream Black Elegant Simple Personal Name Logo (1).mp4" // Mets ton fichier logo.mp4 dans public/
        autoPlay
        muted
        className="w-lg h-lg object-contain"
      />
    </div>
  );
}
