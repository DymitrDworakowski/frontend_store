import useAuth from "../hooks/useAuth";
import { NavLink } from "react-router-dom";
import UserMenu from "./UserMenu";
import AuthNav from "./AuthNav";
import style from './AppBar.module.css';



function AppBar() {
  const { isAuthenticated } = useAuth();

  return (
    <header className={style.appBar}>
      <NavLink to="/" className={style.link}>Home</NavLink>
      {isAuthenticated ? <UserMenu className={style.userMenu} /> : <AuthNav />}
    </header>
  );
}
export default AppBar;
