import { NavLink } from "react-router-dom";
import sidebarData from "../../Constant/DataComponent";
import { handleNavLinkClassName } from "../../helpers/sidebarHelpers";
import "./style.css";

const Sidebar = () => {
  return (
    <div className="sidebar__content_container">
      <img className="" src="" alt="" />
      {sidebarData.map((data, index) => {
        return (
          <div className="sidebar__content" key={index}>
            <p className="sidebar__icon">{data.icon}</p>
            <NavLink className={handleNavLinkClassName} to={data.link}>
              {data.label}
            </NavLink>

            {/* {data?.subCategory?.map((index, data) => (
              <NavLink to={data.link}>{data.label}</NavLink>
            ))} */}
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
