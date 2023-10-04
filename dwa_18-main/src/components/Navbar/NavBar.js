import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>
          SpeakP<i className="fi fi-rr-beacon"></i>d
        </div>
      </Link>
      <nav>
        <Link to="/favorites">Favorites</Link>
      </nav>
    </header>
  );
};

export default Navbar;
