"use client";
import { Stage, Layer, Rect, Group, Text } from "react-konva";
import { useState } from "react";
import { useGetRoomQuery } from "@/entities/room";
import { useGetRoomLayoutItemQuery } from "@/entities/roomLayoutItem";
import { useGetTableQuery } from "@/entities/table";
import styles from "./RoomSchemeComponent.module.scss";
import { Loader } from "@/shared/ui/Loader";
import { Error } from "@/shared/ui/Error";
import { LiquidButton } from "@/shared/ui/LiquidButton";
import Link from "next/link";

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

  if (!room) return <p>Комната не найдена</p>;
  if (isLoading) return <Loader />;
  if (!layout) return <Loader />;
  if (error) return <Error />;

  return (
    <>
      <Stage width={1200} height={780} className={styles.RoomSchemeComponent}>
        <Layer>
          {layout.items.map((item, index) => {
            const color =
              item.type === "wall"
                ? "#444"
                : item.type === "table"
                ? "#d9b38c"
                : "#7aa6ff";

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
                <Rect
                  width={item.width}
                  height={item.height}
                  fill={color}
                  cornerRadius={4}
                />
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

      {selectedTableId && (
        <div className={styles.TableInfo}>
          {tableLoading && <Loader />}
          {tableError && <Error />}
          {selectedTable && (
            <div>
              <h3>Стол #{selectedTable.id}</h3>
              <p>Название: {selectedTable.name}</p>
              <p>Статус: {selectedTable.status}</p>
              <p>Мест: {selectedTable.seats}</p>
              <p>Забронировано: {selectedTable.name ? "Да" : "Нет"}</p>
              <Link href={`/booking/${selectedTable.id}`}>
                <LiquidButton>Забронировать</LiquidButton>
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};
