import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
    return (
      <nav className={style.container}>
        <div className={style.row}>
          <Link to="/home" className={style.button}>
            Home
          </Link>
          <Link to="/formPage" className={style.button}>
            Make a new dog!
          </Link>
          <Link to="/" className={style.button}>
            Log out
          </Link>
        </div>
      </nav>
    );
  };
  
  export default NavBar;