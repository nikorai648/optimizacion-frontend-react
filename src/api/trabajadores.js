// src/api/trabajadores.js
import { API_URL, getAuthHeaders } from "./config";

// 🔹 Obtener lista de trabajadores
export async function getTrabajadores() {
  const res = await fetch(`${API_URL}/api/trabajadores/`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error("Error al cargar trabajadores");
  }
  return res.json();
}

// 🔹 Obtener UN trabajador por id (👉 ESTA ES LA NUEVA)
export async function getTrabajador(id) {
  const res = await fetch(`${API_URL}/api/trabajadores/${id}/`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error("Error al cargar el trabajador");
  }
  return res.json();
}

// 🔹 Crear trabajador
export async function createTrabajador(data) {
  const res = await fetch(`${API_URL}/api/trabajadores/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error("Error creación:", errorData);
    throw new Error("Error al crear trabajador");
  }
  return res.json();
}

// 🔹 Actualizar trabajador
export async function updateTrabajador(id, data) {
  const res = await fetch(`${API_URL}/api/trabajadores/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error("Error actualización:", errorData);
    throw new Error("Error al actualizar trabajador");
  }
  return res.json();
}

// 🔹 Eliminar trabajador
export async function deleteTrabajador(id) {
  const res = await fetch(`${API_URL}/api/trabajadores/${id}/`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error("Error al eliminar trabajador");
  }
  return true;
}
