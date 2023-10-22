const handleNavLinkClassName = ({ isActive }) => {
  if (isActive) {
    return "sidebar__active_data";
  } else {
    return "sidebar__data";
  }
};

module.exports = { handleNavLinkClassName };
