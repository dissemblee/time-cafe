"use client";
import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Group, Text, Transformer } from "react-konva";
import { v4 as uuidv4 } from "uuid";
import { SvgItem } from "./SvgItem";
import { useParams } from "next/navigation";

import { useGetRoomQuery } from "@/entities/room";
import {
  useGetRoomLayoutItemQuery,
  useCreateRoomLayoutItemMutation,
  useUpdateRoomLayoutItemMutation,
} from "@/entities/roomLayoutItem";
import { TableStatus, useCreateTableMutation } from "@/entities/table";

type ItemType = "wall" | "table" | "sofa";

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

const GRID = 20;

export default function RoomBuilder() {
  const params = useParams() as { id?: string };
  const roomId = Number(params?.id);

  if (!roomId) return <div>Invalid room id</div>;

  const { data: room } = useGetRoomQuery(roomId);
  const { data: persistedLayouts, isLoading: layoutLoading } = useGetRoomLayoutItemQuery(roomId);

  const [createTable] = useCreateTableMutation();
  const [createLayoutItem] = useCreateRoomLayoutItemMutation();
  const [updateLayoutItem] = useUpdateRoomLayoutItemMutation();

  const [items, setItems] = useState<Item[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [snapToGrid, setSnapToGrid] = useState(true);

  const stageRef = useRef<any>(null);
  const layerRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (!persistedLayouts || !persistedLayouts.items) return;

    const layout = persistedLayouts;

    const mapped: Item[] = layout.items.map((p, idx) => ({
      id: `db-${idx}`,
      layoutId: layout.id,
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
  }, [persistedLayouts]);

  useEffect(() => {
    if (!trRef.current || !layerRef.current) return;

    if (selectedId) {
      const node = layerRef.current.findOne(`#${selectedId}`);
      trRef.current.nodes(node ? [node] : []);
      trRef.current.getLayer().batchDraw();
    } else {
      trRef.current.nodes([]);
      trRef.current.getLayer().batchDraw();
    }
  }, [selectedId, items]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        const it = items.find((i) => i.id === selectedId);
        if (!it) return;

        if (it.layoutId) {
          const newItems = items.filter((i) => i.id !== selectedId).map((i) => ({
            type: i.type,
            table_id: i.tableId ?? undefined,
            x: i.x,
            y: i.y,
            width: i.width,
            height: i.height,
            rotation: i.rotation,
          }));
          updateLayoutItem({ id: it.layoutId, data: { items: newItems } }).catch(console.error);
        }

        setItems((prev) => prev.filter((x) => x.id !== selectedId));
        setSelectedId(null);
      }

      if ((e.key === "r" || e.key === "R") && selectedId) {
        setItems((prev) =>
          prev.map((it) => (it.id === selectedId ? { ...it, rotation: (it.rotation + 15) % 360 } : it))
        );

        const it = items.find((i) => i.id === selectedId);
        if (it?.layoutId) {
          const updatedItems = items.map((i) =>
            i.id === selectedId ? { ...i, rotation: (it.rotation + 15) % 360 } : i
          ).map((i) => ({
            type: i.type,
            table_id: i.tableId ?? undefined,
            x: i.x,
            y: i.y,
            width: i.width,
            height: i.height,
            rotation: i.rotation,
          }));
          updateLayoutItem({ id: it.layoutId, data: { items: updatedItems } }).catch(console.error);
        }
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId, items, updateLayoutItem]);

  const snap = (value: number) => (snapToGrid ? Math.round(value / GRID) * GRID : value);

  const onStageMouseDown = (e: any) => {
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
      return;
    }
    const id = e.target.attrs.id;
    if (id) setSelectedId(id);
  };

  const updateItem = (id: string, newProps: Partial<Item>, persistOnServer = false) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...newProps } : it)));

    if (persistOnServer) {
      const layoutId = items.find((i) => i.id === id)?.layoutId;
      if (!layoutId) return;

      const updatedItems = items.map((i) =>
        i.id === id ? { ...i, ...newProps } : i
      ).map((i) => ({
        type: i.type,
        table_id: i.tableId ?? undefined,
        x: i.x,
        y: i.y,
        width: i.width,
        height: i.height,
        rotation: i.rotation,
      }));

      updateLayoutItem({ id: layoutId, data: { items: updatedItems } }).catch(console.error);
    }
  };

  const addWall = () => {
    const id = uuidv4();
    const item: Item = { id, layoutId: null, tableId: null, type: "wall", x: 50, y: 50, width: 240, height: 8, rotation: 0, fill: "#444", name: "Wall" };
    setItems((p) => [...p, item]);
    setSelectedId(id);
  };

  const addSofa = () => {
    const id = uuidv4();
    const item: Item = { id, layoutId: null, tableId: null, type: "sofa", x: 300, y: 150, width: 160, height: 80, rotation: 0, fill: "#7aa6ff", name: "Sofa", svg: `<svg viewBox="-2.4 -2.4 28.80 28.80"...>...</svg>` };
    setItems((p) => [...p, item]);
    setSelectedId(id);
  };

  const addTable = async () => {
    const id = uuidv4();
    const tempItem: Item = { id, layoutId: null, tableId: null, type: "table", x: 150, y: 150, width: 120, height: 70, rotation: 0, fill: "#d9b38c", name: "Table" };
    setItems((p) => [...p, tempItem]);
    setSelectedId(id);

    try {
      const table = await createTable({ room_id: roomId, name: `Стол`, seats: 4, sofas: 0, has_console: false, has_tv: false, status: TableStatus.FREE }).unwrap?.();
      setItems((prev) => prev.map((it) => (it.id === id ? { ...it, tableId: table.id, name: `Стол #${table.id}` } : it)));
    } catch (err) {
      console.error("createTable error", err);
      setItems((prev) => prev.filter((it) => it.id !== id));
    }
  };

  const handleSaveLayout = async () => {
    if (items.length === 0) return;

    try {
      const payload = { room_id: roomId, items: items.map((it) => ({ type: it.type, table_id: it.tableId ?? undefined, x: it.x, y: it.y, width: it.width, height: it.height, rotation: it.rotation })) };
      const created = await createLayoutItem(payload).unwrap();

      setItems((prev) =>
        prev.map((it, idx) => ({ ...it, id: `db-${idx}`, layoutId: created.id }))
      );

      alert("Сохранение завершено");
    } catch (err) {
      console.error("createLayoutItem error", err);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Inter, Arial" }}>
      <div style={{ width: 300, padding: 12, borderRight: "1px solid #ddd", boxSizing: "border-box" }}>
        <h3 style={{ marginTop: 0 }}>Room builder — {room?.name ?? `#${roomId}`}</h3>

        <div style={{ marginBottom: 8 }}>
          <button onClick={addWall} style={{ width: "100%", marginBottom: 6 }}>Добавить стену</button>
          <button onClick={addTable} style={{ width: "100%", marginBottom: 6 }}>Добавить стол (создаст Table)</button>
          <button onClick={addSofa} style={{ width: "100%" }}>Добавить диван</button>
        </div>

        <div style={{ marginTop: 12 }}>
          <label>
            <input type="checkbox" checked={snapToGrid} onChange={(e) => setSnapToGrid(e.target.checked)} />{" "}
            Привязка к сетке ({GRID}px)
          </label>
        </div>

        <div style={{ marginTop: 12 }}>
          <strong>Элементы (список)</strong>
          <div style={{ maxHeight: 260, overflow: "auto", border: "1px solid #f0f0f0", padding: 6 }}>
            {items.map((it) => (
              <div key={it.id} onClick={() => setSelectedId(it.id)} style={{ padding: "6px", cursor: "pointer", background: it.id === selectedId ? "#eef" : "transparent", borderRadius: 4, marginBottom: 4 }}>
                <div style={{ fontSize: 13 }}>{it.name || it.type} {it.layoutId ? `(layout:${it.layoutId})` : `(tmp)`}</div>
                <div style={{ fontSize: 12, color: "#666" }}>{Math.round(it.x)},{Math.round(it.y)} rot:{Math.round(it.rotation)} tableId:{it.tableId ?? "-"}</div>
              </div>
            ))}
            {items.length === 0 && <div style={{ color: "#777" }}>Пока нет элементов</div>}
          </div>

          <div style={{ marginTop: 10 }}>
            <button onClick={handleSaveLayout} style={{ width: "100%" }}>Сохранить layout</button>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, position: "relative" }}>
        <Stage width={1100} height={780} onMouseDown={onStageMouseDown} style={{ background: "#fafafa", margin: 12, border: "1px solid #ddd" }} ref={stageRef}>
          <Layer>
            {Array.from({ length: Math.ceil(1100 / GRID) }).map((_, i) => <Rect key={`v${i}`} x={i * GRID} y={0} width={1} height={780} fill="#f2f2f2" listening={false} />)}
            {Array.from({ length: Math.ceil(780 / GRID) }).map((_, j) => <Rect key={`h${j}`} x={0} y={j * GRID} width={1100} height={1} fill="#f2f2f2" listening={false} />)}
          </Layer>

          <Layer ref={layerRef}>
            {items.map((it) => {
              const isSelected = selectedId === it.id;
              const commonProps = {
                id: it.id,
                x: it.x,
                y: it.y,
                width: it.width,
                height: it.height,
                rotation: it.rotation,
                draggable: true,
                onDragEnd: (e: any) => updateItem(it.id, { x: snap(e.target.x()), y: snap(e.target.y()) }, true),
                onTransformEnd: (e: any) => {
                  const node = e.target;
                  const scaleX = node.scaleX();
                  const scaleY = node.scaleY();
                  node.scaleX(1); node.scaleY(1);
                  updateItem(it.id, { x: snap(node.x()), y: snap(node.y()), width: Math.max(8, Math.round(node.width() * scaleX)), height: Math.max(8, Math.round(node.height() * scaleY)), rotation: Math.round(node.rotation()) }, true);
                },
                dragBoundFunc: (pos: { x: number; y: number }) => ({ x: snap(pos.x), y: snap(pos.y) }),
                onClick: () => setSelectedId(it.id),
                onTap: () => setSelectedId(it.id),
              };

              if (it.type === "wall") {
                return <Group key={it.id}><Rect {...commonProps} cornerRadius={2} fill={it.fill || "#333"} stroke={isSelected ? "#1976d2" : undefined} strokeWidth={isSelected ? 2 : 0} /><Text x={it.x} y={it.y - 18} text={isSelected ? "Стена" : ""} fontSize={12} /></Group>;
              }

              if (it.type === "table") {
                return <Group key={it.id}><Rect {...commonProps} cornerRadius={6} fill={it.fill || "#d9b38c"} stroke={isSelected ? "#1976d2" : undefined} strokeWidth={isSelected ? 2 : 0} /><Text x={it.x + 6} y={it.y + Math.max(6, it.height / 2 - 6)} text={it.name ?? "Стол"} fontSize={14} listening={false} /></Group>;
              }

              if (it.type === "sofa" && it.svg) {
                return <Group key={it.id}><SvgItem item={it} isSelected={isSelected} commonProps={commonProps} /><Text x={it.x + 8} y={it.y + Math.max(6, it.height / 2 - 8)} text="Диван" fontSize={14} listening={false} /></Group>;
              }

              return null;
            })}

            <Transformer ref={trRef} rotateEnabled={true} enabledAnchors={["top-left","top-right","bottom-left","bottom-right","middle-left","middle-right","top-center","bottom-center"]} boundBoxFunc={(oldBox,newBox)=>newBox.width<8||newBox.height<8?oldBox:newBox} />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
