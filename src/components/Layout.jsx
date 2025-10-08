import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import AppBar from "./AppBar";
import { Suspense } from "react";
import Loader from "./Loader";

function Layout() {
  return (
    <div>
      <AppBar />
      <Suspense fallback={<Loader center />}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
}

export default Layout;
