import LeaderTable from "../Table/LeaderTable";
import AddGiftForm from "../formComponents/AddGiftForm";
import AddLeaderForm from "../formComponents/AddLeaderform";
import BannerForm from "../formComponents/BannerForm";
import CreateWalletForm from "../formComponents/CreateWalletForm";
import "./style.css";
import { Box, Modal } from "@mui/material";
// import TextArea from "../library/TextArea";

const FormAlertPopUp = ({
  open,
  handleOpen,
  handleClose,
  header,
  description,
  submitText,
  cancelText,
  onSubmitClick,
  onCancelClick,
  modalOf,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "auto",
    border: "none",
    outline: "none",
    borderRadius: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    bgcolor: "white",
    p: 2,
  };

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Box sx={style}>
        {modalOf === "banner" ? <BannerForm handleClose={handleClose} /> : null}
        {modalOf === "leader" ? (
          <AddLeaderForm handleClose={handleClose} />
        ) : null}
        {modalOf === "gift" ? <AddGiftForm handleClose={handleClose} /> : null}
        {modalOf === "wallet" ? (
          <CreateWalletForm handleClose={handleClose} />
        ) : null}
      </Box>
    </Modal>
  );
};

export default FormAlertPopUp;
