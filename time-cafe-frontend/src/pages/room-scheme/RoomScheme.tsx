"use client"
import { RoomSchemeComponent } from "@/features/roomSchemeComponent";
import { useParams } from "next/navigation";

export const RoomSchemePage = () => {
  const params = useParams() as { roomId?: string };
  const roomId = Number(params?.roomId);
  if (!roomId) throw new Error("Неверный ID комнаты");

  return <RoomSchemeComponent roomId={roomId} />;
}
