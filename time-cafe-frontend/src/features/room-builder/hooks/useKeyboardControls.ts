import { useEffect } from "react";
import { Item, KeyboardActions } from "../types/types";

export const useKeyboardControls = ({
  items,
  selectedId,
  setItems,
  setSelectedId,
  updateItemOnServer,
  step = 10
}: KeyboardActions) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!selectedId) return;

      const it = items.find(i => i.id === selectedId);
      if (!it) return;

      let newItems: Item[] = [...items];

      switch (e.key) {
        case "Delete":
        case "Backspace":
          newItems = items.filter(i => i.id !== selectedId);
          setSelectedId(null);
          break;

        case "r":
        case "К":
        case "к":
        case "R":
          newItems = items.map(i => i.id === selectedId ? { ...i, rotation: (i.rotation + 15) % 360 } : i);
          break;

        case "ArrowUp":
          newItems = items.map(i => i.id === selectedId ? { ...i, y: i.y - step } : i);
          break;
        case "ArrowDown":
          newItems = items.map(i => i.id === selectedId ? { ...i, y: i.y + step } : i);
          break;
        case "ArrowLeft":
          newItems = items.map(i => i.id === selectedId ? { ...i, x: i.x - step } : i);
          break;
        case "ArrowRight":
          newItems = items.map(i => i.id === selectedId ? { ...i, x: i.x + step } : i);
          break;

        default:
          return;
      }

      setItems(newItems);
      if (updateItemOnServer) updateItemOnServer(newItems);
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [items, selectedId, setItems, setSelectedId, updateItemOnServer, step]);
};
