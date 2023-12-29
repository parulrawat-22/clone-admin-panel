import { useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import "./style.css";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="layout__container">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div
        className={`layout__nav__content ${isSidebarOpen ? "open" : "close"}`}
      >
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
