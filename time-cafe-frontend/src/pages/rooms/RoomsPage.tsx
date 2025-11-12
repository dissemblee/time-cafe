import { RoomList } from '@/features/roomList';
import { HeroSection } from '@/shared/ui/HeroSection';

export const RoomsPage = () => {
  return (
    <>
      <HeroSection title="Игровые комнаты" description="Уютные пространства для игр и отдыха с друзьями" />
      <RoomList />
    </>
  );
};
