import React from 'react';
import { MenuItems } from '@/features/menuItems';
import { HeroSection } from '@/shared/ui/HeroSection/HeroSection';

export const MenuPage: React.FC = () => {
  return (
    <>
      <HeroSection title="Меню TimeCafe" description="Вкусные напитки и закуски для идеального отдыха" />
      <MenuItems />
    </>
  );
};
