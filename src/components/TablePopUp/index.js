import { Box, Modal } from "@mui/material";
import "./style.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 300,
  border: "none",
  outline: "none",
  borderRadius: "10px",
  bgcolor: "white",
  boxShadow: 24,
  p: 2,
};

const TablePopUp = ({ open, handleClose, header, data }) => {
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
          <table className="table__pop__up__table">
            <thead>
              <th className="table__pop__up__header">{header}</th>
            </thead>
            <tbody>
              <td className="table__pop__up__data">{data}</td>
            </tbody>
          </table>
        </Box>
      </Modal>
    </div>
  );
};

export default TablePopUp;
