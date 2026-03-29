import React from "react";

interface SpotifyAlbumProps {
  src: string;
}

export const SpotifyAlbum: React.FC<SpotifyAlbumProps> = ({ src }) => (
  <iframe
    style={{ borderRadius: "12px", margin: "1rem 0", border: 0 }}
    src={src}
    width="100%"
    height="352"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
    title="Spotify Album"
  />
);

interface SpotifyTrackProps {
  src: string;
  compact?: boolean;
}

export const SpotifyTrack: React.FC<SpotifyTrackProps> = ({
  src,
  compact = false,
}) => (
  <iframe
    style={{ borderRadius: "12px", margin: "1rem 0", border: 0 }}
    src={src}
    width="100%"
    height={compact ? 152 : 352}
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
    title="Spotify Track"
  />
);
