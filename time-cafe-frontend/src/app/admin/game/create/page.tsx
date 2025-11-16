import { AdminLayout } from '@/app/adminLayout/AdminLayout';
import { CreateGamePage } from '@/pages/admin-game/create/CreateGamePage';

export default function CreateGameRoute() {
  return <AdminLayout><CreateGamePage /></AdminLayout>;
}
