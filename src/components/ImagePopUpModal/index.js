import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import "./style.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "auto",
  textAlign: "center",
  overflow: "scroll",
  border: "none",
  outline: "none",
  borderRadius: "10px",
  bgcolor: "white",
  boxShadow: 24,
  padding: "1rem",
  p: 2,
};

const ImagePopUpModal = ({ open, handleClose, header, img }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style}>
          <div>
            <h3>{header}</h3>
            <img className="image__popup__styling" src={img} alt={header} />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ImagePopUpModal;
