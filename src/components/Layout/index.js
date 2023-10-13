import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import "./style.css";

const Layout = ({ children }) => {
  return (
    <div className="layout__container">
      <Sidebar />

      <div className="layout__nav__content">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
