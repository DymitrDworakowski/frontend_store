import useAuth from "../hooks/useAuth";
import { NavLink } from "react-router-dom";
import UserMenu from "./UserMenu";
import AuthNav from "./AuthNav";
import style from './AppBar.module.css';



function AppBar() {
  const { isAuthenticated } = useAuth();

  return (
    <header className={style.appBar}>
      <div className={style.inner}>
        <NavLink to="/" className={style.link}>Store</NavLink>
        {/* <NavLink to="/products" className={style.link}>Products</NavLink> */}
        <div className={style.spacer} />
        {isAuthenticated ? <UserMenu className={style.userMenu} /> : <AuthNav />}
      </div>
    </header>
  );
}
export default AppBar;
