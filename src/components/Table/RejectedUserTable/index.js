import { useEffect, useState } from "react";
import "./style.css";
import { BsFillEyeFill } from "react-icons/bs";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import axios from "axios";
import baseUrl from "../../../baseUrl";
import { useNavigate } from "react-router-dom";
import AlertPopUp from "../../AlertPopUp";
import moment from "moment";

const RejectedUserTable = () => {
  let navigate = useNavigate();
  const [rejectedusers, setRejectedUsers] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState();
  const [id, setId] = useState("");

  useEffect(() => {
    getRejectedUsers();
  }, []);

  const handleCancelClick = () => {
    setShowDeleteAlert(false);
    navigate("/rejectedusers");
  };

  const handleDeleteAlert = (id) => {
    setShowDeleteAlert(true);
    setId(id);
  };

  const handleDeleteAlertClose = () => {
    setShowDeleteAlert(false);
  };

  const handleDeleteRejectedUser = () => {
    axios
      .delete(baseUrl + "banner/adminDeletedUser/" + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res, "res123456");
        setShowDeleteAlert(false);
        getRejectedUsers();
        navigate("/rejectedusers");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRejectedUsers = () => {
    axios
      .post(
        baseUrl + "admin/getUsersRejected",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setRejectedUsers(res.data.result);
        console.log("Rejected users", res.data.result);
      })
      .catch((err) => {
        console.log(err, "Err");
      });
  };
  return (
    <div className="rejected__user__container">
      <table className="rejected__user__table">
        <thead>
          <th>S.No.</th>
          <th>User ID</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Date Of Birth</th>
          <th>Age</th>
          <th>Country</th>
          <th>State</th>
          <th>City</th>
          <th>Mobile Number</th>
          <th>Profession</th>
          <th>Bio</th>
          <th>Image/Video</th>
          <th>Profile Pic</th>
          <th>Rejected At</th>
          <th>Action</th>
        </thead>
        <tbody>
          {rejectedusers.map((data, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{data._id}</td>
                <td>{data.name}</td>
                <td>{data.gender}</td>
                <td>{data.dateOfBirth}</td>
                <td>{data.age}</td>
                <td>{data.country}</td>
                <td>{data.state}</td>
                <td>{data.city}</td>
                <td>{data.mobileNumber}</td>
                <td>{data.proffession}</td>
                <td>{data.addBio}</td>
                <td>
                  <BsFillEyeFill className="rejected__user__eye__icon" />
                </td>
                <td>
                  <BsFillEyeFill className="rejected__user__eye__icon" />
                </td>
                <td>{moment(data.rejectedDate).format("DD/MM/YYYY  LT")}</td>
                <td className="rejected__user__action">
                  <AiFillEdit className="rejected__user__edit__icon" />
                  <AiFillDelete
                    onClick={() => {
                      handleDeleteAlert(data._id);
                    }}
                    className="rejected__user__delete__icon"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
        <AlertPopUp
          open={showDeleteAlert}
          handleOpen={handleDeleteAlert}
          handleClose={handleDeleteAlertClose}
          header="Delete Alert"
          description="Are you sure you want to delete this rejected user?"
          submitText="Yes"
          cancelText="No"
          onSubmitClick={handleDeleteRejectedUser}
          onCancelClick={handleCancelClick}
        />
      </table>
    </div>
  );
};

export default RejectedUserTable;
