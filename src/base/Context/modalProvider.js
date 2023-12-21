import React, { createContext, useState } from "react";
import WebModal from "../../components/WebModal";

export const Modal = createContext();

function ModalProvider({ children }) {
  const [comment, setComment] = useState("");
  const [heading, setHeading] = useState("");
  const [showComment, setShowComment] = useState(false);

  const handleCommentClick = (comment, heading) => {
    setComment(comment);
    setHeading(heading);
    setShowComment(true);
  };

  const handleCommentClickClose = () => {
    setShowComment(false);
  };
  return (
    <Modal.Provider value={{ handleCommentClick }}>
      {children}
      <WebModal
        open={showComment}
        onRequestClose={handleCommentClickClose}
        heading={heading}
        children={comment}
      ></WebModal>
    </Modal.Provider>
  );
}

export default ModalProvider;