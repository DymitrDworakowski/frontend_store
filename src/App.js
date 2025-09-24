import { lazy } from "react";

const AppBar = lazy(() => import("./components/AppBar"));
const Products = lazy(() => import("./pages/Products"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <div >
      <AppBar />
      <Products />
      <Register />
      <Login />
    </div>
  );
}

export default App;
