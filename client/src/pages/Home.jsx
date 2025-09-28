import React from "react";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return (
    <div style={{ padding: "20px" }}>
      <h1>{t("welcome")}</h1>
      <p>
        🚜 This platform helps farmers simulate decisions like irrigation,
        fertilization, and pesticide use — powered by NASA data.
      </p>
    </div>
  );
}
