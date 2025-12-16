# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


---

# ⚛️ README – Frontend React

📁 **Repositorio:** `optimizacion-frontend-react`

```md
# Frontend React – Optimización y Logística

Este proyecto corresponde al Frontend desarrollado en **React**, el cual consume la API REST del sistema **Optimización y Logística**.

Permite la gestión visual de trabajadores, asistencias, accidentes, eficiencia, desempeño y sueldos mediante una interfaz moderna y responsiva.

---

## 🚀 Tecnologías Utilizadas

- React 18
- Vite
- React Router DOM
- Axios
- Bootstrap 5

---

## 📌 Funcionalidades

- Login con autenticación por token
- Dashboard principal
- Gestión de Trabajadores
- Gestión de Asistencias
- Gestión de Accidentes
- Gestión de Eficiencia
- Gestión de Desempeño
- Gestión de Sueldos
- Manejo de sesiones con LocalStorage

---

## ⚙️ Instalación y Ejecución

 Clonar el repositorio:
```bash
git clone https://github.com/nikorai648/optimizacion-frontend-react.git


Instalar dependencias:

npm install


Ejecutar la aplicación:

npm run dev


La aplicación se ejecutará en:

http://localhost:5173

🔗 Conexión con la API

El frontend se conecta a la API REST mediante Axios.
La URL de la API se configura en variables de entorno:

VITE_API_URL=http://127.0.0.1:8000