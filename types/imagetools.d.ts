declare module "*&as=picture" {
  interface PictureSource {
    src: string;
    w: number;
  }

  interface Picture {
    sources: Record<string, PictureSource[]>;
    img: { src: string; w: number; h: number };
  }

  const picture: Picture;
  export default picture;
}

declare module "*&as=srcset" {
  const srcset: string;
  export default srcset;
}
