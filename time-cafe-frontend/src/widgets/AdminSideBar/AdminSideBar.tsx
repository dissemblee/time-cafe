"use client"
import Link from "next/link";
import styles from "./AdminSideBar.module.scss"
import { usePathname } from "next/navigation";

interface NAV_ITEM {
  href: string;
  icon: string;
  text: string;
}

interface NAV_ITEMS {
  nav: NAV_ITEM[];
}

export const AdminSideBar = ({ nav }: NAV_ITEMS) => {
  const pathname = usePathname();

  return (
    <aside className={styles.AdminLayout__Sidebar}>
      <div className={styles.Sidebar__Logo}>
        <h1>Time Cafe Admin</h1>
      </div>
      <nav className={styles.Sidebar__Nav}>
        <ul className={styles.Nav__Links}>
          {nav.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname?.startsWith(item.href));
            
            return (
              <li key={item.href} className={styles.Nav__Item}>
                <Link 
                  href={item.href}
                  className={`${styles.Nav__Link} ${isActive ? styles.active : ''}`}
                >
                  <span className={styles.Nav__Icon}>{item.icon}</span>
                  <span className={styles.Nav__Text}>{item.text}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  )
}
