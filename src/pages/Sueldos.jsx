import { useEffect, useState } from "react";
import { getSueldos, deleteSueldo } from "../api/sueldos";

export default function Sueldos() {
  const [sueldos, setSueldos] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargar = async () => {
    try {
      setLoading(true);
      const data = await getSueldos();
      setSueldos(data);
    } catch (err) {
      console.error(err);
      alert("Error cargando sueldos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar sueldo?")) return;
    try {
      await deleteSueldo(id);
      await cargar(); // refresca lista
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Sueldos</h2>

      <ul>
        {sueldos.map((s) => (
          <li key={s.id}>
            {s.trabajador_nombre} - {s.mes} - ${s.sueldo_total_mes}
            <button onClick={() => handleDelete(s.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
