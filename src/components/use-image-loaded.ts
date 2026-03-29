import React from "react";

interface UseImageLoadedResult {
  imageRef: React.RefObject<HTMLImageElement | null>;
  isLoaded: boolean;
  handleLoad: React.ReactEventHandler<HTMLImageElement>;
  handleError: React.ReactEventHandler<HTMLImageElement>;
}

export const useImageLoaded = (src?: string): UseImageLoadedResult => {
  const imageRef = React.useRef<HTMLImageElement | null>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setIsLoaded(false);

    if (imageRef.current?.complete) {
      setIsLoaded(true);
    }
  }, [src]);

  const handleLoad: React.ReactEventHandler<HTMLImageElement> = () => {
    setIsLoaded(true);
  };

  const handleError: React.ReactEventHandler<HTMLImageElement> = () => {
    setIsLoaded(true);
  };

  return { imageRef, isLoaded, handleLoad, handleError };
};
