import { NavLink } from "react-router-dom";
import { handleNavLinkClassName } from "../../helpers/sidebarHelpers";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import "./style.css";
import { useSidebar } from "../../base/Context/sidebarProvider";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const sidebarProvider = useSidebar();
  return (
    <div
      className={`sidebar__content_container ${
        isSidebarOpen ? "contentOpen" : "contentClose"
      }`}
    >
      <div className="sidebar_box">
        <HiOutlineMenuAlt1
          className="sidebar__menu__icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        {sidebarProvider?.sidebarContent.map((data, index) => {
          return (
            <div
              style={{ paddingLeft: `${isSidebarOpen ? "3rem" : "1.9rem"}` }}
              className="sidebar__content"
              key={index}
            >
              <img
                src={data.icon}
                alt="sidebar icon"
                className="sidebar__icon"
              />

              <NavLink className={handleNavLinkClassName} to={data.link}>
                {data.label}
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
