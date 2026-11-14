"use client";

import { useEffect, useState } from "react";

export function useDominantColor(imgUrl: string, fallbackColor: string) {
  const [accentColor, setAccentColor] = useState(fallbackColor);

  useEffect(() => {
    if (!imgUrl) return;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imgUrl;

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) return;

        canvas.width = 1;
        canvas.height = 1;

        context.drawImage(img, 0, 0, 1, 1);
        const [r, g, b] = context.getImageData(0, 0, 1, 1).data;

        const hex =
          "#" +
          [r, g, b]
            .map((x) => {
              const hexCode = x.toString(16);
              return hexCode.length === 1 ? "0" + hexCode : hexCode;
            })
            .join("");

        setAccentColor(hex);
      } catch (e) {
        console.warn(e);
      }
    };
  }, [imgUrl]);

  return accentColor;
}