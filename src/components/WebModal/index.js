import { useEffect, useState } from "react";
import "./style.css";

const WebModal = ({ onRequestClose, open, children, heading }) => {
  const [showVisible, setShowVisible] = useState(open);

  useEffect(() => {
    setShowVisible(open);
  }, [open]);

  return (
    showVisible && (
      <div className="web__modal__container" onClick={onRequestClose}>
        <div className="web_modal_data">
          <h2 className="web__modal__heading">{heading}</h2>
          <div className="web__modal__content">{children}</div>
        </div>
      </div>
    )
  );
};

export default WebModal;
