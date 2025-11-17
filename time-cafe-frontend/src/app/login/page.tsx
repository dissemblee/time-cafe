import { LoginPage } from '@/pages/login/LoginPage';
import { RoomsPage } from '../../pages/rooms/RoomsPage';
import { ClientLayout } from '../clientLayout';

export default function LoginRoute() {
  return <ClientLayout><LoginPage /></ClientLayout>;
}
