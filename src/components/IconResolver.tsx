import {
  GitBranch,
  Camera,
  Share2,
  Video,
  MessageCircle,
  Globe,
  Mail,
  AtSign,
} from "lucide-react";

interface IconResolverProps {
  name: string;
  className?: string;
}

export function IconResolver({ name, className = "w-5 h-5" }: IconResolverProps) {
  const normalized = name.toLowerCase().trim();

  switch (normalized) {
    case "github":
      return <GitBranch className={className} />;
    case "instagram":
      return <Camera className={className} />;
    case "linkedin":
    case "facebook":
      return <Share2 className={className} />;
    case "whatsapp":
      return <MessageCircle className={className} />;
    case "youtube":
      return <Video className={className} />;
    case "mail":
      return <Mail className={className} />;
    case "twitter":
    case "x":
      return <AtSign className={className} />;
    case "globe":
    default:
      return <Globe className={className} />;
  }
}