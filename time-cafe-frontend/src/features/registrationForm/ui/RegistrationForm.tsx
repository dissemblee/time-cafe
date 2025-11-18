"use client";
import { GlassInput } from "@/shared/ui/GlassInput";
import { LiquidButton } from "@/shared/ui/LiquidButton/LiquidButton";
import { useForm } from "@/shared/hooks/useForm";
import styles from "./RegistrationForm.module.scss";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useRouter } from "next/navigation";
import { setCookie } from 'cookies-next';

const initialFormData = {
  login: "",
  email: "",
  password: "",
  password_confirmation: ""
};

export const RegistrationForm = () => {
  const router = useRouter();
  const { register, loading, error } = useAuth();
  const { formData, errors, handleChange, setErrors } = useForm(initialFormData);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      login: !formData.login ? "Логин обязателен" : "",
      email: !formData.email ? "Email обязателен" : "",
      password: !formData.password ? "Пароль обязателен" : "",
      password_confirmation:
        formData.password_confirmation !== formData.password
          ? "Пароли не совпадают"
          : ""
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((e) => e !== "")) return;

    try {
      const response = await register({
        login: formData.login,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation
      });

      console.log("Login successful:", response);
      
      // @ts-ignore
      setCookie("user_token", response?.token);
      // @ts-ignore
      router.push('/profile/' + response?.user?.id);
    } catch (err: any) {
      console.error("Ошибка при регистрации:", err);
    }
  };

  return (
    <form onSubmit={handleRegister} className={styles.RegistrationForm}>
      <GlassInput
        label="Логин"
        name="login"
        value={formData.login}
        error={errors.login}
        onChange={handleChange}
        required
      />

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

      <GlassInput
        label="Подтверждение пароля"
        name="password_confirmation"
        value={formData.password_confirmation}
        error={errors.password_confirmation}
        onChange={handleChange}
        type="password"
        required
      />

      {error && <div className={styles.RegistrationForm__error}>{error}</div>}

      <LiquidButton variant="primary" type="submit" disabled={loading}>
        <span>{loading ? "Регистрация..." : "Зарегистрироваться"}</span>
      </LiquidButton>
    </form>
  );
};
