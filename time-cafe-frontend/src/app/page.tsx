import { LandingPage } from '../pages/landing/LandingPage';
import { ClientLayout } from './clientLayout';

export default function HomeRoute() {
  return <ClientLayout><LandingPage /></ClientLayout>;
}