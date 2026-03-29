declare module "*&as=picture" {
  interface Picture {
    sources: Record<string, string>;
    img: { src: string; w: number; h: number };
  }

  const picture: Picture;
  export default picture;
}

declare module "*&as=srcset" {
  const srcset: string;
  export default srcset;
}
