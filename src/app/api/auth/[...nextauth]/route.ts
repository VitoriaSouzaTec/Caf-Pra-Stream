// app/api/auth/[...nextauth]/route.ts (ou .js)

// Importe os 'handlers' do seu arquivo de configuração NextAuth/Auth.js.
// Não importamos a função 'auth' (para pegar a sessão) aqui, mas sim 'handlers'.
import { handlers } from "@/lib/auth"; 

// O Next.js exige que os métodos GET e POST sejam exportados.
// Isso cria a rota para o callback, sign-in, sign-out e erro.
export const { GET, POST } = handlers;