import { useLocation } from "react-router-dom";
import "./style.css";
import Dashboard from "../../pages/Dashboard";

const Breadcrumbs = () => {
  const location = useLocation();
  console.log("location", location.pathname);

  const path = location.pathname;

  console.log("path", path);

  return (
    <div className="breakcrumbs__container">
      Dashboard
      {/* {path.filter((item) => {
        return item !== "dashboard";
      })} */}
      {path}
    </div>
  );
};

export default Breadcrumbs;
