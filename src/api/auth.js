// src/api/auth.js
import { api } from "./client";

export async function loginApi(username, password) {
  try {
    const res = await api.post("/api/token/", { username, password });
    return res.data; // { token: "..." }
  } catch (err) {
    const msg =
      err?.response?.data?.detail ||
      "Credenciales inválidas o API no disponible.";
    throw new Error(msg);
  }
}
