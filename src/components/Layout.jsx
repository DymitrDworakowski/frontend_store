import { Outlet } from "react-router-dom";

import AppBar from "./AppBar";
import { Suspense } from "react";

function Layout() {
  return (
    <div className="flex ">
      <AppBar />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default Layout;
