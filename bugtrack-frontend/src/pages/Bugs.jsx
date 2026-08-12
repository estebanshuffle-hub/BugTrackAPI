import { useEffect, useState } from "react";

import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BugCard from "../components/BugCard";

function Bugs() {
  const [bugs, setBugs] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
  });

  useEffect(() => {
    loadBugs();
  }, []);

  const loadBugs = async () => {
    try {
      const response = await api.get("/Bugs");
      setBugs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createBug = async (e) => {
    e.preventDefault();

    try {
      await api.post("/Bugs", form);

      setForm({
        title: "",
        description: "",
        priority: "Medium",
      });

      setShowForm(false);

      loadBugs();
    } catch (error) {
      console.error(error);
      alert("No se pudo crear el bug.");
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-area">
        <Navbar />

        <main className="page-content">
          <div className="page-header">
            <div>
              <h1>Bugs</h1>
              <p>Administra todas las incidencias del proyecto.</p>
            </div>

            <button
              className="primary-button small-button"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Cancelar" : "+ Nuevo bug"}
            </button>
          </div>

          {showForm && (
            <form className="bug-form" onSubmit={createBug}>
              <div className="form-group">
                <label>Título</label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Descripción</label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Prioridad</label>

                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <button className="primary-button" type="submit">
                Crear bug
              </button>
            </form>
          )}

          {bugs.length === 0 ? (
            <div className="empty-state">
              No hay bugs registrados.
            </div>
          ) : (
            <div className="bugs-grid">
              {bugs.map((bug) => (
                <BugCard key={bug.id} bug={bug} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Bugs;