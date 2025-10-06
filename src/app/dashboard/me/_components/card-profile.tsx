// app/dashboard/me/_components/card-profile.jsx
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { updateBio } from "../_actions/update-bios"; 
import { useState } from "react";
import { useRouter } from "next/navigation";


interface CardProfileProps {
  user: {
    id: string;
    name: string;
    username: string | null;
    bio: string | null;
    image: string | null;
  };
 
  setSuccessMessage: (msg: string) => void; 
}

export function CardProfile({ user, setSuccessMessage }: CardProfileProps) {
  const router = useRouter();
  const [bioText, setBioText] = useState(user.bio || ''); 
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setIsPending(true);
    setError(null);
    
    const response = await updateBio({ bio: bioText });

    if (response.error) {
      setError(response.error);
    } else {
      // 1. CHAMA O SETTER NO PAI
      setSuccessMessage("Biografia atualizada com sucesso!"); 
      // 2. REFRESH PARA BUSCAR A BIO ATUALIZADA NO SERVIDOR
      router.refresh(); 
    }

    setIsPending(false);
  }

  const IMAGE_SIZE = 80;

  return (
    <section className="w-full flex flex-col items-center mx-auto px-4 py-6 bg-white border rounded-lg shadow-lg max-w-lg">
        
    
      <div className="flex items-center gap-4 w-full border-b pb-4 mb-4">
        {user.image && (
          <Image
            src={user.image}
            alt={`Foto de perfil de ${user.name}`}
            width={IMAGE_SIZE}
            height={IMAGE_SIZE}
            className="rounded-full object-cover"
          />
        )}
        <div>
          <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-600">@{user.username || '...'}</p>
        </div>
      </div>
      
      {/* FORMULÁRIO DE EDIÇÃO DE BIO */}
      <div className="w-full">
        <h3 className="text-lg font-semibold mb-2 text-gray-900">Sua Biografia</h3>
        
        <form action={handleSubmit} className="space-y-3">
            
          <textarea
            name="bio"
            placeholder="Escreva uma breve descrição sobre você..."
            value={bioText}
            onChange={(e) => setBioText(e.target.value)}
            rows={4}
            maxLength={255}
            className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-150"
          />

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500">
              {bioText.length} / 255 caracteres
            </p>
            <Button 
              type="submit" 
              disabled={isPending}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-md"
            >
              {isPending ? 'Salvando...' : 'Salvar Biografia'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}