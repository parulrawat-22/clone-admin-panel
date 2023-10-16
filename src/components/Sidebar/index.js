import { sidebarData } from "../../helper/utility";
import "./style.css";

const Sidebar = () => {
  return (
    <div className="sidebar__content_container">
      <img className="" src="" alt="" />
      {sidebarData.map((sidedata, index) => {
        return <div></div>;
      })}
    </div>
  );
};

export default Sidebar;
