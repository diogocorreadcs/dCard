"use client";

interface SpotifyEmbedProps {
  url: string;
  isDark: boolean;
}

export function SpotifyEmbed({ url, isDark }: SpotifyEmbedProps) {
  if (!url) return null;

  const match = url.match(/(track|album|playlist|episode|show)\/([a-zA-Z0-9]+)/);
  if (!match) return null;

  const embedUrl = `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator&theme=${isDark ? "0" : "1"}`;

  return (
    <div className="w-full mt-4 overflow-hidden rounded-2xl">
      <iframe
        src={embedUrl}
        width="100%"
        height="80"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-2xl"
      />
    </div>
  );
}