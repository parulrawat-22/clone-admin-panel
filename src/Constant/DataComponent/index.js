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
    label: "All Users ",
    link: "/allusers",
    icon: <FaUsers />,
  },

  {
    label: "Host Management",
    link: "/hostmanagement",
    icon: <FaUsers />,
  },

  {
    label: "Host Request",
    link: "/hostrequest",
    icon: <FaUsers />,
  },

  {
    label: "Accepted Host",
    link: "/acceptedhost",
    icon: <FaUsers />,
  },

  {
    label: "Rejected Host",
    link: "/rejectedhost",
    icon: <FaUsers />,
  },

  {
    label: "Leader",
    link: "/leader",
    icon: <FaUsers />,
  },

  {
    label: "Suspended Users",
    link: "/suspendusers",
    icon: <FaUsers />,
  },

  {
    label: "Warned Users",
    link: "/warnedusers",
    icon: <FaUsers />,
  },

  {
    label: "Banner",
    link: "/banner",
    icon: <AiOutlinePicCenter />,
  },
  {
    label: "Wallet",
    link: "/wallet",
    icon: <AiOutlinePicCenter />,
  },

  {
    label: "Report",
    link: "/report",
    icon: <AiOutlinePicCenter />,
  },

  {
    label: "Payment",
    link: "/payment",
    icon: <AiOutlinePicCenter />,
  },
  {
    label: "Gift",
    link: "/gift",
    icon: <AiOutlinePicCenter />,
  },
  {
    label: "Sticker",
    link: "/sticker",
    icon: <AiOutlinePicCenter />,
  },
  {
    label: "Moment",
    link: "/moment",
    icon: <AiOutlinePicCenter />,
  },
  {
    label: "Bucket",
    link: "/bucket",
    icon: <AiOutlinePicCenter />,
  },
  {
    label: "Feedback",
    link: "/feedback",
    icon: <AiOutlinePicCenter />,
  },
  {
    label: "Recharge",
    link: "/recharge",
    icon: <AiOutlinePicCenter />,
  },
];

export default sidebarData;
