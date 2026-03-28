import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SpotifyAlbum, SpotifyTrack } from "./spotify-embed";

const meta: Meta = {
  title: "Blog/Spotify Embed",
};

export const Album: StoryObj = {
  render: () => (
    <SpotifyAlbum src="https://open.spotify.com/embed/album/6CqzADeQHeLKbtBkfUTMqx?utm_source=generator" />
  ),
};

export const Track: StoryObj = {
  render: () => (
    <SpotifyTrack src="https://open.spotify.com/embed/track/0gplL1WMoJ6iYaPgMCL0gX?utm_source=generator" />
  ),
};

export const TrackCompact: StoryObj = {
  render: () => (
    <SpotifyTrack
      src="https://open.spotify.com/embed/track/0gplL1WMoJ6iYaPgMCL0gX?utm_source=generator"
      compact
    />
  ),
};

export default meta;
