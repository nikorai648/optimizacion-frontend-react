import { api } from "./client";

export async function getAsistencias() {
  const res = await api.get("/api/asistencias/");
  return res.data;
}

export async function getAsistencia(id) {
  const res = await api.get(`/api/asistencias/${id}/`);
  return res.data;
}

export async function createAsistencia(data) {
  try {
    const res = await api.post("/api/asistencias/", data);
    return res.data;
  } catch (err) {
    const detail = err?.response?.data;
    throw new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
  }
}

export async function updateAsistencia(id, data) {
  try {
    const res = await api.put(`/api/asistencias/${id}/`, data);
    return res.data;
  } catch (err) {
    const detail = err?.response?.data;
    throw new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
  }
}

export async function deleteAsistencia(id) {
  await api.delete(`/api/asistencias/${id}/`);
  return true;
}
