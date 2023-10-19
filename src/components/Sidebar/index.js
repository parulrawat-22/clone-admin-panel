import { NavLink } from "react-router-dom";
import sidebarData from "../../Constant/DataComponent";
import "./style.css";

const Sidebar = () => {
  return (
    <div className="sidebar__content_container">
      <img className="" src="" alt="" />
      {sidebarData.map((data, index) => {
        return (
          <div className="sidebar__content" key={index}>
            <p className="sidebar__icon">{data.icon}</p>
            <NavLink
              className="sidebar__data"
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? "white" : "",
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "black" : "",
                };
              }}
              x
              to={data.link}
            >
              {data.label}
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
