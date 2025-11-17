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
    if (!item.svg) {
      const canvas = document.createElement('canvas');
      canvas.width = item.width || 100;
      canvas.height = item.height || 100;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = item.fill || '#ccc';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (isSelected) {
          ctx.strokeStyle = '#1976d2';
          ctx.lineWidth = 2;
          ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
        }
      }
      const img = new window.Image();
      img.onload = () => setImage(img);
      img.src = canvas.toDataURL();
      return;
    }

    const svgBlob = new Blob([item.svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const img = new window.Image();
    img.onload = () => {
      setImage(img);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, [item.svg, item.fill, item.width, item.height, isSelected]);

  return (
    <KonvaImage
      {...commonProps}
      image={image || undefined}
      stroke={isSelected ? "#1976d2" : undefined}
      strokeWidth={isSelected ? 2 : 0}
    />
  );
}