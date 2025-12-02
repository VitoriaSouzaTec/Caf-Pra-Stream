import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma"; // Importa sua instância de prisma
import { FormDonate } from "./_componets/form";

// Função para buscar o usuário no banco de dados
async function getUserByUsername(username: string) {
  if (!username) return null;
  
  // Buscar os campos fornecidos pelo Google
  const user = await prisma.user.findUnique({
    where: { username: username },
    select: {
      id: true, // Adiciona o campo 'id'
      name: true,
      image: true,
      bio: true, // Se você tiver o campo 'bio' no seu modelo User
    }
  });
  return user;
}


export default async function Apoia({
  params,
}: {
  params: { username: string }
}) {
  const { username } = params;

  // 1. BUSCAR OS DADOS DO USUÁRIO
  const profileUser = await getUserByUsername(username);

  if (!profileUser) {
    // Redireciona para 404 se o usuário não for encontrado
    notFound(); 
  }
  
  // 2. EXTRAIR AS VARIÁVEIS (Foto e Nome do Google)
  const profileImage = profileUser.image || '/default-avatar.png'; 
  const displayName = profileUser.name || `@${username}`;
  // A bio será null se não existir, então definimos um fallback
  const userBio = profileUser.bio || 'O desenvolvedor ainda não adicionou uma descrição.';


  return (
    <div className=" min-h-[calc(100vh-64px)]">
      {/* --- Seção do Banner --- */}
      <div className="w-full h-64 relative bg-black">
        <Image
          src={profileImage} // Puxa a foto do Google para o banner
          alt={`Banner de ${displayName}`}
          fill
          className="object-cover opacity-50"
          priority
          quality={100}
        />
      </div>

      {/* --- Seção de Perfil e Informações --- */}
      <section className="flex flex-col w-full items-center justify-center mx-auto max-w-7xl p-4 relative">
        <div className="flex flex-col items-center">
          <Image
            // Puxa a foto do Google para o avatar
            src={profileImage} 
            className="w-36 h-36 rounded-xl bg-gray-50 hover:shadow-lg duration-300 select-none text-zinc-900 text-3xl flex items-center justify-center object-cover absolute -top-16 border-4 border-white"
            alt={displayName}
            width={144} 
            height={144}
            quality={100}
          />
          <h1 className=" font-bold text-xl md:text-2xl mt-20 mb-4">
            {/* Puxa o nome do Google */}
            {displayName}
          </h1>
        </div>
      </section>

      {/* --- Seção de Bio e Apoio --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full mx-auto gap-4 max-w-5xl">
        <section className="hidden md:flex flex-col bg-gray-50 p-5 rounded-md h-fit mx-2">
          <p className="font-semibold text-lg">
            Sobre {displayName}
          </p>
          <p className="text-gray-500 mt-2">
            {userBio}
          </p>
        </section>

        <section
          className="bg-gray-50 rounded-md p-5 h-fit mx-2"
        >
          <h3 className="font-semibold text-lg">
            {profileUser.name ? `Apoiar ${profileUser.name}` : "Apoiar Criador"}
          </h3>
          <FormDonate slug={username} creatorId={profileUser.id} />
        </section>
      </div>
    </div>
  )
}