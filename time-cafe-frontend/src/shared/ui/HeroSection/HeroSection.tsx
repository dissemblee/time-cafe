import styles from "./HeroSection.module.scss"

export const HeroSection = ({ title, description }: { title: string; description: string }) => {
  return(
    <section className={styles.HeroSection}>
      <h1 className={styles.HeroSection__title}>{title}</h1>
      <p className={styles.HeroSection__description}>
        {description}
      </p>
    </section>
  )
}
