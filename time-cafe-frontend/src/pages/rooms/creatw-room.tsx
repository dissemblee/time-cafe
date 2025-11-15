"use client";
import { useCreateRoomMutation } from "@/entities/room";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    smoking_allowed: false,
    description: "",
    features: [""],
    min_price: 0
  });

  const [createRoom, { isLoading, error }] = useCreateRoomMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "select-one" ? value === "true" : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const room = await createRoom(formData).unwrap();
      console.log("Создана комната:", room, "Id комнаты:", room.id);
      // router.push(`/room-builder/${room.id}`);
    } catch (err) {
      console.error("Ошибка при создании комнаты:", err);
    }
  };

  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-xl mb-4">Создание комнаты</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-64">
        <input
          type="text"
          name="name"
          placeholder="Название комнаты"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="type"
          placeholder="Тип комнаты"
          value={formData.type}
          onChange={handleChange}
          required
        />

        <label htmlFor="smoking">Курение</label>
        <select
          id="smoking"
          name="smoking_allowed"
          value={formData.smoking_allowed.toString()}
          onChange={handleChange}
        >
          <option value="true">Можно</option>
          <option value="false">Нельзя</option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Создаётся..." : "Создать новую комнату"}
        </button>

        {error && <p className="text-red-500 text-sm">Ошибка при создании комнаты</p>}
      </form>

    </main>
  );
}
