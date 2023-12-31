import { BsFillEyeFill } from "react-icons/bs";
import baseUrl from "../../../baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AlertPopUp from "../../AlertPopUp";
import ImagePopUpModal from "../../ImagePopUpModal";
import moment from "moment/moment";
import "./style.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const UserTable = () => {
  let navigate = useNavigate();

  const [userRequest, setUserRequest] = useState([]);
  // const [showEyeAlert, setShowEyeAlert] = useState();
  const [showProfileAlert, setShowProfileAlert] = useState();
  const [showDeleteAlert, setShowDeleteAlert] = useState();
  const [id, setId] = useState();

  useEffect(() => {
    getUserRequest();
  }, []);

  const handleDeleteAlert = () => {
    setShowDeleteAlert(true);
  };

  const handleDeleteAlertClose = () => {
    setShowDeleteAlert(false);
  };

  const handleUserDeleteClose = () => {
    setShowDeleteAlert(false);
    navigate("/userrequest");
  };

  const handleUserDeleteAlert = (id) => {
    setShowDeleteAlert(true);
    setId(id);
  };

  const handleEyeProfilePicPopUp = () => {
    setShowProfileAlert(true);
  };

  const handleEyeProfilePicPopUpClose = () => {
    setShowProfileAlert(false);
  };

  const handleUserDelete = () => {
    axios
      .delete(baseUrl + "admin/adminDeletedUser/" + id, {
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res, "res----------");
        setShowDeleteAlert(false);
        getUserRequest();
        navigate("/userrequest");
      })
      .catch((err) => {
        console.log(err, "err----------");
      });
  };

  const getUserRequest = () => {
    axios
      .post(
        baseUrl + "admin/getUsersPending",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res, "pending users");
        setUserRequest(res.data.result);
        // navigate("/acceptedUsers");
      })
      .catch((err) => {
        console.log(err, "err==========");
      });
  };

  return (
    <div className="user__request__table__container">
      <table className="user__request__table">
        <thead className="user__request__headers">
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
          <th className="user__request__headers">Image/Video</th>
          <th className="user__request__headers">Profile Pic</th>
          <th className="user__request__headers">Created At </th>
          <th className="user__request__headers">View Profile</th>
          <th className="user__request__headers">Action</th>
        </thead>
        <tbody>
          {userRequest?.map((data, index) => {
            return (
              <tr className="user__request__row">
                <td className="user__request__row_data">{index + 1}</td>
                <td className="user__request__row_data">{data.userId}</td>
                <td className="user__request__row_data">{data.name}</td>
                <td className="user__request__row_data">{data.gender}</td>
                <td className="user__request__row_data">{data.dateOfBirth}</td>
                <td className="user__request__row_data">{data.age}</td>
                <td className="user__request__row_data">{data.country}</td>
                <td className="user__request__row_data">{data.state}</td>
                <td className="user__request__row_data">{data.city}</td>
                <td className="user__request__row_data">{data.mobileNumber}</td>
                <td className="user__request__row_data">{data.proffession}</td>
                <td className="user__request__row_data">{data.addBio}</td>

                <td className="user__request__row_data">
                  <BsFillEyeFill className="user__request__eye__icon" />
                </td>
                <td className="user__request__row_data">
                  <BsFillEyeFill
                    onClick={() => {
                      handleEyeProfilePicPopUp();
                    }}
                    className="user__request__eye__icon"
                  />
                </td>
                <td> {moment(data.createdAt).format("MM/DD/YYYY  LT")}</td>
                <td
                  className="user__management__view__btn"
                  onClick={() => {
                    navigate(`/usermanagement/${data._id}`);
                  }}
                >
                  View more...
                </td>
                <td className="accepted__user__action">
                  <AiFillEdit
                    onClick={() => {
                      navigate("/edituser");
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
          />
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
