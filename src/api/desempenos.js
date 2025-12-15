import { api } from "./client";

export async function getDesempenos() {
  const res = await api.get("/api/desempenos/");
  return res.data;
}

export async function getDesempeno(id) {
  const res = await api.get(`/api/desempenos/${id}/`);
  return res.data;
}

export async function createDesempeno(data) {
  try {
    const res = await api.post("/api/desempenos/", data);
    return res.data;
  } catch (err) {
    const detail = err?.response?.data;
    console.error("Error creación desempeño:", detail);
    throw new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
  }
}

export async function updateDesempeno(id, data) {
  try {
    const res = await api.put(`/api/desempenos/${id}/`, data);
    return res.data;
  } catch (err) {
    const detail = err?.response?.data;
    console.error("Error actualización desempeño:", detail);
    throw new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
  }
}

export async function deleteDesempeno(id) {
  await api.delete(`/api/desempenos/${id}/`);
  return true;
}
