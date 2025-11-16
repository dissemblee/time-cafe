"use client";
import { useState } from "react";
import Link from "next/link";
import { DataTableSection } from "@/widgets/DataTableSection";
import { useGetAllBoardGamesQuery } from "@/entities/boardGame/boardGame.api";

export const ArchiveGamePage = () => {
  const [page, setPage] = useState(1);
  const { data: boardGames, isLoading } = useGetAllBoardGamesQuery({ page, per_page: 10 });
  
  return (
    <DataTableSection
      data={boardGames?.data}
      columns={{
        ID: "id",
        Название: "name",
        Описание: "description",
        Количество: "quantity",
      }}
      isLoading={isLoading}
      meta={boardGames?.meta}
      onPageChange={setPage}
      headerActions={<Link href="/admin/game/create">Создать новую игру</Link>}
    />
  );
};
