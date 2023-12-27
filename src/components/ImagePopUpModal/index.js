import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

import "swiper/css";

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

const ImagePopUpModal = ({ open, handleClose, header, img, images }) => {
  const SUPPORTED_IMAGE_FORMATS = ["jpg", "jpeg", "png", "webp", "pdf"];

  const getUrlExtension = (url) => {
    return url.split(/[#?]/)[0].split(".").pop().trim();
  };

  console.log("images", images);

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
          {images && (
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="swiper__container"
              slidesPerView={1}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {images.length > 0 &&
                images.map((image) => (
                  <SwiperSlide className="swiper__container">
                    {SUPPORTED_IMAGE_FORMATS.includes(
                      getUrlExtension(image)
                    ) ? (
                      <img
                        className="image__popup__styling"
                        src={image}
                        alt={header}
                      />
                    ) : (
                      <video width="400" height="300" controls autoPlay loop>
                        <source src={image} type="video/mp4" />
                      </video>
                    )}
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ImagePopUpModal;
