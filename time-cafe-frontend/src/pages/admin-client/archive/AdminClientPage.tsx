import { useGetAllClientsQuery } from "@/entities/client";
import { useGetUserQuery } from "@/entities/user";
import { DataTableSection } from "@/widgets/DataTableSection";
import { useState } from "react";

export const AdminClientPage = () => {
  const [page, setPage] = useState(1);
  const { data: client, isLoading } = useGetAllClientsQuery({ page, per_page: 10 });
  
  return (
    <DataTableSection
      data={client?.data}
      columns={{
        ID: "id",
        Имя: "name",
        "Номер банковской карты": "bank_number",
        Телефон: "phone",
        "ID пользователя": {
          view(data) {
            const { data: user, isLoading: isUserLoading } = useGetUserQuery(data.user_id);
            return (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {isUserLoading ? "Загрузка..." : (
                  <>
                    <span>{user?.login}</span>
                    <span>{user?.email}</span>
                  </>
                )}
              </div>
            );
          },
        }
      }}
      isLoading={isLoading}
      meta={client?.meta}
      onPageChange={setPage}
    />
  );
}
