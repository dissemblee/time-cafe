import { AdminHeader } from "@/widgets/AdminHeader"
import styles from "./AdminLayout.module.scss"
import { AdminSideBar } from '@/widgets/AdminSideBar';

const NAV_ITEMS = [
  { href: '/admin', icon: '📊', text: 'Дашборд' },
  { href: '/admin/menu', icon: '🍽️', text: 'Меню' },
  { href: '/admin/game', icon: '🎮', text: 'Игры' },
  { href: '/admin/room', icon: '🏠', text: 'Комнаты' },
  { href: '/admin/booking', icon: '🛎️', text: 'Бронирования' },
  { href: '/admin/transaction', icon: '💰', text: 'Транзакции' },
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
