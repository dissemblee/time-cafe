import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Group, Text, Transformer } from "react-konva";
import { v4 as uuidv4 } from "uuid";

type ItemType = "wall" | "table" | "sofa";

type Item = {
  id: string;
  type: ItemType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  fill?: string;
  name?: string;
  table_id?: number;
  seatsCount?: number;
  hasConsole?: boolean;
  hasTV?: boolean;
};

const GRID = 20;

interface TableFromDB {
  id: number;
  seats_count: number;
  has_console: boolean;
  has_tv: boolean;
}

export default function RoomBuilder() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [tables, setTables] = useState<TableFromDB[]>([]);

  const stageRef = useRef<any>(null);
  const layerRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  useEffect(() => {
    fetch("/api/tables")
      .then((res) => res.json())
      .then((data) => setTables(data));
  }, []);

  const snap = (value: number) => (snapToGrid ? Math.round(value / GRID) * GRID : value);

  const addTable = (table: TableFromDB) => {
    if (items.some((it) => it.table_id === table.id)) {
      alert(`Стол #${table.id} уже добавлен в зал`);
      return;
    }
    const id = uuidv4();
    setItems((p) => [
      ...p,
      {
        id,
        type: "table",
        x: 150,
        y: 150,
        width: 120,
        height: 70,
        rotation: 0,
        fill: "#d9b38c",
        name: `Стол #${table.id}`,
        table_id: table.id,
        seatsCount: table.seats_count,
        hasConsole: table.has_console,
        hasTV: table.has_tv,
      },
    ]);
    setSelectedId(id);
  };

  const updateItem = (id: string, newProps: Partial<Item>) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...newProps } : it)));
  };

  const onStageMouseDown = (e: any) => {
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
      return;
    }
    const id = e.target.attrs.id;
    if (id) setSelectedId(id);
  };

  const saveLayout = async () => {
    const layoutToSave = items.map((it) => ({
      id: it.id,
      type: it.type,
      x: it.x,
      y: it.y,
      width: it.width,
      height: it.height,
      rotation: it.rotation,
      table_id: it.table_id || null,
    }));

    try {
      const res = await fetch("/api/room-layout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ layout: layoutToSave }),
      });
      if (res.ok) alert("Layout успешно сохранён");
      else alert("Ошибка при сохранении layout");
    } catch (err) {
      console.error(err);
      alert("Ошибка сети");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Inter, Arial" }}>
      <div style={{ width: 260, padding: 12, borderRight: "1px solid #ddd", boxSizing: "border-box" }}>
        <h3>Room builder</h3>
        <button onClick={saveLayout} style={{ width: "100%", marginBottom: 12 }}>Сохранить зал</button>

        <button onClick={() => addTable(tables[0])} style={{ width: "100%", marginBottom: 6 }}>Добавить стол #1</button>
        <div style={{ marginTop: 6 }}>
          <strong>Столы из базы</strong>
          {tables.map((t) => (
            <button key={t.id} onClick={() => addTable(t)} style={{ width: "100%", marginBottom: 4 }}>
              Стол #{t.id} ({t.seats_count} чел)
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, position: "relative" }}>
        <Stage width={1100} height={780} onMouseDown={onStageMouseDown} style={{ background: "#fafafa", margin: 12, border: "1px solid #ddd" }} ref={stageRef}>
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
                onDragEnd: (e: any) => updateItem(it.id, { x: snap(e.target.x()), y: snap(e.target.y()) }),
                onTransformEnd: (e: any) => {
                  const node = e.target;
                  const scaleX = node.scaleX();
                  const scaleY = node.scaleY();
                  node.scaleX(1);
                  node.scaleY(1);
                  updateItem(it.id, {
                    x: snap(node.x()),
                    y: snap(node.y()),
                    width: Math.max(8, Math.round(node.width() * scaleX)),
                    height: Math.max(8, Math.round(node.height() * scaleY)),
                    rotation: Math.round(node.rotation()),
                  });
                },
                onClick: () => setSelectedId(it.id),
              };

              if (it.type === "wall") return <Rect key={it.id} {...commonProps} fill={it.fill} />;
              if (it.type === "sofa") return <Rect key={it.id} {...commonProps} fill={it.fill} />;
              if (it.type === "table") return <Rect key={it.id} {...commonProps} fill={it.fill} stroke={isSelected ? "blue" : undefined} />;
              return null;
            })}
            <Transformer ref={trRef} rotateEnabled={true} />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
