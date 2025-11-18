import { AdminLayout } from '@/app/adminLayout/AdminLayout';
import { AdminTransactionPage } from '@/pages/admin-transaction/archive/AdminTransactionPage';

export default function ArchiveTransactionRoute() {
  return <AdminLayout><AdminTransactionPage /></AdminLayout>;
}
