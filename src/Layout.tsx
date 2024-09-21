import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const Layout = () => {
  return (
    <div>
      {/* Render the Header component for consistent navigation across pages */}
      <Header />
      <main>
        {/* Render child routes inside this layout */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
