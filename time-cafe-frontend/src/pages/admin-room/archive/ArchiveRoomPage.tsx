"use client";
import { useState } from "react";
import Link from "next/link";
import { DataTableSection } from "@/widgets/DataTableSection";
import { useGetAllRoomsQuery, useDeleteRoomMutation, RoomDto } from "@/entities/room";
import { EditRoomModal } from "@/features/roomManagement/ui/EditRoomModal";
import { ConfirmModal } from "@/shared/ui/ConfirmModal";
import { AdminButton } from "@/shared/ui/AdminButton";

export const ArchiveRoomPage = () => {
  const [page, setPage] = useState(1);
  const [editingItem, setEditingItem] = useState<RoomDto | null>(null);
  const [deletingItem, setDeletingItem] = useState<RoomDto | null>(null);
  
  const { data: rooms, isLoading, refetch } = useGetAllRoomsQuery({ page, per_page: 10 });
  const [deleteRoom, { isLoading: isDeleting }] = useDeleteRoomMutation();

  const handleEdit = (item: RoomDto) => {
    setEditingItem(item);
  };

  const handleDelete = (item: RoomDto) => {
    setDeletingItem(item);
  };

  const handleBuilder = (item: RoomDto) => {
    window.open(`/admin/builder/${item.id}`, '_blank');
  };

  const confirmDelete = async () => {
    if (deletingItem) {
      try {
        await deleteRoom(deletingItem.id).unwrap();
        setDeletingItem(null);
        refetch();
      } catch (error) {
        console.error('Ошибка при удалении:', error);
      }
    }
  };

  const actions = (item: RoomDto) => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <AdminButton 
        onClick={() => handleEdit(item)}
      >
        Редактировать
      </AdminButton>
      <AdminButton 
        variant="secondary"
        onClick={() => handleBuilder(item)}
      >
        Схема
      </AdminButton>
      <AdminButton 
        variant="secondary"
        onClick={() => handleDelete(item)}
      >
        Удалить
      </AdminButton>
    </div>
  );

  return (
    <>
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
        actions={actions}
      />

      <EditRoomModal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        editingItem={editingItem}
      />

      <ConfirmModal
        isOpen={!!deletingItem}
        onClose={() => setDeletingItem(null)}
        onConfirm={confirmDelete}
        title="Удаление комнаты"
        message={`Вы уверены, что хотите удалить комнату "${deletingItem?.name}"?`}
        isLoading={isDeleting}
      />
    </>
  );
};