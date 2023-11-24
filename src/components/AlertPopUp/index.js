import "./style.css";

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextArea from "../../components/library/TextArea";
import Dropdown from "../library/Dropdown";
import InputField from "../library/InputField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  border: "none",
  outline: "none",
  borderRadius: "10px",
  bgcolor: "white",
  boxShadow: 24,
  p: 2,
};

export default function AlertPopUp({
  handleOpen,
  open,
  handleClose,
  header,
  description,
  onSubmitClick,
  onCancelClick,
  submitText,
  cancelText,
  rejectedReason,
  reason,
  handleReasonChange,
  dropdown,
  dropdownOptions,
  onChangeField,
  onChangeDropdown,
  textField,
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="alert__popup__container">
            <h3 className="alert__popup__heading">{header}</h3>
            <p className="alert__popup__content">{description}</p>
          </div>
          {textField ? (
            <InputField onChange={onChangeField}></InputField>
          ) : null}
          {dropdown && dropdownOptions ? (
            <Dropdown
              options={dropdownOptions}
              onChange={onChangeDropdown}
              className="alert__popup__dropdown"
            ></Dropdown>
          ) : null}
          {rejectedReason ? (
            <TextArea
              value={reason}
              onChange={handleReasonChange}
              style={{
                width: "25rem",
                paddingTop: "2rem",
              }}
            ></TextArea>
          ) : null}
          <div className="button">
            <p className="alert__submit__popup" onClick={onSubmitClick}>
              {submitText}
            </p>
            <p className="alert__cancel__popup" onClick={onCancelClick}>
              {cancelText}
            </p>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
