import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <div className="navBar">
        <Link to="/">
          <h2>¡Cloze Encounters!</h2>
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/">Sign-up</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default NavBar;
