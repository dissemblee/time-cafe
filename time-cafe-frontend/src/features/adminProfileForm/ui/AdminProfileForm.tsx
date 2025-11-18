"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useForm } from "@/shared/hooks/useForm";
import { useGetClientQuery } from "@/entities/client";
import { useGetUserQuery, useUpdateUserMutation } from "@/entities/user";
import styles from "./AdminProfileForm.module.scss"
import { Input } from "@/shared/ui/Inputs";
import { AdminButton } from "@/shared/ui/AdminButton";
import { useUpdateStaffMutation } from "@/entities/staff";

export const AdminProfileForm = () => {
  const params = useParams();
  const idParam = params?.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;
  const userId = Number(id);

  const { data: clientData } = useGetClientQuery(userId);
  const [updateClient, { isLoading: isClientLoading }] = useUpdateStaffMutation();

  // @ts-ignore
  const { data: userData } = useGetUserQuery(clientData?.user_id);
  const [updateUser, { isLoading: isUserLoading  }] = useUpdateUserMutation();

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
    bank_number: "",
  });

  useEffect(() => {
    if (clientData) {
      setClientForm({
        name: clientData.name,
        phone: clientData.phone ?? "",
        bank_number: clientData.bank_number ?? "",
      });
    }
  }, [clientData, setClientForm]);

  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...clientForm,
    };
    await updateClient({ id: clientData!.id, data: payload });
  };

  return (
    <section>
      <form onSubmit={handleUserSubmit} className={styles.AdminProfileForm}>
        <h2>Данные для входа</h2>
        <Input
          label="Логин"
          name="login"
          value={userForm.login}
          onChange={handleUserChange}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={userForm.email}
          onChange={handleUserChange}
          required
        />
        <AdminButton type="submit">{isUserLoading ? "Сохранение..." : "Сохранить"}</AdminButton>
      </form>
      <br />
      <form onSubmit={handleClientSubmit} className={styles.AdminProfileForm}>
        <h2>Персональные данные</h2>
        <Input
          label="Имя"
          name="name"
          value={clientForm.name}
          onChange={handleClientChange}
          required
        />
        <Input
          label="Телефон"
          name="phone"
          value={clientForm.phone}
          onChange={handleClientChange}
        />
        <AdminButton type="submit">{isClientLoading ? "Сохранение..." : "Сохранить"}</AdminButton>
      </form>
    </section>
  );
};
