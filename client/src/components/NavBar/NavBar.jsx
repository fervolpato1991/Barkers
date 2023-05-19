import React from "react";
import style from "./NavBar.module.css";

const NavBar = () => {
    return (
    <nav>
        <div className={style.container}>
            <form action="/home" >
                <input type="submit" value="Home" className={style.button}/>
            </form>
            <form action="/formPage" >
                <input type="submit" value="Make a new dog!" className={style.button}/>
            </form>
            <form action="/" >
                <input type="submit" value="Log out" className={style.button}/>
            </form>
        </div>
    </nav>
    )
};

export default NavBar