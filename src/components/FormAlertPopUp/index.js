import "./style.css";
import { Box, Modal } from "@mui/material";
// import TextArea from "../library/TextArea";

const FormAlertPopUp = ({
  open,
  handleOpen,
  // handleClose,
  header,
  description,
  submitText,
  cancelText,
  onSubmitClick,
  onCancelClick,
  modalOf,
  onRequestClose,
  children,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: "50%",
    height: "auto",
    border: "none",
    outline: "none",
    borderRadius: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    bgcolor: "white",
  };

  console.log("Open modal", open);

  return (
    <Modal open={open} onClose={onRequestClose} closeAfterTransition>
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default FormAlertPopUp;
