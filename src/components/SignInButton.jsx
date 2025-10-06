// components/SignInButton.jsx

"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function SignInButton() {
  
  // A função é síncrona
  const handleLogin = () => { 
    // Chamada síncrona. O navegador fará o redirecionamento.
    signIn("google", { callbackUrl: "/dashboard" });
    // Opcional: Adicione um return aqui para ser explícito.
  };

  return (
    <Button
      onClick={handleLogin} // Chama a função síncrona
      size="lg"
      type="button" 
      className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-8 h-12"
    >
      Começar agora
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  );
}