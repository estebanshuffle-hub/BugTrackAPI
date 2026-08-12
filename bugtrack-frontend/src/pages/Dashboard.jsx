import { useEffect, useState } from "react";

import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BugCard from "../components/BugCard";

function Dashboard() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBugs();
  }, []);

  const loadBugs = async () => {
    try {
      const response = await api.get("/Bugs");
      setBugs(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openBugs = bugs.filter(
    (bug) => bug.status === "Open"
  ).length;

  const inProgressBugs = bugs.filter(
    (bug) => bug.status === "In Progress"
  ).length;

  const closedBugs = bugs.filter(
    (bug) => bug.status === "Closed"
  ).length;

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-area">
        <Navbar />

        <main className="page-content">
          <div className="page-header">
            <div>
              <h1>Dashboard</h1>
              <p>Resumen general de tus incidencias.</p>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <span>Total</span>
              <strong>{bugs.length}</strong>
            </div>

            <div className="stat-card">
              <span>Abiertos</span>
              <strong>{openBugs}</strong>
            </div>

            <div className="stat-card">
              <span>En progreso</span>
              <strong>{inProgressBugs}</strong>
            </div>

            <div className="stat-card">
              <span>Cerrados</span>
              <strong>{closedBugs}</strong>
            </div>
          </div>

          <section className="dashboard-section">
            <h2>Bugs recientes</h2>

            {loading ? (
              <p>Cargando...</p>
            ) : bugs.length === 0 ? (
              <div className="empty-state">
                No hay bugs registrados todavía.
              </div>
            ) : (
              <div className="bugs-grid">
                {bugs.slice(0, 6).map((bug) => (
                  <BugCard key={bug.id} bug={bug} />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;