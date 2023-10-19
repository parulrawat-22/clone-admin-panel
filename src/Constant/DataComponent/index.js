import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import "./style.css";
import { AiOutlinePicCenter } from "react-icons/ai";

const sidebarData = [
  {
    label: "Dashboard",
    link: "/dashboard",
    icon: <MdSpaceDashboard />,
  },
  {
    label: "All Users",
    link: "/users",
    icon: <FaUsers />,
  },
  {
    label: "All Hosts",
    link: "/hosts",
    icon: <FaUsers />,
  },
  {
    label: "Banner",
    link: "/banner",
    icon: <AiOutlinePicCenter />,
  },
];

export default sidebarData;
