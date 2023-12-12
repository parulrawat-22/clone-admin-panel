import { BsFillEyeFill } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AlertPopUp from "../../AlertPopUp";
import ImagePopUpModal from "../../ImagePopUpModal";
import moment from "moment/moment";
import "./style.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useLoader } from "../../../base/Context/loaderProvider";
import SearchInput from "../../SearchInput";
import { FiSearch } from "react-icons/fi";

const UserTable = () => {
  let navigate = useNavigate();

  const [userRequest, setUserRequest] = useState([]);
  // const [showEyeAlert, setShowEyeAlert] = useState();
  const [showProfileAlert, setShowProfileAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showImageVideo, setShowImageVideo] = useState(false);
  const [images, setImages] = useState("");
  const [id, setId] = useState("");
  const [img, setImg] = useState("");
  const [value, setValue] = useState("");

  const loader = useLoader();

  useEffect(() => {
    getUserRequest();
  }, [value]);

  const handleDeleteAlert = () => {
    setShowDeleteAlert(true);
  };

  const handleDeleteAlertClose = () => {
    setShowDeleteAlert(false);
  };

  const handleUserDeleteClose = () => {
    setShowDeleteAlert(false);
  };

  const handleUserDeleteAlert = (id) => {
    setShowDeleteAlert(true);
    setId(id);
  };

  const handleEyeProfilePicPopUp = (img) => {
    console.log("1234", img);
    setShowProfileAlert(true);
    setImg(img);
  };

  const handleEyeProfilePicPopUpClose = () => {
    setShowProfileAlert(false);
  };

  const handleImageVideoPopUp = (images) => {
    console.log("1234", images);
    setShowImageVideo(true);
    setImages(images);
  };

  const handleImageVideoPopUpClose = () => {
    setShowImageVideo(false);
  };

  const handleUserDelete = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.DELETEUSER + `/${id}`,
      "DELETE"
    )
      .then((res) => {
        loader.showLoader(false);
        setShowDeleteAlert(false);
        getUserRequest();
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err, "err----------");
      });
  };

  //get users

  const getUserRequest = () => {
    loader.showLoader(true);
    fetchDataFromAPI(API_URL + NetworkConfiguration.GETUSERS, "POST", {
      key: value,
    })
      .then((res) => {
        setUserRequest(res.result);
        loader.showLoader(false);
      })
      .catch((err) => {
        console.log(err, "err==========");
        loader.showLoader(false);
      });
  };

  const handleText = (e) => {
    setValue(e.target.value);
  };

  const searchIcon = () => {
    return <FiSearch />;
  };

  return (
    <div className="user__request__table__container">
      <div className="banner__search__btn">
        <SearchInput
          onChange={handleText}
          placeholder="Search"
          icon={searchIcon()}
          value={value}
        />
      </div>
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
          <th className="user__request__headers">Image/Video</th>
          <th className="user__request__headers">Created At </th>
          <th className="user__request__headers">View Profile</th>
          <th className="user__request__headers">Action</th>
        </thead>
        <tbody>
          {userRequest?.map((data, index) => {
            return (
              <tr>
                <td className="user__request__data">{index + 1}</td>
                <td className="user__request__data">{data._id}</td>
                <td className="user__request__data">{data.name}</td>
                <td className="user__request__data">{data.gender}</td>
                <td className="user__request__data">{data.dateOfBirth}</td>
                <td className="user__request__data">{data.age}</td>
                <td className="user__request__data">{data.country}</td>
                <td className="user__request__data">{data.state}</td>
                <td className="user__request__data">{data.city}</td>
                <td className="user__request__data">{data.mobileNumber}</td>
                <td className="user__request__data">{data.proffession}</td>
                <td className="user__request__data">{data.addBio}</td>

                <td className="user__request__data">
                  <BsFillEyeFill
                    onClick={() => {
                      handleEyeProfilePicPopUp(data?.profilePic);
                    }}
                    className="user__request__eye__icon"
                  />
                </td>

                <td className="user__request__data">
                  <BsFillEyeFill
                    onClick={() => {
                      handleImageVideoPopUp(data?.presentationPic);
                    }}
                    className="user__request__eye__icon"
                  />
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
                <td className="user__request__data">
                  <AiFillEdit
                    onClick={() => {
                      navigate("/edituser", { state: { id: data?._id } });
                    }}
                    className="accepted__user__edit__icon"
                  />
                  <AiFillDelete
                    onClick={() => {
                      handleUserDeleteAlert(data._id);
                    }}
                    className="accepted__user__delete__icon"
                  />
                </td>
              </tr>
            );
          })}

          <AlertPopUp
            open={showDeleteAlert}
            handleOpen={handleDeleteAlert}
            handleClose={handleDeleteAlertClose}
            header="Delete Alert"
            description="Are you sure you want to delete this User?"
            submitText="Yes"
            cancelText="No"
            onSubmitClick={handleUserDelete}
            onCancelClick={handleUserDeleteClose}
          />

          <ImagePopUpModal
            open={showProfileAlert}
            handleOpen={handleEyeProfilePicPopUp}
            handleClose={handleEyeProfilePicPopUpClose}
            img={img}
          />

          <ImagePopUpModal
            open={showImageVideo}
            handleOpen={handleImageVideoPopUp}
            handleClose={handleImageVideoPopUpClose}
            images={images}
          />
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
