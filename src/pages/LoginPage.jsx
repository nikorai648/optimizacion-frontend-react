import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../api/auth";   
import { AuthContext } from "../App";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Usuario y contraseña son obligatorios.");
      return;
    }

    try {
      const data = await loginApi(username, password); 
      login(data.token, username);                     
      navigate("/");                                 
    } catch (err) {
      setError("Credenciales inválidas o API no disponible.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="col-md-4">
        <h3>Ingreso (API Django)</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

           <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

           <button className="btn btn-primary w-100">Entrar</button>
        </form>
      </div>
    </div>
  );
}