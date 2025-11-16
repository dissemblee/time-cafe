"use client"
import { useGetAllFoodItemsQuery } from "@/entities/foodItem"
import { Table } from "@/shared/ui/Table"
import { useState } from "react";

export const DashboardPage = () => {
  const [page, setPage] = useState(1);
  const { data: foodItems, isLoading } = useGetAllFoodItemsQuery({ page, per_page: 10 });
  return (
    <>
      <Table
        data={foodItems?.data}
        meta={foodItems?.meta}
        isLoading={isLoading}
        columns={{ ID: "id", Название: "name" }}
        onPageChange={setPage}
      />
    </>
  )
}