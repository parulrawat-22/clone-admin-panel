import "./style.css";

const PopUpNotification = () => {
  return (
    <div>
      {children}
      <div
        style={{ display: popOpen ? "block" : "none" }}
        className="pop_container"
      ></div>
    </div>
  );
};

export default PopUpNotification;
