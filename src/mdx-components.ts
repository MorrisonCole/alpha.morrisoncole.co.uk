import { Button } from "./components/button/button";
import { SpotifyAlbum, SpotifyTrack } from "./components/blog/spotify-embed";
import { ReadingList } from "./components/blog/reading-list";
import { ResponsiveImage } from "./components/responsive-image";
import type { MDXComponents } from "mdx/types";
import {
  MdxImage,
  MdxH1,
  MdxH2,
  MdxH3,
  MdxH4,
  MdxBlockquote,
  MdxLink,
  MdxPre,
  MdxCode,
} from "./mdx-elements";

export const mdxComponents: MDXComponents = {
  Button: Button,
  SpotifyAlbum: SpotifyAlbum,
  SpotifyTrack: SpotifyTrack,
  ReadingList: ReadingList,
  ResponsiveImage: ResponsiveImage,
  img: MdxImage,
  h1: MdxH1,
  h2: MdxH2,
  h3: MdxH3,
  h4: MdxH4,
  blockquote: MdxBlockquote,
  a: MdxLink,
  pre: MdxPre,
  code: MdxCode,
};
