"use client";
import { Stage, Layer, Group, Text, Rect, Image } from "react-konva";
import { useState, useEffect } from "react";
import { useGetRoomQuery } from "@/entities/room";
import { useGetRoomLayoutItemQuery } from "@/entities/roomLayoutItem";
import { TableStatus, useGetTableQuery } from "@/entities/table";
import styles from "./RoomSchemeComponent.module.scss";
import { Loader } from "@/shared/ui/Loader";
import { Error } from "@/shared/ui/Error";
import { LiquidButton } from "@/shared/ui/LiquidButton";
import Link from "next/link";
import { Modal } from "@/shared/ui/Modal";
import { wallSvg, tableSvg, sofaSvg } from "@/shared/ui/Icons";

const SvgImage = ({ svg, x, y, width, height, rotation }: any) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!svg) return;
    
    const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const img = new window.Image();
    img.onload = () => {
      setImage(img);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, [svg]);

  return (
    <Image
      x={x}
      y={y}
      width={width}
      height={height}
      rotation={rotation}
      image={image || undefined}
    />
  );
};

export const RoomSchemeComponent = ({ roomId }: { roomId: number }) => {
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);

  const { data: room } = useGetRoomQuery(roomId);
  const { data: layout, isLoading, error } = useGetRoomLayoutItemQuery(roomId);
  const {
    data: selectedTable,
    isLoading: tableLoading,
    error: tableError,
  } = useGetTableQuery(selectedTableId!, {
    skip: !selectedTableId,
  });

  const closeModal = () => {
    setSelectedTableId(null);
  };

  const getSvgForType = (type: string) => {
    switch(type) {
      case "wall": return wallSvg;
      case "table": return tableSvg;
      case "sofa": return sofaSvg;
      default: return null;
    }
  };

  if (!room) return <p>Комната не найдена</p>;
  if (isLoading) return <Loader />;
  if (!layout) return <Loader />;
  if (error) return <Error />;

  return (
    <>
      <Stage width={1200} height={780} className={styles.RoomSchemeComponent}>
        <Layer>
          {layout.items.map((item, index) => {
            const svg = getSvgForType(item.type);

            return (
              <Group
                key={index}
                x={item.x}
                y={item.y}
                rotation={item.rotation}
                onClick={() => {
                  if (item.type === "table") {
                    setSelectedTableId(item.table_id || 0);
                  }
                }}
                onTap={() => {
                  if (item.type === "table") {
                    setSelectedTableId(item.table_id || 0);
                  }
                }}
              >
                {svg ? (
                  <SvgImage 
                    svg={svg}
                    x={0}
                    y={0}
                    width={item.width}
                    height={item.height}
                  />
                ) : (
                  <Rect
                    width={item.width}
                    height={item.height}
                    fill={item.type === "wall" ? "#444" : item.type === "table" ? "#d9b38c" : "#7aa6ff"}
                    cornerRadius={4}
                  />
                )}
                
                {item.type === "table" && (
                  <Text
                    text={`Стол #${item.table_id}`}
                    fontSize={14}
                    fill="#333"
                    y={item.height / 2 - 7}
                    x={5}
                  />
                )}
              </Group>
            );
          })}
        </Layer>
      </Stage>

      <Modal 
        isOpen={!!selectedTableId} 
        onClose={closeModal}
        title={selectedTable ? `Стол #${selectedTable.id}` : "Загрузка..."}
      >
        {tableLoading && <Loader />}
        {tableError && <Error />}
        
        {selectedTable && (
          <div>
            <p><strong>Название:</strong> {selectedTable.name}</p>
            <p><strong>Мест:</strong> {selectedTable.seats}</p>
            <p><strong>Забронировано:</strong> {selectedTable.status === TableStatus.BOOKED ? "Да" : "Нет"}</p>
            
            <div style={{ display: "flex", justifyContent: "center", marginTop: "25px" }}>
              <Link href={`/booking/${selectedTable.id}`}>
                <LiquidButton>Забронировать</LiquidButton>
              </Link>
            </div>
          </div>  
        )}
      </Modal>
    </>
  );
};