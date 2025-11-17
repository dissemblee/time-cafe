export type ItemType = "wall" | "table" | "sofa";

export type Item = {
  id: string;
  layoutId?: number | null;
  tableId?: number | null;
  type: ItemType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  fill?: string;
  name?: string;
  svg?: string;
};

export interface KeyboardActions {
  items: Item[];
  selectedId: string | null;
  setItems: (items: Item[]) => void;
  setSelectedId: (id: string | null) => void;
  updateItemOnServer?: (items: Item[]) => void;
  step?: number;
}