import "./style.css";
import { useEffect, useRef, useState } from "react";
import { FaUserTie } from "react-icons/fa6";
import PopMenu from "../PopUpMenu";
import { IoNotifications } from "react-icons/io5";
import Breadcrumbs from "../Breadcrumbs";

const Navbar = () => {
  const [popOpen, setPopOpen] = useState(false);
  const myRef = useRef();

  const handleProfileClick = () => {
    setPopOpen(true);
  };

  const handleClickOutside = (e) => {
    console.log(e.target.className, "567890");
    if (
      !myRef.current.contains(e.target) &&
      e.target.className !== "logout_para"
    ) {
      setPopOpen(false);
    }
  };

  useEffect(() => {
    if (popOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [popOpen]);

  return (
    <div>
      <nav className="navbar__container">
        <div className="navbar__profile_details">
          <Breadcrumbs />
          <div className="navbar_right_content">
            <p className="navbar__details">Welcome Admin!</p>
            <PopMenu popOpen={popOpen}>
              <div
                ref={myRef}
                className="navbar__country"
                onClick={handleProfileClick}
              >
                <FaUserTie className="admin__image" />
              </div>
            </PopMenu>

            <PopMenu popOpen={popOpen}>
              <div
                ref={myRef}
                className="navbar__country"
                onClick={handleProfileClick}
              >
                <IoNotifications className="admin__image" />
              </div>
            </PopMenu>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
