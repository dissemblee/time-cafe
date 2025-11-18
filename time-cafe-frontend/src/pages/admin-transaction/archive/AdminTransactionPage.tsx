"use client"

import { useGetClientQuery } from "@/entities/client";
import { useGetAllTransactionsQuery } from "@/entities/transaction";
import { DataTableSection } from "@/widgets/DataTableSection";
import { useState } from "react";

export const AdminTransactionPage = () => {
  const [page, setPage] = useState(1);
  const { data: transaction, isLoading } = useGetAllTransactionsQuery({ page, per_page: 10 });
  
  return (
    <DataTableSection
      data={transaction?.data}
      columns={{
        ID: "id",
        Имя: "booking_id",
        "Код транзакции": "transaction_code",
        Статус: "status",
        "ID Клиента": {
          view(data) {
            const { data: client, isLoading: isUserLoading } = useGetClientQuery(data.client_id);
            return (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {isUserLoading ? "Загрузка..." : (
                  <>
                    <span>{client?.name}</span>
                    <span>{client?.phone}</span>
                  </>
                )}
              </div>
            );
          },
        }
      }}
      isLoading={isLoading}
      meta={transaction?.meta}
      onPageChange={setPage}
    />
  );
}
