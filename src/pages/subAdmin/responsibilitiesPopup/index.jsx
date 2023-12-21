import React from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import "./style.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "20px",
  },
};

Modal.setAppElement("#root");

export default function ResponsibilitiesPopup({
  modalIsOpen,
  setIsOpen,
  data,
}) {
  const navigate = useNavigate();
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Add Category Modal"
    >
      <div
        className="suspend_heading"
        style={{ marginBottom: "10px", minWidth: "400px" }}
      >
        <p>Responsibilities</p>
      </div>

      {data?.length ? (
        data.map((item) => {
          return (
            <>
              <div className="Allowance_div">
                {item?.name}
                <div className="allowance_edit_delete_btns">
                  {item?.accessType?.map((item, index) => {
                    return (
                      <span className="active_allow_btn" key={index}>
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>
            </>
          );
        })
      ) : (
        <div className="no_status_message">No Responsibilities Assign</div>
      )}
    </Modal>
  );
}
