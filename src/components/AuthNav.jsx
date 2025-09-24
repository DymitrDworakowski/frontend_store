import { NavLink } from "react-router-dom";

function AuthNav() {
  return (
    <div className="bg-red-500 text-white p-4">
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Log In</NavLink>
    </div>
  );
}

export default AuthNav;
