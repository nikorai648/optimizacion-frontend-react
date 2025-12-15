import { api } from "./client";

// LISTAR
export const getSueldos = async () => {
  const { data } = await api.get("/api/sueldos/");
  return data;
};

// OBTENER POR ID
export const getSueldoById = async (id: number) => {
  const { data } = await api.get(`/api/sueldos/${id}/`);
  return data;
};

// CREAR (POST)
export const createSueldo = async (payload: any) => {
  const { data } = await api.post("/api/sueldos/", payload);
  return data;
};

// ACTUALIZAR (PUT)
export const updateSueldo = async (id: number, payload: any) => {
  const { data } = await api.put(`/api/sueldos/${id}/`, payload);
  return data;
};

// ELIMINAR (DELETE)
export const deleteSueldo = async (id: number) => {
  await api.delete(`/api/sueldos/${id}/`);
};
