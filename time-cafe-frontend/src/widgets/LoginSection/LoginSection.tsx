import { LoginForm } from "@/features/loginForm"
import styles from "./LoginSection.module.scss"
import Link from "next/link"

export const LoginSection = () => {
  return (
    <section className={styles.LoginSection}>
      <h2 className={styles.LoginSection__Title}>Вход</h2>
      <LoginForm />
      <br />
      <br />
      <Link href="/registration">Нет аккаунта? Зарегистрироваться</Link>
    </section>
  )
}