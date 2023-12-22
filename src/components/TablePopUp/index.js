import { Box, Modal } from "@mui/material";
import "./style.css";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../network/NetworkConfiguration";
import { useEffect, useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ImagePopUpModal from "../ImagePopUpModal";
import { useLoader } from "../../base/Context/loaderProvider";
import { useApi } from "../../base/Context/apiProvider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "auto",
  border: "none",
  outline: "none",
  borderRadius: "10px",
  bgcolor: "white",
  boxShadow: 24,
  p: 2,
  overflow: "auto",
};

const TablePopUp = ({ open, handleClose, id }) => {
  let navigate = useNavigate();
  const [showHostList, setShowHostList] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const [img, setImg] = useState("");

  const loader = useLoader();
  const apiProvider = useApi();

  const handleEyeProfilePicPopUp = (img) => {
    setShowImage(true);
    setImg(img);
  };

  const handleEyeProfilePicPopUpClose = () => {
    setShowImage(false);
  };

  useEffect(() => {
    handleHostList(id);
  }, [id, apiProvider?.apiUrl]);

  const handleHostList = (id) => {
    loader.showLoader(true);

    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.GETLEADERHOSTS + `/${id}`,
      "GET"
    )
      .then((res) => {
        loader.showLoader(false);
        setShowHostList(res.result);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };

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
          <table className="user__request__table">
            <thead>
              <th className="user__request__headers">S.No.</th>
              <th className="user__request__headers">User ID</th>
              <th className="user__request__headers">Name</th>
              <th className="user__request__headers">Gender</th>
              <th className="user__request__headers">Date Of Birth</th>
              <th className="user__request__headers">Age</th>
              <th className="user__request__headers">Country</th>
              <th className="user__request__headers">State</th>
              <th className="user__request__headers">City</th>
              <th className="user__request__headers">Mobile Number</th>
              <th className="user__request__headers">Profession</th>
              <th className="user__request__headers">Bio</th>
              <th className="user__request__headers">Profile Pic</th>
              <th className="user__request__headers">Created At </th>
              <th className="user__request__headers">View Profile</th>
            </thead>
            <tbody>
              {showHostList?.length === 0 ? (
                <p>No data available</p>
              ) : (
                showHostList?.map((data, index) => {
                  return (
                    <tr>
                      <td className="user__request__data">{index + 1}</td>
                      <td className="user__request__data">{data?.userId}</td>
                      <td className="user__request__data">{data?.name}</td>
                      <td className="user__request__data">{data?.gender}</td>
                      <td className="user__request__data">
                        {data?.dateOfBirth}
                      </td>
                      <td className="user__request__data">{data?.age}</td>
                      <td className="user__request__data">{data?.country}</td>
                      <td className="user__request__data">{data?.state}</td>
                      <td className="user__request__data">{data?.city}</td>
                      <td className="user__request__data">
                        {data?.mobileNumber}
                      </td>
                      <td className="user__request__data">
                        {data?.proffession}
                      </td>
                      <td className="user__request__data">{data?.addBio}</td>
                      <td className="user__request__data">
                        {data?.profilePic && (
                          <BsFillEyeFill
                            onClick={() => {
                              handleEyeProfilePicPopUp(data?.profilePic);
                            }}
                            className="user__request__eye__icon"
                          />
                        )}
                      </td>
                      <td className="user__request__data">
                        {" "}
                        {moment(data.createdAt).format("MM/DD/YYYY LT")}
                      </td>
                      <td
                        className="user__request__data user__management__view__btn"
                        onClick={() => {
                          navigate(`/usermanagement/${data._id}`);
                        }}
                      >
                        View more...
                      </td>
                    </tr>
                  );
                })
              )}

              <ImagePopUpModal
                open={showImage}
                handleOpen={handleEyeProfilePicPopUp}
                handleClose={handleEyeProfilePicPopUpClose}
                img={img}
              />
            </tbody>
          </table>
        </Box>
      </Modal>
    </div>
  );
};

export default TablePopUp;
