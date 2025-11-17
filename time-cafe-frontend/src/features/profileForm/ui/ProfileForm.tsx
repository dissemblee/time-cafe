"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useForm } from "@/shared/hooks/useForm";
import { useGetClientQuery, useUpdateClientMutation } from "@/entities/client";
import type { ClientStatus } from "@/entities/client";
import { useGetUserQuery, useUpdateUserMutation } from "@/entities/user";
import { GlassInput } from "@/shared/ui/GlassInput";
import { LiquidButton } from "@/shared/ui/LiquidButton";
import { UserBookings } from "@/features/bookings";
import styles from "./ProfileForm.module.scss"

export const ProfileForm = () => {
  const params = useParams();
  const idParam = params?.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;
  const userId = Number(id);

  const { data: clientData } = useGetClientQuery(userId);
  const [updateClient] = useUpdateClientMutation();

  // @ts-ignore
  const { data: userData } = useGetUserQuery(clientData?.user_id);
  const [updateUser] = useUpdateUserMutation();

  const { formData: userForm, handleChange: handleUserChange, setFormData: setUserForm } = useForm({
    login: "",
    email: "",
  });

  useEffect(() => {
    if (userData) {
      setUserForm({
        login: userData.login,
        email: userData.email,
      });
    }
  }, [userData, setUserForm]);

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser({ id: userId, data: userForm });
  };

  const { formData: clientForm, handleChange: handleClientChange, setFormData: setClientForm } = useForm({
    name: "",
    phone: "",
    note: "",
    bank_number: "",
    discount_percent: 0,
    status: "active",
    date_of_birth: "",
  });

  useEffect(() => {
    if (clientData) {
      setClientForm({
        name: clientData.name,
        phone: clientData.phone ?? "",
        note: clientData.note ?? "",
        bank_number: clientData.bank_number ?? "",
        discount_percent: clientData.discount_percent ?? 0,
        status: clientData.status,
        date_of_birth: clientData.date_of_birth ?? "",
      });
    }
  }, [clientData, setClientForm]);

  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...clientForm,
      status: clientForm.status as ClientStatus,
    };
    await updateClient({ id: clientData!.id, data: payload });
  };

  return (
    <section>
      <form onSubmit={handleUserSubmit} className={styles.ProfileForm}>
        <h2 className={styles.ProfileForm__Title}>Данные для входа</h2>
        <GlassInput
          label="Логин"
          name="login"
          value={userForm.login}
          onChange={handleUserChange}
          required
        />
        <GlassInput
          label="Email"
          name="email"
          type="email"
          value={userForm.email}
          onChange={handleUserChange}
          required
        />
        <LiquidButton type="submit">Сохранить</LiquidButton>
      </form>
      <br />
      <form onSubmit={handleClientSubmit} className={styles.ProfileForm}>
        <h2 className={styles.ProfileForm__Title}>Персональные данные</h2>
        <GlassInput
          label="Имя"
          name="name"
          value={clientForm.name}
          onChange={handleClientChange}
          required
        />
        <GlassInput
          label="Телефон"
          name="phone"
          value={clientForm.phone}
          onChange={handleClientChange}
        />
        <GlassInput
          label="Банковский счет"
          name="bank_number"
          value={clientForm.bank_number}
          onChange={handleClientChange}
        />
        <GlassInput
          label="Дата рождения"
          name="date_of_birth"
          type="date"
          value={clientForm.date_of_birth}
          onChange={handleClientChange}
        />
        <LiquidButton type="submit">Сохранить</LiquidButton>
      </form>
      <UserBookings />
    </section>
  );
};