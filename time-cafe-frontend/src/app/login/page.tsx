import { LoginPage } from '@/pages/login/LoginPage';
import { ClientLayout } from '../clientLayout';

export default function loginRoute() {
  return <ClientLayout><LoginPage /></ClientLayout>;
}
