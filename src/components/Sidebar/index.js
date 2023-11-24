import { NavLink } from "react-router-dom";
import sidebarData from "../../Constant/DataComponent";
import { handleNavLinkClassName } from "../../helpers/sidebarHelpers";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import "./style.css";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div
      className={`sidebar__content_container ${
        isSidebarOpen ? "contentOpen" : "contentClose"
      }`}
    >
      <HiOutlineMenuAlt1
        className="sidebar__menu__icon"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      {sidebarData.map((data, index) => {
        return (
          <div
            style={{ paddingLeft: `${isSidebarOpen ? "3rem" : "1.9rem"}` }}
            className="sidebar__content"
            key={index}
          >
            <p className="sidebar__icon">{data.icon}</p>
            <NavLink className={handleNavLinkClassName} to={data.link}>
              {data.label}
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
