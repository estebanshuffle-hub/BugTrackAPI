import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        <span className="sidebar-logo">BT</span>
        <span>BugTrack</span>
      </div>

      <nav>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/bugs"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Bugs
        </NavLink>
      </nav>

      <button className="logout-button" onClick={logout}>
        Cerrar sesión
      </button>
    </aside>
  );
}

export default Sidebar;