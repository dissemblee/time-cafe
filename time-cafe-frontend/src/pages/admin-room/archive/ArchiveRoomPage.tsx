"use client";
import { useState } from "react";
import Link from "next/link";
import { DataTableSection } from "@/widgets/DataTableSection";
import { useGetAllRoomsQuery } from "@/entities/room";

export const ArchiveRoomPage = () => {
  const [page, setPage] = useState(1);
  const { data: rooms, isLoading } = useGetAllRoomsQuery({ page, per_page: 10 });

  return (
    <DataTableSection
      data={rooms?.data}
      columns={{
        ID: "id",
        Название: "name",
        Описание: "description",
        Тип: "type",
        Курение: {
          view(data) {
            return data.smoking_allowed ? "Разрешено" : "Запрещено";
          },
        },
        Особенности: "features",
        "Минимальная стоимость": "min_price",
      }}
      isLoading={isLoading}
      meta={rooms?.meta}
      onPageChange={setPage}
      headerActions={<Link href="/admin/room/create">Создать новую комнату</Link>}
    />
  );
};
