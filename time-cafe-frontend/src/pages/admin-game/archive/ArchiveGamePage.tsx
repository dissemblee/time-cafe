"use client";
import { useState } from "react";
import Link from "next/link";
import { DataTableSection } from "@/widgets/DataTableSection";
import { useGetAllBoardGamesQuery, useDeleteBoardGameMutation, BoardGameDto } from "@/entities/boardGame";
import { EditBoardGameModal } from "@/features/boardGameManagement/ui/EditBoardGameModal";
import { ConfirmModal } from "@/shared/ui/ConfirmModal";
import { AdminButton } from "@/shared/ui/AdminButton";

export const ArchiveGamePage = () => {
  const [page, setPage] = useState(1);
  const [editingItem, setEditingItem] = useState<BoardGameDto | null>(null);
  const [deletingItem, setDeletingItem] = useState<BoardGameDto | null>(null);
  
  const { data: boardGames, isLoading, refetch } = useGetAllBoardGamesQuery({ page, per_page: 10 });
  const [deleteBoardGame, { isLoading: isDeleting }] = useDeleteBoardGameMutation();

  const handleEdit = (item: BoardGameDto) => {
    setEditingItem(item);
  };

  const handleDelete = (item: BoardGameDto) => {
    setDeletingItem(item);
  };

  const confirmDelete = async () => {
    if (deletingItem) {
      try {
        await deleteBoardGame(deletingItem.id).unwrap();
        setDeletingItem(null);
        refetch();
      } catch (error) {
        console.error('Ошибка при удалении:', error);
      }
    }
  };

  const actions = (item: BoardGameDto) => (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <AdminButton 
        onClick={() => handleEdit(item)}
      >
        Редактировать
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
        actions={actions}
      />

      <EditBoardGameModal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        editingItem={editingItem}
      />

      <ConfirmModal
        isOpen={!!deletingItem}
        onClose={() => setDeletingItem(null)}
        onConfirm={confirmDelete}
        title="Удаление игры"
        message={`Вы уверены, что хотите удалить игру "${deletingItem?.name}"?`}
        isLoading={isDeleting}
      />
    </>
  );
};