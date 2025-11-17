"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useGetRoomQuery } from "@/entities/room";
import {
  useGetRoomLayoutItemQuery,
  useCreateRoomLayoutItemMutation,
  useUpdateRoomLayoutItemMutation,
} from "@/entities/roomLayoutItem";
import { TableStatus, useCreateTableMutation } from "@/entities/table";
import { Item, ItemType } from "../types/types";
import { useKeyboardControls } from "./useKeyboardControls";

export const GRID = 20;
export function useRoomBuilder() {
  const params = useParams() as { roomId?: string };
  const roomId = Number(params?.roomId);
  if (!roomId) throw new Error("Неверный ID комнаты");

  const { data: room } = useGetRoomQuery(roomId);
  const { data: persistedLayouts } = useGetRoomLayoutItemQuery(roomId);

  const [createTable] = useCreateTableMutation();
  const [createLayoutItem] = useCreateRoomLayoutItemMutation();
  const [updateLayoutItem] = useUpdateRoomLayoutItemMutation();

  const [items, setItems] = useState<Item[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [layoutId, setLayoutId] = useState<number | null>(null);
  const [snapToGrid, setSnapToGrid] = useState(true);

  const stageRef = useRef<any>(null);
  const layerRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  const snap = useCallback((value: number) => (snapToGrid ? Math.round(value / GRID) * GRID : value), [snapToGrid]);

  useEffect(() => {
    if (!persistedLayouts?.items) return;
    const mapped: Item[] = persistedLayouts.items.map((p, idx) => ({
      id: `db-${idx}`,
      layoutId: persistedLayouts.id,
      tableId: p.table_id ?? null,
      type: p.type as ItemType,
      x: p.x,
      y: p.y,
      width: p.width,
      height: p.height,
      rotation: p.rotation ?? 0,
      fill: p.type === "wall" ? "#444" : p.type === "table" ? "#d9b38c" : "#7aa6ff",
      name: p.type === "table" ? `Стол #${p.table_id ?? idx}` : undefined,
      svg: undefined,
    }));
    setItems(mapped);
    setLayoutId(persistedLayouts.id);
  }, [persistedLayouts]);

  useEffect(() => {
    if (!trRef.current || !layerRef.current) return;
    const node = selectedId ? layerRef.current.findOne(`#${selectedId}`) : null;
    trRef.current.nodes(node ? [node] : []);
    trRef.current.getLayer().batchDraw();
  }, [selectedId, items]);

  const updateItem = useCallback(
    (id: string, newProps: Partial<Item>) => {
      setItems(prev => prev.map(it => (it.id === id ? { ...it, ...newProps } : it)));
    },
    []
  );

  const addItem = useCallback((type: ItemType, defaults: Partial<Item>, createTableOnServer = false) => {
    const id = uuidv4();
    const item: Item = { id, layoutId, tableId: null, type, x: 50, y: 50, width: 100, height: 50, rotation: 0, ...defaults };
    setItems(p => [...p, item]);
    setSelectedId(id);

    if (type === "table" && createTableOnServer) {
      createTable({ room_id: roomId, name: `Стол`, seats: 4, sofas: 0, has_console: false, has_tv: false, status: TableStatus.FREE })
        .unwrap()
        .then(table => setItems(prev => prev.map(it => it.id === id ? { ...it, tableId: table.id, name: `Стол #${table.id}` } : it)))
        .catch(err => setItems(prev => prev.filter(it => it.id !== id)));
    }
  }, [createTable, layoutId, roomId]);

  const handleSaveLayout = useCallback(async () => {
    if (!items.length) return;
    const payload = {
      room_id: roomId,
      items: items.map(i => ({
        type: i.type,
        table_id: i.tableId ?? undefined,
        x: i.x,
        y: i.y,
        width: i.width,
        height: i.height,
        rotation: i.rotation,
      })),
    };

    try {
      if (layoutId) {
        await updateLayoutItem({ id: layoutId, data: payload }).unwrap();
        alert("Комната обновлена");
      } else {
        const created = await createLayoutItem(payload).unwrap();
        setItems(prev => prev.map((it, idx) => ({ ...it, id: `db-${idx}`, layoutId: created.id })));
        setLayoutId(created.id);
        alert("Комната создана");
      }
    } catch (err) {
      console.error(err);
    }
  }, [items, layoutId, roomId, createLayoutItem, updateLayoutItem]);

  useKeyboardControls({ items, selectedId, setItems, setSelectedId, step: 10 });

  return {
    room,
    items,
    selectedId,
    setSelectedId,
    stageRef,
    layerRef,
    trRef,
    snap,
    addItem,
    updateItem,
    handleSaveLayout,
    snapToGrid,
    setSnapToGrid,
  };
}
