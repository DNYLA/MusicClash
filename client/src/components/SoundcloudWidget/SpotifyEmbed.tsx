import React from 'react';

interface SpotifyEmbedProps {
  trackId: string;
}

export default function SpotifyEmbed({ trackId }: SpotifyEmbedProps) {
  return (
    <iframe
      style={{ borderRadius: '12px' }}
      src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
      width="100%"
      height="80"
      frameBorder="0"
      // allowfullscreen=""
      allow="autoplay; encrypted-media;"
    ></iframe>
  );
}
