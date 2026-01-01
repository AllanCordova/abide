/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // O hostname deve ser EXATAMENTE o que apareceu no erro
        hostname: "sixscyvxlclhcidajqrk.supabase.co",
        port: "",
        // CORREÇÃO AQUI:
        // Use apenas o caminho relativo com "**" no final para aceitar qualquer arquivo/pasta
        pathname: "/storage/v1/object/**",
      },
      {
        protocol: "https",
        hostname: "ibb.co",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
    ],
  },
};

export default nextConfig;
