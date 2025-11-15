import { AdminHeader } from "@/widgets/AdminHeader"
import styles from "./AdminLayout.module.scss"
import { AdminSideBar } from '@/widgets/AdminSideBar';

const NAV_ITEMS = [
  { href: '/admin', icon: '📊', text: 'Дашборд' },
  { href: '/admin/clients', icon: '👥', text: 'Клиенты' },
  { href: '/admin/bookings', icon: '🛎️', text: 'Бронирования' },
  { href: '/admin/menu', icon: '🍽️', text: 'Меню' },
  { href: '/admin/boardgames', icon: '🎮', text: 'Игры' },
  { href: '/admin/rooms', icon: '🏠', text: 'Комнаты' },
  { href: '/admin/tables', icon: '🪑', text: 'Столы' },
  { href: '/admin/staff', icon: '👨‍💼', text: 'Персонал' },
  { href: '/admin/transactions', icon: '💰', text: 'Транзакции' },
];

export const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className={styles.AdminLayout}>
      <AdminSideBar nav={NAV_ITEMS} />
      
      <section className={styles.AdminLayout__Body}>
        <header>
          <AdminHeader nav={NAV_ITEMS} />
        </header>

        <main className={styles.AdminLayout__Main}>
          {children}
        </main>
      </section>
    </div>
  )
}
