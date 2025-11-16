import { RegistrationForm } from "@/features/registrationForm"
import styles from "./RegistrationSection.module.scss"
import Link from "next/link"

export const RegistrationSection = () => {
  return (
    <section className={styles.RegistrationSection}>
      <h2 className={styles.RegistrationSection__Title}>Регистрация</h2>
      <RegistrationForm />
      <br />
      <br />
      <Link href="/login">Уже есть аккаунт? Войти</Link>
    </section>
  )
}