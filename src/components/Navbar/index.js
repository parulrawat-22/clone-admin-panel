import SeachInput from "./SearchInput";
import { FiSearch } from "react-icons/fi";
import "./style.css";

const Navbar = () => {
  const searchIcon = () => {
    return <FiSearch />;
  };
  return (
    <nav className="navbar__container">
      <div className="navbar__search_bar">
        <SeachInput placeholder="Search" icon={searchIcon()} />
      </div>
      <div className="navbar__profile_details">
        <div className="navbar__country" />
        <div style={{ color: "#f20094" }}> | </div>
        <div className="navbar__content">
          <p style={{ color: "#f20094" }}>Customer Name</p>
          <p style={{ color: "#f20094" }}>Edit Profile</p>
        </div>
        <div className="navbar__country" />
      </div>
    </nav>
  );
};

export default Navbar;
