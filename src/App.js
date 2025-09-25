import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./pages/AdminPanel";

const Products = lazy(() => import("./pages/Products"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Products />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/products" element={<AdminPanel />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
