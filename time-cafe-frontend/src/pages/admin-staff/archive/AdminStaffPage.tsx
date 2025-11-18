"use client"

import { useGenerateRegistrationLinkMutation } from "@/entities/registrationLinks";
import { useGetAllStaffsQuery } from "@/entities/staff";
import { useGetUserQuery } from "@/entities/user";
import { DataTableSection } from "@/widgets/DataTableSection";
import { useState } from "react";

export const AdminStaffPage = () => {
  const [page, setPage] = useState(1);
  const { data: staff, isLoading } = useGetAllStaffsQuery({ page, per_page: 10 });
  const [generateLink, { isLoading: isGenerating, error }] = useGenerateRegistrationLinkMutation();

  const handleGenerateLink = async () => {
    try {
      const result = await generateLink({ role: 'admin' }).unwrap();
      
      if (result.registration_url) {
        navigator.clipboard.writeText(result.registration_url);
        alert(`Ссылка для регистрации скопирована в буфер обмена:\n${result.registration_url}`);
      }

    } catch (err) {
      console.error('Ошибка генерации ссылки', err);
      alert(`Ошибка: Не удалось создать ссылку`);
    }
  };

  return (
    <DataTableSection
      data={staff?.data}
      columns={{
        ID: "id",
        Имя: "name",
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
      meta={staff?.meta}
      onPageChange={setPage}
      headerActions={<div onClick={handleGenerateLink}>{isGenerating ? "Создание..." : "Создать ссылку временной регистрации"}</div>}
    />
  );
}
