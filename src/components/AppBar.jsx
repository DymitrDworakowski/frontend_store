import useAuth from "../hooks/useAuth";
import { NavLink } from "react-router-dom";
import UserMenu from "./UserMenu";
import AuthNav from "./AuthNav";


function AppBar() {
  const { isAuthenticated } = useAuth();

  return (
    <header>
      <NavLink to="/">Home</NavLink>
      {isAuthenticated ? <UserMenu /> : <AuthNav />}
    </header>
  );
}
export default AppBar;
