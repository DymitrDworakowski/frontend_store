import style from "./Footer.module.css";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className={style.footer}>
      <p>© 2025 My Store. All rights reserved.</p>
      <p>Created by Dymitr Dworakowski</p>
      <nav className={style.nav}>
        <NavLink 
          to="/about" 
          className={({ isActive }) => 
            isActive ? `${style.link} ${style.active}` : style.link
          }
        >
          About Us
        </NavLink>
        <NavLink 
          to="/contact" 
          className={({ isActive }) => 
            isActive ? `${style.link} ${style.active}` : style.link
          }
        >
          Contact
        </NavLink>
        <NavLink 
          to="/admin/login" 
          className={({ isActive }) => 
            isActive ? `${style.link} ${style.active}` : style.link
          }
        >
          Admin
        </NavLink>
      </nav>
    </footer>
  );
}

export default Footer;