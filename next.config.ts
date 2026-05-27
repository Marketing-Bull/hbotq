import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "hbotq.com" },
      { protocol: "https", hostname: "www.hbotq.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/home/", destination: "/", permanent: true },
      { source: "/faq", destination: "/faqs/", permanent: true },
      { source: "/faq/", destination: "/faqs/", permanent: true },
      { source: "/contact", destination: "/contact-us/", permanent: true },
      { source: "/contact/", destination: "/contact-us/", permanent: true },
      { source: "/physician", destination: "/physicians/", permanent: true },
      { source: "/physician/", destination: "/physicians/", permanent: true },
      { source: "/treatments", destination: "/treatment/", permanent: true },
      { source: "/treatments/", destination: "/treatment/", permanent: true },
      {
        source: "/conditions/chronic-pain/",
        destination: "/condition/chronic-pain/",
        permanent: true,
      },
      {
        source: "/conditions/diabetic-lower-extremity-wounds/",
        destination: "/condition/diabetic-lower-extremity-wounds/",
        permanent: true,
      },
      {
        source: "/conditions/non-healing-wounds/",
        destination: "/condition/non-healing-wounds/",
        permanent: true,
      },
      {
        source: "/conditions/post-covid/",
        destination: "/condition/post-covid/",
        permanent: true,
      },
      {
        source: "/conditions/radiation-tissue-damage/",
        destination: "/condition/radiation-tissue-damage/",
        permanent: true,
      },
      {
        source: "/conditions/sudden-hearing-loss/",
        destination: "/condition/sudden-hearing-loss/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
