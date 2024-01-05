import { createContext, useContext, useState } from "react";
import dashboard from "../../base/Assets/sidebarIcon/dashboard.png";
import user from "../../base/Assets/sidebarIcon/user.png";
import host from "../../base/Assets/sidebarIcon/host.png";
import leader from "../../base/Assets/sidebarIcon/leader.png";
import banner from "../../base/Assets/sidebarIcon/banner (1).png";
import coin from "../../base/Assets/sidebarIcon/wallet.png";
import report from "../../base/Assets/sidebarIcon/report.png";
import gift from "../../base/Assets/sidebarIcon/gift.png";
import sticker from "../../base/Assets/sidebarIcon/sticker.png";
import moment from "../../base/Assets/sidebarIcon/camera (1).png";
import feedback from "../../base/Assets/sidebarIcon/feedback.png";
import notification from "../../base/Assets/sidebarIcon/notifications.png";
import topgrowing from "../../base/Assets/sidebarIcon/top growing.png";
import suspend from "../../base/Assets/sidebarIcon/suspended.png";
import warning from "../../base/Assets/sidebarIcon/warning.png";
import { useEffect } from "react";

export const sidebarData = createContext();

const SidebarData = [
  {
    label: "Dashboard",
    link: "/dashboard",
    icon: dashboard,
  },

  {
    label: "All Users ",
    link: "/allusers",
    icon: user,
  },

  {
    label: "Host Request",
    link: "/hostrequest",
    icon: host,
  },

  {
    label: "Accepted Host",
    link: "/acceptedhost",
    icon: host,
  },

  {
    label: "Rejected Host",
    link: "/rejectedhost",
    icon: host,
  },

  {
    label: "Leader",
    link: "/leader",
    icon: leader,
  },

  {
    label: "Suspended Data",
    link: "/suspendusers",
    icon: suspend,
  },

  {
    label: "Warned Data",
    link: "/warnedusers",
    icon: warning,
  },

  {
    label: "Banner",
    link: "/banner",
    icon: banner,
  },
  {
    label: "Coin",
    link: "/coin",
    icon: coin,
  },

  {
    label: "Call History",
    link: "/allcallhistory",
    icon: coin,
  },

  {
    label: "Report",
    link: "/report",
    icon: report,
  },
  {
    label: "Gift",
    link: "/gift",
    icon: gift,
  },
  {
    label: "Sticker",
    link: "/sticker",
    icon: sticker,
  },

  {
    label: "Flower",
    link: "/flower",
    icon: sticker,
  },

  {
    label: "Top Growing",
    link: "/topgrowing",
    icon: topgrowing,
  },

  {
    label: "Moment",
    link: "/moment",
    icon: moment,
  },

  {
    label: "Interest",
    link: "/interest",
    icon: moment,
  },

  {
    label: "Feedback",
    link: "/feedback",
    icon: feedback,
  },

  {
    label: "Suspicious Data",
    link: "/suspicious",
    icon: feedback,
  },

  {
    label: "Snapshots",
    link: "/snapshot",
    icon: feedback,
  },

  {
    label: "Blocked Data",
    link: "/adminblocklist",
    icon: feedback,
  },

  {
    label: "Sub-Admin",
    link: "/subAdmin",
    icon: feedback,
  },

  {
    label: "Notification",
    link: "/notification",
    icon: notification,
  },
];

const SidebarProvider = ({ children }) => {
  const [sidebarContent, setSidebarContent] = useState(SidebarData);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    setSelectedType(sessionStorage.getItem("selectedType"));

    console.log("selectedType", selectedType);
  }, []);

  useEffect(() => {
    if (selectedType === "catchwoo") {
      const updatedSidebar = SidebarData.map((sidebar) => ({
        ...sidebar,
        link: `${sidebar?.link}?appType=catchwoo`,
      }));
      setSidebarContent(updatedSidebar);
    } else if (selectedType === "host") {
      const updatedSidebar = SidebarData.map((sidebar) => ({
        ...sidebar,
        link: `${sidebar?.link}?appType=host`,
      }));
      setSidebarContent(updatedSidebar);
    } else {
      setSidebarContent(SidebarData);
    }
  }, [selectedType]);

  return (
    <sidebarData.Provider
      value={{ sidebarContent, setSidebarContent, setSelectedType }}
    >
      {children}
    </sidebarData.Provider>
  );
};

export const useSidebar = () => useContext(sidebarData);
export default SidebarProvider;
