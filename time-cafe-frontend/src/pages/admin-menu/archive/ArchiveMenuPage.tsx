"use client";
import { useState } from "react";
import { useGetAllFoodItemsQuery, useDeleteFoodItemMutation, FoodItemDto } from "@/entities/foodItem";
import Link from "next/link";
import { DataTableSection } from "@/widgets/DataTableSection";
import { EditFoodItemModal } from "@/features/foodManagement/ui/EditFoodItemModal";
import { ConfirmModal } from "@/shared/ui/ConfirmModal";
import { AdminButton } from "@/shared/ui/AdminButton";

export const ArchiveMenuPage = () => {
  const [page, setPage] = useState(1);
  const [editingItem, setEditingItem] = useState<FoodItemDto | null>(null);
  const [deletingItem, setDeletingItem] = useState<FoodItemDto | null>(null);
  
  const { data: foodItems, isLoading, refetch } = useGetAllFoodItemsQuery({ page, per_page: 10 });
  const [deleteFoodItem, { isLoading: isDeleting, error: deleteError }] = useDeleteFoodItemMutation();

  const handleEdit = (item: FoodItemDto) => {
    setEditingItem(item);
  };

  const handleDelete = (item: FoodItemDto) => {
    setDeletingItem(item);
  };

  const confirmDelete = async () => {
    if (deletingItem) {
      try {
        await deleteFoodItem(deletingItem.id).unwrap();
        setDeletingItem(null);
        refetch();
      } catch (error) {
        console.error('Ошибка при удалении:', error);
      }
    }
  };

  const actions = (item: FoodItemDto) => (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <AdminButton 
        onClick={() => handleEdit(item)}
      >
        Редактировать
      </AdminButton>
      <AdminButton 
        variant="secondary"
        onClick={() => handleDelete(item)}
        disabled={isDeleting}
      >
        {deleteError ? "Упс... Ошибка" : (isDeleting ? "Удаление..." : "Удалить")}
      </AdminButton>
    </div>
  );

  return (
    <>
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
        actions={actions}
      />

      <EditFoodItemModal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        editingItem={editingItem}
      />

      <ConfirmModal
        isOpen={!!deletingItem}
        onClose={() => setDeletingItem(null)}
        onConfirm={confirmDelete}
        title="Удаление блюда"
        message={`Вы уверены, что хотите удалить блюдо "${deletingItem?.name}"?`}
        isLoading={isDeleting}
        confirmText={deleteError ? "Упс... Ошибка" : (isDeleting ? "Удаление..." : "Удалить")}
      />
    </>
  );
};