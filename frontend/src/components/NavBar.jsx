import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <div className="navBar">
        <Link to="/">
          <h2>¡Cloze Encounters!</h2>
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
