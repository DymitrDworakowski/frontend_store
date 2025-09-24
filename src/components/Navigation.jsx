import { NavLink } from "react-router-dom";
import  useAuth  from "../hooks/useAuth";

function Navigation() {
  const { isAuthenticated } = useAuth();

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      {isAuthenticated && <NavLink to="/products">Products</NavLink>}
    </nav>
  );
}

export default Navigation;
