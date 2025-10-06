// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // As configurações do seu projeto ficam aqui
  images: {
    // Estas configurações permitem que o Next.js confie nos hosts de imagem
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Permite fotos do Google
        // Adicionar pathname genérico é bom para segurança e flexibilidade
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', // Permite fotos do GitHub (bom se você testar a troca)
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;