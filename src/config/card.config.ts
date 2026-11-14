export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: string;
  highlight?: boolean;
}

export interface ProjectItem {
  title: string;
  description: string;
  url: string;
}

export interface CardConfig {
  seo: {
    title: string;
    description: string;
    favicon: string;
    ogImage: string;
  };
  theme: {
    mode: "dark" | "light";
    defaultAccent: string;
  };
  profile: {
    name: string;
    role: string;
    company?: string;
    bio: string;
    avatarUrl: string;
    verified: boolean;
    location?: string;
  };
  contact: {
    phone: string;
    email: string;
    saveButtonText: string;
  };
  widgets: {
    spotifyUrl: string;
  };
  links: SocialLink[];
  projects: ProjectItem[];
  footer: {
    showBranding: boolean;
    text: string;
  };
}

let parsedLinks: SocialLink[] = [];
try {
  parsedLinks = JSON.parse(process.env.NEXT_PUBLIC_CARD_LINKS || "[]");
} catch {
  parsedLinks = [];
}

let parsedProjects: ProjectItem[] = [];
try {
  parsedProjects = JSON.parse(process.env.NEXT_PUBLIC_CARD_PROJECTS || "[]");
} catch {
  parsedProjects = [];
}

const avatarSource = process.env.NEXT_PUBLIC_CARD_AVATAR_SOURCE || "github";
const customAvatarUrl = process.env.NEXT_PUBLIC_CARD_CUSTOM_AVATAR || "";
const targetLink = parsedLinks.find(
  (l) => l.icon.toLowerCase() === avatarSource.toLowerCase() || l.id.toLowerCase() === avatarSource.toLowerCase()
);

let rawAvatar = "https://github.com/octocat.png";

if (avatarSource === "github" && targetLink && targetLink.url) {
  const match = targetLink.url.match(/github\.com\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    rawAvatar = `https://github.com/${match[1]}.png`;
  }
} else if (customAvatarUrl) {
  rawAvatar = customAvatarUrl;
}

const autoAvatar = `https://images.weserv.nl/?url=${encodeURIComponent(rawAvatar)}&w=200&h=200&fit=cover`;

export const cardConfig: CardConfig = {
  seo: {
    title: process.env.NEXT_PUBLIC_CARD_PAGE_TITLE || `${process.env.NEXT_PUBLIC_CARD_NAME || "Seu Nome"} | dCard`,
    description: process.env.NEXT_PUBLIC_CARD_BIO || "Cartão de visita digital",
    favicon: process.env.NEXT_PUBLIC_CARD_FAVICON || autoAvatar,
    ogImage: process.env.NEXT_PUBLIC_CARD_OG_IMAGE || autoAvatar,
  },
  theme: {
    mode: (process.env.NEXT_PUBLIC_CARD_THEME as "dark" | "light") || "dark",
    defaultAccent: "#6366f1",
  },
  profile: {
    name: process.env.NEXT_PUBLIC_CARD_NAME || "Seu Nome",
    role: process.env.NEXT_PUBLIC_CARD_ROLE || "Cargo / Profissão",
    company: process.env.NEXT_PUBLIC_CARD_COMPANY || "",
    bio: process.env.NEXT_PUBLIC_CARD_BIO || "Sua biografia profissional aqui.",
    avatarUrl: autoAvatar,
    verified: true,
    location: process.env.NEXT_PUBLIC_CARD_LOCATION || "Localização",
  },
  contact: {
    phone: process.env.NEXT_PUBLIC_CARD_PHONE || "+55 11 99999-9999",
    email: process.env.NEXT_PUBLIC_CARD_EMAIL || "contato@email.com",
    saveButtonText: "Salvar Contato",
  },
  widgets: {
    spotifyUrl: process.env.NEXT_PUBLIC_CARD_SPOTIFY_URL || "",
  },
  links: parsedLinks,
  projects: parsedProjects,
  footer: {
    showBranding: true,
    text: "Powered by dCard",
  },
};