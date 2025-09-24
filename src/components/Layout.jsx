import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import AppBar from "./AppBar";
import { Suspense } from "react";

function Layout() {
  return (
    <div>
      <AppBar />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
}

export default Layout;
