import React from "react";

function AboutUs() {
  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1>About This Store</h1>

      <section>
        <h2>Overview</h2>
        <p>
          This is a small e‑commerce frontend built with React. It provides a
          product catalog, product details, shopping cart, user authentication,
          an admin panel for managing products, and a comments feature on
          products. The UI uses modular CSS and a set of reusable components.
        </p>
      </section>

      <section>
        <h2>Main features</h2>
        <ul>
          <li>Product listing with pagination and search</li>
          <li>Product details view</li>
          <li>Add to cart and remove from cart</li>
          <li>User registration and login (token stored in localStorage)</li>
          <li>Admin product management (add / edit / delete)</li>
          <li>Product comments with posting capability</li>
        </ul>
      </section>

      <section>
        <h2>Technology stack</h2>
        <ul>
          <li>React (Create React App)</li>
          <li>react-router-dom v6 for routing</li>
          <li>@tanstack/react-query for server state and data fetching</li>
          <li>axios as the centralized HTTP client</li>
          <li>SVGR (import SVGs as React components) for icons</li>
          <li>react-toastify for non-blocking notifications (toasts)</li>
          <li>LightRays WebGL background (custom shader powered by ogl)</li>
          <li>CSS Modules for component-scoped styles</li>
          <li>LocalStorage + a small auth hook for simple auth state</li>
        </ul>
      </section>

      <section>
        <h2>How to run</h2>
        <p>
          Install dependencies and start the dev server from the project root:
        </p>
        <pre style={{ background: "#f6f8fa", padding: 12, borderRadius: 6 }}>
          <code>npm install{"\n"}npm start</code>
        </pre>
      </section>

      <section>
        <h2>Notes & next steps</h2>
        <ul>
          <li>
            Icons are centralized under <code>src/assets/svg</code> and re-exported
            from <code>src/assets/icons</code> for convenience.
          </li>
          <li>
            The app now uses <strong>react-toastify</strong> for notifications.
            The global `ToastContainer` is mounted in <code>src/index.js</code>.
            Use <code>toast.success()</code> and <code>toast.error()</code> in
            components to inform users without blocking the UI.
          </li>
          <li>
            The Products page includes an optional WebGL background component
            <code>LightRays</code> (see <code>src/components/LightRays.jsx</code>).
            It runs only when the component is visible and is pointer-events free
            so it won't block interactions. Consider disabling it on mobile to
            save battery/GPU.
          </li>
          <li>
            Consider adding an axios interceptor in <code>src/api/client.js</code>
            to automatically attach the token from <code>localStorage</code> if
            you want to avoid passing the token manually to every API call.
          </li>
        </ul>
      </section>
    </main>
  );
}

export default AboutUs;
