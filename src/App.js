import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AdminLogin from "./components/AdminLogin";
import ProductDetails from "./components/ProductDetails";

const Products = lazy(() => import("./pages/Products"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const Cart = lazy(() => import("./pages/Cart"));


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Products />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/panel" element={<AdminPanel />} />
          <Route path="*" element={<p>Page Not Found</p>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
