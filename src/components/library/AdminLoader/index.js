import Lottie from "react-lottie";
import loader from "../../../base/Animation/loader.json";

import "./style.css";
import { Box, Modal } from "@mui/material";

const AdminLoader = ({ showLoader }) => {
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
    // bgcolor: "white",
  };

  return (
    <Modal open={showLoader} closeAfterTransition>
      <Box sx={style}>
        <Lottie
          options={{ animationData: loader, loop: true }}
          style={{ width: "10rem", height: "10rem" }}
        />
      </Box>
    </Modal>
  );
};

export default AdminLoader;
