import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../api/client";

export default function Register() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 shadow-lg bg-white rounded-xl"
    >
      <h2 className="text-2xl font-bold mb-4">{t("register")}</h2>
      <input
        type="text"
        placeholder={t("username")}
        className="border p-2 w-full mb-3 rounded"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="email"
        placeholder={t("email")}
        className="border p-2 w-full mb-3 rounded"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder={t("password")}
        className="border p-2 w-full mb-3 rounded"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded">
        {t("register")}
      </button>
    </form>
  );
}
