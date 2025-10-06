// app/dashboard/me/_components/url.jsx
"use client"

import { Button } from "@/components/ui/button";
import { createUsername } from "../_actions/create-username";
import { useState } from "react";
import { Link2 } from "lucide-react";
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { CardProfile } from "@/app/dashboard/me/_components/card-profile";


interface UrlPreviewPros{
  username: string | null;
  user: {
      id: string;
      name: string;
      username: string | null;
      bio: string | null;
      image: string | null;
  };
}

export function UrlPreview({username: initialUsername, user}: UrlPreviewPros){

  const [error, setError] = useState<null | string>(null)
  // Usado para exibir mensagens de sucesso (Username OU Bio)
  const [successMessage, setSuccessMessage] = useState<null | string>(null); 
  const [username, setUsername] = useState(initialUsername)
  const router = useRouter(); 

  async function submitAction(formData: FormData) {
    const inputUsername = formData.get("username") as string

    if(!inputUsername.trim()){
      setError("O username não pode ser vazio.");
      return;
    }
    
    setError(null);
    setSuccessMessage(null);

    const response = await createUsername({username: inputUsername})

    if(response.error){
      setError(response.error)
      return;
    }

    if(response.data){
      setUsername(response.data) 
      setSuccessMessage("Username salvo com sucesso! Sua URL está pronta.");
      router.refresh(); 
    }
  }
  
  return(
    <div className="w-full space-y-6">
        
        {/* MENSAGEM DE SUCESSO (Aparece no topo após salvar username ou bio) */}
        {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md">
                <p className="font-semibold">{successMessage}</p>
            </div>
        )}

        {/* 1. SEÇÃO DE CIMA: LINK DE PREVIEW OU FORMULÁRIO DE CRIAÇÃO */}
        {username ? (
            // A. Link de Preview
            <div className="flex items-center justify-between flex-1 p-2 text-gray-100 bg-zinc-900 rounded-md">   
                <div className="flex flex-col md:flex-row justify-center md:items-center items-start gap-2" >
                    <h3 className="font-bold text-lg">Sua URL:</h3>
                    <Link 
                        href={`${process.env.NEXT_PUBLIC_HOST_URL}/creator/${username}`}
                        target="_blank"
                        className="text-blue-400 hover:underline"
                    >
                        {`${process.env.NEXT_PUBLIC_HOST_URL}/creator/${username}`}
                    </Link>
                </div>
                <Link
                    href= {`${process.env.NEXT_PUBLIC_HOST_URL}/creator/${username}`}
                    target="_blank"
                    className="bg-blue-500 text-white px-4 py-1 rounded-md hidden md:block" 
                >
                    <Link2 className="w-5 h-5 text-white" />
                </Link>
            </div>
        ) : (
            // B. Formulário de Criação de Username (se o username for null)
            <div className="w-full">
                <div className="flex items-center justify-between p-2 text-gray-100 bg-zinc-900 rounded-md">
                    <form
                    className="flex flex-1 flex-col md:flex-row justify-center md:items-center items-start gap-2"
                    action={submitAction}
                    >
                    {error && <p className="text-red-500 w-full md:w-fit">{error}</p>}
                    <div className="flex justify-center w-full items-center">
                        <p>
                        {process.env.NEXT_PUBLIC_HOST_URL}/creator/
                        </p>
                        <input type="text"
                        className="flex-1 outline-none border bg-gray-50 h-9 border-gray-300 text-black"
                        placeholder="Digite seu username...."
                        name="username"
                        />
                    </div>
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-600 h-9 w-full md:w-fit text-white rounded-md cursor-pointer">Salvar</Button>
                    </form>
                </div>
            </div> 
        )}

        {/* 2. SEÇÃO DE BAIXO: CARD PROFILE COM O TEXTAREA (Sempre aparece) */}
        <div className="w-full">
            <h1 className="text-xl font-bold mb-3 text-gray-100">Configurações de Perfil</h1>
            {/* Passamos o user e a função de sucesso para o CardProfile */}
            <CardProfile 
                user={user} 
                setSuccessMessage={setSuccessMessage} 
            /> 
        </div>

    </div>
    );
}