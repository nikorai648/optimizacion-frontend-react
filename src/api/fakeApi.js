// src/api/fakeApi.js
import { API_URL } from "./config";

// 🔹 Login REAL contra Django /api/token/
export async function login(username, password) {
  const res = await fetch(`${API_URL}/api/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Credenciales inválidas");
  }

  const data = await res.json(); // { token: "..." }

  return {
    token: data.token,
    username,
  };
}
