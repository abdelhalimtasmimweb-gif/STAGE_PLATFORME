import { Injectable } from '@nestjs/common';
import cloudinary from './configuration/cloudinary.config';


@Injectable()
export class UploadService {
  /**
   * 📤 Upload d’un fichier vers Cloudinary
   * @param filePath chemin local du fichier (image/pdf)
   * @returns infos du fichier stocké
   */
  async uploadPrivateFile(filePath: string) {
    return await cloudinary.uploader.upload(filePath, {
      folder: 'private_files',       // dossier de stockage dans ton Cloudinary
      resource_type: 'auto',         // auto = détecte image, pdf, vidéo...
      type: 'authenticated',         // 👈 fichier privé
    });
  }
  

  /**
   * 🔑 Génère une URL signée pour accéder à un fichier privé
   * @param publicId identifiant du fichier (ex: "private_files/monfichier.png")
   * @returns une URL sécurisée et temporaire
   */
  async getPrivateUrl(publicId: string) {
    return cloudinary.url(publicId, {
      type: 'authenticated',   // doit correspondre au type de l’upload
      sign_url: true,          // 👈 génère une signature unique (API_SECRET utilisé en interne)
      secure: true,            // https
      transformation: [{ width: 500, crop: 'limit' }], // (optionnel) redimensionner, limiter taille...
    });
  }

  /**
   * ❌ Supprime un fichier du cloud
   * @param publicId identifiant du fichier
   */
  async deleteFile(publicId: string) {
    return await cloudinary.uploader.destroy(publicId, {
      type: 'authenticated',
      resource_type: 'auto',
    });
  }
}
