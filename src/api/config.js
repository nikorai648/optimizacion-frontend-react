// src/api/config.js
export const API_URL = 'http://127.0.0.1:8000';

export function getAuthHeaders() {
  const token = localStorage.getItem('token');
  if (!token) return {};

  return {
    Authorization: `Token ${token}`,
  };
}
