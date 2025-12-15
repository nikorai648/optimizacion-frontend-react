import { api } from "./client";

export async function getAccidentes() {
  const res = await api.get("/api/accidentes/");
  return res.data;
}

export async function getAccidente(id) {
  const res = await api.get(`/api/accidentes/${id}/`);
  return res.data;
}

export async function createAccidente(data) {
  try {
    const res = await api.post("/api/accidentes/", data);
    return res.data;
  } catch (err) {
    const detail = err?.response?.data;
    throw new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
  }
}

export async function updateAccidente(id, data) {
  try {
    const res = await api.put(`/api/accidentes/${id}/`, data);
    return res.data;
  } catch (err) {
    const detail = err?.response?.data;
    throw new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
  }
}

export async function deleteAccidente(id) {
  await api.delete(`/api/accidentes/${id}/`);
  return true;
}
