import React from "react";
import { Link, NavLink } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
    return (
      <nav>
        <div className={style.container}>
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