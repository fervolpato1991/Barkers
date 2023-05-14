import React from "react";
import style from "./NavBar.module.css";
import {Link} from "react-router-dom";

const NavBar = () => {
    return (
    <nav className={style.container}>
        <div>
            <button><Link to={'/home'}>Home</Link></button>
            <button><Link to={'/formPage'}>Make a new dog</Link></button>
            <button><Link to={'/'}>Disconnect</Link></button>
        </div>
    </nav>
    )
};

export default NavBar