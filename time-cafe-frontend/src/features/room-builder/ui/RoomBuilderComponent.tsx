"use client";
import React, { useState } from "react";
import { Stage, Layer, Rect, Group, Text, Transformer } from "react-konva";
import { SvgItem } from "./SvgItem";
import { GRID, useRoomBuilder } from "../hooks/useRoomBuilder";
import Konva from "konva";
import { AdminButton } from "@/shared/ui/AdminButton";
import { Modal } from "@/shared/ui/Modal";
import { GlassInput } from "@/shared/ui/GlassInput";
import styles from "./RoomBuilderComponent.module.scss"
import Link from "next/link";
import { TbWall, TbTable, TbSofa } from "react-icons/tb"; 
import { wallSvg, tableSvg, sofaSvg } from "@/shared/ui/Icons";

export const RoomBuilderComponent = () => {
  const builder = useRoomBuilder();
  const [showTableModal, setShowTableModal] = useState(false);
  const [tableForm, setTableForm] = useState({
    name: "",
    seats: "4",
    sofas: "0",
    has_console: false,
    has_tv: false
  });
  
  if (!builder.room) {
    return <div>Загрузка комнаты...</div>;
  }

  const {
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
  } = builder;

  const handleAddTableClick = () => {
    setTableForm({
      name: "",
      seats: "4",
      sofas: "0",
      has_console: false,
      has_tv: false
    });
    setShowTableModal(true);
  };

  const handleTableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addItem("table", { 
      width: 120, 
      height: 70, 
      fill: "#d9b38c", 
      name: tableForm.name || "Стол", 
      svg: tableSvg,
      tableData: {
        name: tableForm.name,
        seats: parseInt(tableForm.seats) || 4,
        sofas: parseInt(tableForm.sofas) || 0,
        has_console: tableForm.has_console,
        has_tv: tableForm.has_tv
      }
    }, true);
    setShowTableModal(false);
  };

  const handleTableFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setTableForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const renderItem = (it: any, isSelected: boolean) => {
    const commonProps = {
      id: it.id,
      x: it.x, y: it.y,
      width: it.width, height: it.height,
      rotation: it.rotation,
      draggable: true,
      onDragEnd: (e: any) =>
        updateItem(it.id, { x: snap(e.target.x()), y: snap(e.target.y()) }),
      onTransformEnd: (e: any) => {
        const node = e.target;
        const scaleX = node.scaleX(), scaleY = node.scaleY();
        node.scaleX(1); node.scaleY(1);
        updateItem(it.id, {
          x: snap(node.x()),
          y: snap(node.y()),
          width: Math.max(8, Math.round(node.width() * scaleX)),
          height: Math.max(8, Math.round(node.height() * scaleY)),
          rotation: Math.round(node.rotation())
        });
      },
      dragBoundFunc: (pos: { x: number, y: number }) => ({ x: snap(pos.x), y: snap(pos.y) }),
      onClick: () => setSelectedId(it.id),
      onTap: () => setSelectedId(it.id),
    };

    if (it.svg) {
      return (
        <Group key={it.id}>
          <SvgItem item={it} isSelected={isSelected} commonProps={commonProps} />
          <Text 
            x={it.x} 
            y={it.y - 18} 
            text={isSelected ? it.name : ""} 
            fontSize={12} 
            fill="#333"
            listening={false}
          />
        </Group>
      );
    }
    
    if (it.type === "wall") return <Group key={it.id}><Rect {...commonProps} cornerRadius={2} fill={it.fill || "#333"} stroke={isSelected ? "#1976d2" : undefined} strokeWidth={isSelected ? 2 : 0} /><Text x={it.x} y={it.y - 18} text={isSelected ? "Стена" : ""} fontSize={12} /></Group>;
    if (it.type === "table") return <Group key={it.id}><Rect {...commonProps} cornerRadius={6} fill={it.fill || "#d9b38c"} stroke={isSelected ? "#1976d2" : undefined} strokeWidth={isSelected ? 2 : 0} /><Text x={it.x + 6} y={it.y + Math.max(6, it.height / 2 - 6)} text={it.name ?? "Стол"} fontSize={14} listening={false} /></Group>;
    
    return null;
  };

  const onStageMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
      return;
    }
    const id = e.target.id();
    if (id) {
      setSelectedId(id);
    }
  };

  return (
    <>
      <section className={styles.RoomBuilderComponent}>
        <div className={styles.RoomBuilderComponent__SideBar}>
          <h3>Room builder — {room?.name}</h3>
          
          <AdminButton onClick={() => addItem("wall", { width: 240, height: 12, fill: "#666", name: "Стена", svg: wallSvg })}>
            <TbWall style={{ marginRight: '8px' }} />
            Добавить стену
          </AdminButton>

          <AdminButton onClick={handleAddTableClick}>
            <TbTable style={{ marginRight: '8px' }} />
            Добавить стол
          </AdminButton>

          <AdminButton onClick={() => addItem("sofa", { width: 160, height: 80, fill: "#8B4513", name: "Диван", svg: sofaSvg })}>
            <TbSofa style={{ marginRight: '8px' }} />
            Добавить диван
          </AdminButton>

          <h3>Элементы</h3>
          <div className={styles.RoomBuilderComponent__ElementList}>
            {items.map(it => (
              <div
                key={it.id}
                className={`${styles.RoomBuilderComponent__ElementItem} ${it.id === selectedId ? styles['RoomBuilderComponent__ElementItem--selected'] : ''}`}
                onClick={() => setSelectedId(it.id)}
              >
                <span>{it.name || it.type}</span>
              </div>
            ))}
          </div>
          <AdminButton onClick={handleSaveLayout}>Сохранить</AdminButton>

          <div className={styles.RoomBuilderComponent__Manual}>
            <h3>Управление клавишами: </h3>
            ⬆️⬇️⬅️➡️ — перемещение <br/>
            R — поворот на 15° <br/>
            Del/Backspace — удалить
          </div>

          <Link href="/admin/room"><AdminButton>Вернуться к списку комнат</AdminButton></Link>
        </div>

        <Stage width={1200} height={780} onMouseDown={onStageMouseDown} className={styles.RoomBuilderComponent__Grid} ref={stageRef}>
          <Layer>
            {Array.from({ length: Math.ceil(1200 / GRID) }).map((_, i) => <Rect key={`v${i}`} x={i * GRID} y={0} width={1} height={780} fill="#f2f2f2" listening={false} />)}
            {Array.from({ length: Math.ceil(780 / GRID) }).map((_, j) => <Rect key={`h${j}`} x={0} y={j * GRID} width={1200} height={1} fill="#f2f2f2" listening={false} />)}
          </Layer>
          <Layer ref={layerRef}>
            {items.map(it => renderItem(it, selectedId === it.id))}
            <Transformer
              ref={trRef}
              rotateEnabled
              enabledAnchors={["top-left","top-right","bottom-left","bottom-right","middle-left","middle-right","top-center","bottom-center"]}
              boundBoxFunc={(oldBox,newBox)=>newBox.width<8||newBox.height<8?oldBox:newBox}
            />
          </Layer>
        </Stage>
      </section>

      <Modal isOpen={showTableModal} onClose={() => setShowTableModal(false)}>
        <form onSubmit={handleTableSubmit}>
          <h2>Создание стола</h2>
          <GlassInput
            label="Название стола"
            name="name"
            value={tableForm.name}
            onChange={handleTableFormChange}
            required
          />
          <GlassInput
            label="Количество мест"
            name="seats"
            value={tableForm.seats}
            onChange={handleTableFormChange}
            required
          />
          <GlassInput
            label="Количество диванов"
            name="sofas"
            value={tableForm.sofas}
            onChange={handleTableFormChange}
            required
          />
          <div style={{ margin: '10px 0' }}>
            <label>
              <input
                type="checkbox"
                name="has_console"
                checked={tableForm.has_console}
                onChange={handleTableFormChange}
              />
              Есть консоль
            </label>
          </div>
          <div style={{ margin: '10px 0' }}>
            <label>
              <input
                type="checkbox"
                name="has_tv"
                checked={tableForm.has_tv}
                onChange={handleTableFormChange}
              />
              Есть телевизор
            </label>
          </div>
          <AdminButton type="submit">Создать стол</AdminButton>
        </form>
      </Modal>
    </>
  );
};