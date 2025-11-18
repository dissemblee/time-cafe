import { AdminLayout } from '@/app/adminLayout/AdminLayout';
import { AdminProfilePage } from '@/pages/admin-profile/AdminProfilePage';

export default function AdminProfileRoute() {
  return <AdminLayout><AdminProfilePage /></AdminLayout>;
}
