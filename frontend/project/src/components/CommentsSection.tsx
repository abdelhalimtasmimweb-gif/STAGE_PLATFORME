"use client";

import React, { useState } from "react";
import { Send, User } from "lucide-react";

interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
}

interface CommentsSectionProps {
  initialComments?: Comment[];
  onNewComment?: (newComment: Comment) => void;
}

export default function CommentsSection({
  initialComments = [],
  onNewComment,
}: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const comment: Comment = {
      id: Date.now(),
      author: "Étudiant", // Tu peux changer dynamiquement selon le user connecté
      content: newComment,
      createdAt: new Date().toLocaleString(),
    };

    // Ajoute localement
    setComments([comment, ...comments]);
    setNewComment("");

    // Remonte au parent si besoin
    if (onNewComment) onNewComment(comment);
  };

  return (
    <div className="mt-10 w-full max-w-3xl">
      <h2 className="text-xl font-semibold mb-3">Commentaires</h2>

      {/* Champ d'ajout */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Écris ton commentaire..."
          className="flex-1 p-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 transition"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {/* Liste des commentaires */}
      <div className="space-y-3">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm">Aucun commentaire pour le moment.</p>
        ) : (
          comments.map((c) => (
            <div
              key={c.id}
              className="border border-gray-200 dark:border-gray-600 rounded-xl p-3 flex gap-3 bg-gray-50 dark:bg-gray-800"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-white rounded-full flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800 dark:text-gray-100">
                  {c.author}
                </span>
                <p className="text-gray-700 dark:text-gray-200">{c.content}</p>
                <span className="text-xs text-gray-500 mt-1">{c.createdAt}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
