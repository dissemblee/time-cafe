"use client"

import { FoodType, useGetAllFoodItemsQuery } from "@/entities/foodItem";
import { GlassCard } from "@/shared/ui/GlassCard/GlassCard"
import styles from "./menuItems.module.scss"

export const MenuItems = () => {
  const { data: foodItems, isLoading, error } = useGetAllFoodItemsQuery();

  const menuCategories = foodItems?.data.reduce<Record<string, string[]>>((acc, item) => {
    if (item.type !== FoodType.NO) {
      if (!acc[item.type]) acc[item.type] = [];
      acc[item.type].push(item.name);
    }
    return acc;
  }, {} as Record<string, string[]>);

  const typeLabels: Record<FoodType, string> = {
    [FoodType.DRINK]: 'Напитки',
    [FoodType.SNACK]: 'Закуски',
    [FoodType.DESSERT]: 'Десерты',
    [FoodType.NO]: '',
  };

  return (
      <section className={styles.MenuPage__grid}>
        {isLoading ? (
          <GlassCard> <br /> Загрузка...</GlassCard>
        ) : error ? (
          <GlassCard>Ошибка при загрузке меню</GlassCard>
        ) : menuCategories ? (
          Object.entries(menuCategories).map(([type, items], index) => (
            <GlassCard key={index} className={styles.MenuPage__card}>
              <div className={styles.MenuPage__cardContent}>
                <h3 className={styles.MenuPage__cardTitle}>{typeLabels[type as FoodType]}</h3>
                <ul className={styles.MenuPage__items}>
                  {items.map((item, itemIndex) => (
                    <li key={itemIndex} className={styles.MenuPage__item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          ))
        ) : (
          <p>Нет доступных блюд</p>
        )}
      </section>
  )
}
