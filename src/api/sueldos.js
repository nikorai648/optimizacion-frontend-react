import { api } from "./client";

export async function getSueldos() {
  const res = await api.get("/api/sueldos/");
  return res.data;
}

export async function getSueldo(id) {
  const res = await api.get(`/api/sueldos/${id}/`);
  return res.data;
}

export async function createSueldo(data) {
  try {
    const res = await api.post("/api/sueldos/", data);
    return res.data;
  } catch (err) {
    const detail = err?.response?.data;
    console.error("Error creación sueldo:", detail);
    throw new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
  }
}

export async function updateSueldo(id, data) {
  try {
    const res = await api.put(`/api/sueldos/${id}/`, data);
    return res.data;
  } catch (err) {
    const detail = err?.response?.data;
    console.error("Error actualización sueldo:", detail);
    throw new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
  }
}

export async function deleteSueldo(id) {
  await api.delete(`/api/sueldos/${id}/`);
  return true;
}
