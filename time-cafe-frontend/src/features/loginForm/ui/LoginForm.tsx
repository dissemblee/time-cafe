"use client";
import { GlassInput } from "@/shared/ui/GlassInput";
import { LiquidButton } from "@/shared/ui/LiquidButton/LiquidButton";
import { useForm } from "@/shared/hooks/useForm";
import styles from "./LoginForm.module.scss";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useRouter } from "next/navigation";
import { setCookie } from 'cookies-next';

const initialFormData = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const router = useRouter();
  const { login, loading, error } = useAuth();
  const { formData, errors, handleChange, setErrors } = useForm(initialFormData);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: !formData.email ? "Email обязателен" : "",
      password: !formData.password ? "Пароль обязателен" : "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((e) => e !== "")) return;

    try {
      const response = await login({
        email: formData.email,
        password: formData.password
      });

      // @ts-ignore
      setCookie("user_token", response?.token);
      // @ts-ignore
      router.push('/');
    } catch (err: any) {
      console.error("Ошибка при входе:", err);
    }
  };

  return (
    <form onSubmit={handleLogin} className={styles.LoginForm}>
      <GlassInput
        label="Email"
        name="email"
        value={formData.email}
        error={errors.email}
        onChange={handleChange}
        type="email"
        required
      />

      <GlassInput
        label="Пароль"
        name="password"
        value={formData.password}
        error={errors.password}
        onChange={handleChange}
        type="password"
        required
      />

      {error && <div className={styles.LoginForm__error}>{error}</div>}

      <LiquidButton variant="primary" type="submit" disabled={loading}>
        <span>{loading ? "Вход..." : "Войти"}</span>
      </LiquidButton>
    </form>
  );
};
