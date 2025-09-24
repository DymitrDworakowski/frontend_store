import { NavLink } from "react-router-dom";
import style from './AuthNav.module.css';

function AuthNav() {
  return (
    <div className={style.authNav}>
      <NavLink to="/register" className={style.link}>Register</NavLink>
      <NavLink to="/login" className={style.link}>Log In</NavLink>
    </div>
  );
}

export default AuthNav;
