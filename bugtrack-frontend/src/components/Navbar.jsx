function Navbar() {
  const name = localStorage.getItem("name") || "Usuario";

  return (
    <header className="navbar">
      <div>
        <h2>BugTrack</h2>
      </div>

      <div className="navbar-user">
        <span>{name}</span>

        <div className="avatar">
          {name.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}

export default Navbar;