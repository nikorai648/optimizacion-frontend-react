// src/api/auth.js
import { API_URL } from "./config";

export async function loginApi(username, password) {
  const res = await fetch(`${API_URL}/api/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || "Credenciales inválidas");
  }

  return res.json(); // { token: "..." }
}
