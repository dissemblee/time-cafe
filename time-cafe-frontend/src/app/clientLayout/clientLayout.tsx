import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header"
import styles from "./clientLayout.module.scss"

export const ClientLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className={styles.ClientLayout__universe}>
        <div className={styles.ClientLayout__layer2}></div>
        <div className={styles.ClientLayout__layer1}></div>
        <div className={styles.ClientLayout__layer3}></div>
        
        <div className={styles.ClientLayout__bubble1}></div>
        <div className={styles.ClientLayout__bubble2}></div>
        <div className={styles.ClientLayout__bubble3}></div>
        <div className={styles.ClientLayout__bubble4}></div>
        
        <div className={styles.ClientLayout__prism1}></div>
        <div className={styles.ClientLayout__prism2}></div>
        <div className={styles.ClientLayout__prism3}></div>
      </div>

      <header className={styles.ClientLayout__container}>
        <Header />
      </header>

      <main className={styles.ClientLayout__container}>
        {children}
      </main>

      <footer className={styles.ClientLayout__container}>
        <Footer />
      </footer>
    </>
  );
};