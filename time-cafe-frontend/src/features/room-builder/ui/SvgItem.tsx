import { Image as KonvaImage } from "react-konva";
import React, { useEffect, useRef, useState } from "react";
import { Item } from "../types/types";

type SvgItemProps = {
  item: Item;
  isSelected: boolean;
  commonProps: any;
};

export function SvgItem({ item, isSelected, commonProps }: SvgItemProps) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!item.svg) return;
    const svgBlob = new Blob([item.svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const img = new window.Image();
    img.onload = () => {
      setImage(img);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, [item.svg]);

  return (
    <KonvaImage
      {...commonProps}
      image={image || undefined}
      stroke={isSelected ? "#1976d2" : undefined}
      strokeWidth={isSelected ? 2 : 0}
    />
  );
}
