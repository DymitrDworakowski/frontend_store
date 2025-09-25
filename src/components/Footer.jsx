import style from "./Footer.module.css";
import AdminLogin from "./AdminLogin";
import { NavLink } from "react-router-dom";
function Footer() {
  return (
    <footer className={style.footer}>
      <p>© 2024 My Store. All rights reserved.</p>
      <nav className={style.nav}>
        <NavLink to="/about" className={style.link}>
          About Us
        </NavLink>
        <NavLink to="/contact" className={style.link}>
          Contact
        </NavLink>
        <NavLink to="/admin/login" className={style.link} component={AdminLogin}>
          Admin
        </NavLink>
      </nav>
    </footer>
  );
}
export default Footer;
