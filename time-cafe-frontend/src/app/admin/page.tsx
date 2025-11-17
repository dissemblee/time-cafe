import { AdminLayout } from '@/app/adminLayout/AdminLayout';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';

export default function DashboardRoute() {
  return <AdminLayout><DashboardPage /></AdminLayout>;
}
