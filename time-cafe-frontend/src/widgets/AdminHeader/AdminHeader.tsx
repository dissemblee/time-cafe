"use client"
import Link from "next/link"
import { FaUser } from "react-icons/fa"
import styles from "./AdminHeader.module.scss"
import { usePathname } from "next/navigation";

interface NAV_ITEM {
  href: string;
  icon: string;
  text: string;
}

interface NAV_ITEMS {
  nav: NAV_ITEM[];
}

export const AdminHeader = ({ nav }: NAV_ITEMS) => {
  const pathname = usePathname();
  
  const currentNavItem = nav.find(item => 
    pathname === item.href || 
    (item.href !== '/admin' && pathname?.startsWith(item.href))
  );
  
  const pageTitle = currentNavItem?.text || 
    nav.find(item => item.href === '/admin')?.text || 
    'Админ-панель';

  return (
    <header className={styles.AdminHeader}>
      <div className={styles.AdminHeader__content}>
        <h1>{pageTitle}</h1>
        <Link href="/staff-profile">
          <FaUser />
        </Link>
      </div>
      <br />
      <hr />
    </header>
  )
}
