// pages/room-builder.tsx
import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Group, Text, Transformer } from "react-konva";
import { v4 as uuidv4 } from "uuid";

// Установите: npm i uuid
// Или замените uuidv4() любым генератором id

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
};

const GRID = 20;

export default function RoomBuilder() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [snapToGrid, setSnapToGrid] = useState(true);

  const stageRef = useRef<any>(null);
  const layerRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  // Attach transformer to selected node
  useEffect(() => {
    if (!trRef.current) return;
    const stage = stageRef.current;
    const layer = layerRef.current;
    if (!stage || !layer) return;

    if (selectedId) {
      const node = layer.findOne(`#${selectedId}`);
      if (node) {
        trRef.current.nodes([node]);
        trRef.current.getLayer().batchDraw();
      } else {
        trRef.current.nodes([]);
      }
    } else {
      trRef.current.nodes([]);
      trRef.current.getLayer().batchDraw();
    }
  }, [selectedId, items]);

  // Keyboard handlers: Delete to remove, R rotate selected by 15°
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (selectedId) {
          setItems((prev) => prev.filter((it) => it.id !== selectedId));
          setSelectedId(null);
        }
      }
      if ((e.key === "r" || e.key === "R") && selectedId) {
        setItems((prev) =>
          prev.map((it) =>
            it.id === selectedId ? { ...it, rotation: (it.rotation + 15) % 360 } : it
          )
        );
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId]);

  // Utility: snap function
  const snap = (value: number) => (snapToGrid ? Math.round(value / GRID) * GRID : value);

  // Adders
  const addWall = () => {
    const id = uuidv4();
    const item: Item = {
      id,
      type: "wall",
      x: 50,
      y: 50,
      width: 240,
      height: 8, // thin wall
      rotation: 0,
      fill: "#444",
      name: "Wall",
    };
    setItems((p) => [...p, item]);
    setSelectedId(id);
  };

  const addTable = () => {
    const id = uuidv4();
    const item: Item = {
      id,
      type: "table",
      x: 150,
      y: 150,
      width: 120,
      height: 70,
      rotation: 0,
      fill: "#d9b38c",
      name: "Table",
    };
    setItems((p) => [...p, item]);
    setSelectedId(id);
  };

  const addSofa = () => {
    const id = uuidv4();
    const item: Item = {
      id,
      type: "sofa",
      x: 300,
      y: 150,
      width: 160,
      height: 80,
      rotation: 0,
      fill: "#7aa6ff",
      name: "Sofa",
    };
    setItems((p) => [...p, item]);
    setSelectedId(id);
  };

  // Update item on drag/transform
  const updateItem = (id: string, newProps: Partial<Item>) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...newProps } : it)));
  };

  // Deselect when clicked outside
  const onStageMouseDown = (e: any) => {
    // clicked on empty area - clear selection
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
      return;
    }
    // clicked on shape
    const clickedOn = e.target;
    const id = clickedOn.attrs.id;
    if (id) setSelectedId(id);
  };

  // Draw grid
  const GridLayer = () => {
    const lines = [];
    const WIDTH = 1200;
    const HEIGHT = 800;
    for (let i = 0; i < WIDTH / GRID; i++) {
      lines.push(
        <Rect
          key={`v${i}`}
          x={i * GRID}
          y={0}
          width={1}
          height={HEIGHT}
          fill="#eee"
          listening={false}
        />
      );
    }
    for (let j = 0; j < HEIGHT / GRID; j++) {
      lines.push(
        <Rect
          key={`h${j}`}
          x={0}
          y={j * GRID}
          width={WIDTH}
          height={1}
          fill="#eee"
          listening={false}
        />
      );
    }
    return <Layer>{lines}</Layer>;
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Inter, Arial" }}>
      <div style={{ width: 260, padding: 12, borderRight: "1px solid #ddd", boxSizing: "border-box" }}>
        <h3 style={{ marginTop: 0 }}>Room builder</h3>
        <div style={{ marginBottom: 8 }}>
          <button onClick={addWall} style={{ width: "100%", marginBottom: 6 }}>
            Добавить стену
          </button>
          <button onClick={addTable} style={{ width: "100%", marginBottom: 6 }}>
            Добавить стол
          </button>
          <button onClick={addSofa} style={{ width: "100%" }}>
            Добавить диван
          </button>
        </div>

        <div style={{ marginTop: 12 }}>
          <label>
            <input
              type="checkbox"
              checked={snapToGrid}
              onChange={(e) => setSnapToGrid(e.target.checked)}
            />{" "}
            Привязка к сетке ({GRID}px)
          </label>
        </div>

        <div style={{ marginTop: 12 }}>
          <small>Выбор: клик на объект. Перетаскивать, использовать рамку для вращения/масштабирования.</small>
        </div>

        <div style={{ marginTop: 12 }}>
          <strong>Клавиши</strong>
          <ul style={{ margin: "6px 0 0 18px", padding: 0 }}>
            <li>Delete — удалить выбранный</li>
            <li>R — повернуть выбранный на 15°</li>
            <li>Esc — отмена выбора (клик в пустом месте тоже работает)</li>
          </ul>
        </div>

        <div style={{ marginTop: 12 }}>
          <strong>Элементы (список)</strong>
          <div style={{ maxHeight: 200, overflow: "auto", border: "1px solid #f0f0f0", padding: 6 }}>
            {items.map((it) => (
              <div
                key={it.id}
                onClick={() => setSelectedId(it.id)}
                style={{
                  padding: "6px",
                  cursor: "pointer",
                  background: it.id === selectedId ? "#eef" : "transparent",
                  borderRadius: 4,
                  marginBottom: 4,
                }}
              >
                {it.name || it.type} — {Math.round(it.x)},{Math.round(it.y)} rot:{Math.round(it.rotation)}
              </div>
            ))}
            {items.length === 0 && <div style={{ color: "#777" }}>Пока нет элементов</div>}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, position: "relative" }}>
        <div style={{ position: "absolute", zIndex: 5, right: 12, top: 12, background: "#fff", padding: 8, borderRadius: 6, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          <button onClick={() => {const data = JSON.stringify(items, null, 2); navigator.clipboard.writeText(data); alert("Схема скопирована в буфер обмена (JSON)"); }}>Экспорт JSON</button>
        </div>

        <Stage
          width={1100}
          height={780}
          onMouseDown={onStageMouseDown}
          style={{ background: "#fafafa", margin: 12, border: "1px solid #ddd" }}
          ref={stageRef}
        >
          <Layer>
            {Array.from({ length: Math.ceil(1100 / GRID) }).map((_, i) => (
              <Rect key={`v${i}`} x={i * GRID} y={0} width={1} height={780} fill="#f2f2f2" listening={false} />
            ))}
            {Array.from({ length: Math.ceil(780 / GRID) }).map((_, j) => (
              <Rect key={`h${j}`} x={0} y={j * GRID} width={1100} height={1} fill="#f2f2f2" listening={false} />
            ))}
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
                onDragEnd: (e: any) => {
                  updateItem(it.id, { x: snap(e.target.x()), y: snap(e.target.y()) });
                },
                onDragMove: (e: any) => {
                },
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
                dragBoundFunc: (pos: { x: number; y: number }) => {
                  return {
                    x: snap(pos.x),
                    y: snap(pos.y),
                  };
                },
                onClick: () => setSelectedId(it.id),
                onTap: () => setSelectedId(it.id),
              };

              if (it.type === "wall") {
                return (
                  <Group key={it.id}>
                    <Rect
                      {...commonProps}
                      cornerRadius={2}
                      fill={it.fill || "#333"}
                      stroke={isSelected ? "#1976d2" : undefined}
                      strokeWidth={isSelected ? 2 : 0}
                    />
                    {isSelected && <Text x={it.x} y={it.y - 18} text="Стена" fontSize={12} />}
                  </Group>
                );
              }

              // table
              if (it.type === "table") {
                return (
                  <Group key={it.id}>
                    <Rect
                      {...commonProps}
                      cornerRadius={6}
                      fill={it.fill || "#d9b38c"}
                      stroke={isSelected ? "#1976d2" : undefined}
                      strokeWidth={isSelected ? 2 : 0}
                    />
                    <Text
                      x={it.x + 6}
                      y={it.y + Math.max(6, it.height / 2 - 6)}
                      text="Стол"
                      fontSize={14}
                      listening={false}
                    />
                  </Group>
                );
              }

              // sofa
              if (it.type === "sofa") {
                return (
                  <Group key={it.id}>
                    <Rect
                      {...commonProps}
                      cornerRadius={10}
                      fill={it.fill || "#7aa6ff"}
                      stroke={isSelected ? "#1976d2" : undefined}
                      strokeWidth={isSelected ? 2 : 0}
                    />
                    <Text
                      x={it.x + 8}
                      y={it.y + Math.max(6, it.height / 2 - 8)}
                      text="Диван"
                      fontSize={14}
                      listening={false}
                    />
                  </Group>
                );
              }

              return null;
            })}

            <Transformer
              ref={trRef}
              rotateEnabled={true}
              enabledAnchors={[
                "top-left",
                "top-right",
                "bottom-left",
                "bottom-right",
                "middle-left",
                "middle-right",
                "top-center",
                "bottom-center",
              ]}
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 8 || newBox.height < 8) return oldBox;
                return newBox;
              }}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
