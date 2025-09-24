import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

const Products = lazy(() => import("./pages/Products"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <>
      <div className="p-4 bg-green-500 text-white text-center">Tailwind is active ✅</div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Products />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
