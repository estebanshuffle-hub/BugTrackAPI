import { Link } from "react-router-dom";

function BugCard({ bug }) {
  const priorityClass =
    bug.priority?.toLowerCase() || "medium";

  const statusClass =
    bug.status?.toLowerCase().replace(" ", "-") || "open";

  return (
    <div className="bug-card">
      <div className="bug-card-header">
        <h3>{bug.title}</h3>

        <span className={`priority ${priorityClass}`}>
          {bug.priority}
        </span>
      </div>

      <p>{bug.description}</p>

      <div className="bug-card-footer">
        <span className={`status ${statusClass}`}>
          {bug.status}
        </span>

        <Link to={`/bugs/${bug.id}`}>
          Ver detalles
        </Link>
      </div>
    </div>
  );
}

export default BugCard;