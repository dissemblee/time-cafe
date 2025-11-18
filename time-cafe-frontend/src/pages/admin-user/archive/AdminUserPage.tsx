"use client"
import { useGetAllUsersQuery } from "@/entities/user";
import { DataTableSection } from "@/widgets/DataTableSection";
import { useState } from "react";

export const AdminUserPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data: users, isLoading } = useGetAllUsersQuery({ page, per_page: 10 });
  
  return (
    <DataTableSection
      data={users?.data}
      columns={{
        ID: "id",
        Логин: "login",
        Email: "email",
      }}
      isLoading={isLoading}
      meta={users?.meta}
      onPageChange={setPage}
    />
  );
}
