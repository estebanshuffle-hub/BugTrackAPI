import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function BugDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bug, setBug] = useState(null);

  const [comment, setComment] = useState("");

  useEffect(() => {
    loadBug();
  }, [id]);

  const loadBug = async () => {
    try {
      const response = await api.get(`/Bugs/${id}`);
      setBug(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const changeStatus = async (status) => {
    try {
      await api.put(`/Bugs/${id}`, {
        status,
      });

      loadBug();
    } catch (error) {
      console.error(error);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    try {
      await api.post(`/bugs/${id}/comments`, {
        content: comment,
      });

      setComment("");

      loadBug();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBug = async () => {
    const confirmed = window.confirm(
      "¿Seguro que quieres eliminar este bug?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/Bugs/${id}`);
      navigate("/bugs");
    } catch (error) {
      console.error(error);
    }
  };

  if (!bug) {
    return (
      <div className="loading-screen">
        Cargando bug...
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-area">
        <Navbar />

        <main className="page-content">
          <button
            className="back-button"
            onClick={() => navigate("/bugs")}
          >
            ← Volver
          </button>

          <div className="bug-details-card">
            <div className="bug-details-header">
              <div>
                <span className="bug-id">
                  BUG #{bug.id}
                </span>

                <h1>{bug.title}</h1>
              </div>

              <span
                className={`priority ${
                  bug.priority?.toLowerCase() || "medium"
                }`}
              >
                {bug.priority}
              </span>
            </div>

            <p className="bug-description">
              {bug.description}
            </p>

            <div className="bug-info-grid">
              <div>
                <span>Estado</span>
                <strong>{bug.status}</strong>
              </div>

              <div>
                <span>Prioridad</span>
                <strong>{bug.priority}</strong>
              </div>

              <div>
                <span>Creado por</span>
                <strong>
                  {bug.createdBy?.name || "Usuario"}
                </strong>
              </div>
            </div>

            <div className="status-actions">
              <button
                onClick={() => changeStatus("Open")}
              >
                Open
              </button>

              <button
                onClick={() =>
                  changeStatus("In Progress")
                }
              >
                In Progress
              </button>

              <button
                onClick={() => changeStatus("Closed")}
              >
                Closed
              </button>

              <button
                className="danger-button"
                onClick={deleteBug}
              >
                Eliminar
              </button>
            </div>
          </div>

          <section className="comments-section">
            <h2>Comentarios</h2>

            <form onSubmit={addComment}>
              <textarea
                placeholder="Escribe un comentario..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <button
                className="primary-button small-button"
                type="submit"
              >
                Comentar
              </button>
            </form>

            <div className="comments-list">
              {bug.comments?.length === 0 && (
                <p>No hay comentarios todavía.</p>
              )}

              {bug.comments?.map((item) => (
                <div
                  className="comment-card"
                  key={item.id}
                >
                  <strong>
                    {item.user?.name || "Usuario"}
                  </strong>

                  <p>{item.content}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default BugDetails;