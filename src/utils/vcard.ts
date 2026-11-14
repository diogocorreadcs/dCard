import { CardConfig } from "@/config/card.config";

export function downloadVCard(config: CardConfig) {
  const { profile, contact } = config;

  const cleanPhone = contact.phone.replace(/[^\d+]/g, "");

  const vcardLines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${profile.name}`,
    profile.company ? `ORG:${profile.company}` : "",
    profile.role ? `TITLE:${profile.role}` : "",
    cleanPhone ? `TEL;TYPE=CELL,VOICE:${cleanPhone}` : "",
    contact.email ? `EMAIL;TYPE=PREF,INTERNET:${contact.email}` : "",
    profile.bio ? `NOTE:${profile.bio}` : "",
    "END:VCARD",
  ].filter(Boolean);

  const vcardContent = vcardLines.join("\r\n");
  const blob = new Blob([vcardContent], { type: "text/vcard;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    `${profile.name.toLowerCase().replace(/\s+/g, "-")}.vcf`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}