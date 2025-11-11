'use client';
import React, { useEffect } from 'react';
import { HeroSection } from '../../features/hero/ui/HeroSection';
import { CategoriesSection } from '../../features/categories';
import { GamesSection } from '../../features/games/ui/GamesSection';

export const LandingPage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <GamesSection />
    </>
  );
};