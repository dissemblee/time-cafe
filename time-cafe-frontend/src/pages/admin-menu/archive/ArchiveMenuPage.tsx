"use client";
import { useState } from "react";
import { useGetAllFoodItemsQuery } from "@/entities/foodItem";
import Link from "next/link";
import { DataTableSection } from "@/widgets/DataTableSection";

export const ArchiveMenuPage = () => {
  const [page, setPage] = useState(1);
  const { data: foodItems, isLoading } = useGetAllFoodItemsQuery({ page, per_page: 10 });

  return (
    <DataTableSection
      data={foodItems?.data}
      columns={{
        ID: "id",
        Название: "name",
        Описание: "description",
        Цена: "price",
        Тип: "type"
      }}
      isLoading={isLoading}
      meta={foodItems?.meta}
      onPageChange={setPage}
      headerActions={<Link href="/admin/menu/create">Создать новое блюдо</Link>}
    />
  );
};
