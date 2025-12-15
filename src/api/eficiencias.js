import { api } from "./client";

export async function getEficiencias() {
  const res = await api.get("/api/eficiencias/");
  return res.data;
}

export async function getEficiencia(id) {
  const res = await api.get(`/api/eficiencias/${id}/`);
  return res.data;
}

export async function createEficiencia(data) {
  try {
    const res = await api.post("/api/eficiencias/", data);
    return res.data;
  } catch (err) {
    const detail = err?.response?.data;
    console.error("Error creación eficiencia:", detail);
    throw new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
  }
}

export async function updateEficiencia(id, data) {
  try {
    const res = await api.put(`/api/eficiencias/${id}/`, data);
    return res.data;
  } catch (err) {
    const detail = err?.response?.data;
    console.error("Error actualización eficiencia:", detail);
    throw new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
  }
}

export async function deleteEficiencia(id) {
  await api.delete(`/api/eficiencias/${id}/`);
  return true;
}
