import { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import axios from "axios";
import baseUrl from "../../../baseUrl";
import "./style.css";
import { BsFillEyeFill } from "react-icons/bs";
import AlertPopUp from "../../AlertPopUp";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const AcceptedUserTable = () => {
  let navigate = useNavigate();
  const [acceptedUser, setAcceptedUser] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState();
  const [id, setId] = useState();

  const handleDeleteCancelButton = () => {
    setShowDeleteAlert(false);
    navigate("/acceptedusers");
  };

  const handleDeleteAlert = (id) => {
    setShowDeleteAlert(true);
    setId(id);
    console.log(id);
  };

  const handleDeleteAlertClose = () => {
    setShowDeleteAlert(false);
  };

  const getAcceptedUser = () => {
    axios
      .post(
        baseUrl + "admin/getUsersAccepted",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setAcceptedUser(res.data.result);
        console.log(res.data.result);
      })
      .catch((err) => {
        console.log(err, "err-----");
      });
  };
  useEffect(() => {
    getAcceptedUser();
  }, []);

  return (
    <div className="accepted__user__container">
      <table className="accepted__user__table__container">
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
          <th>Accepted At</th>
          <th>Action</th>
        </thead>
        <tbody>
          {acceptedUser.map((data, index) => {
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
                  <BsFillEyeFill
                    // onClick={handleEyePopUp}
                    className="accepted__user__eye__icon"
                  />
                </td>
                <td>
                  <BsFillEyeFill
                    className="accepted__user__eye__icon"

                    // onClick={handleEyePopUp}
                  />
                </td>
                <td>{moment(data.acceptedDate).format("DD/MM/YYYY  LT")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <AlertPopUp
        open={showDeleteAlert}
        handleOpen={handleDeleteAlert}
        handleClose={handleDeleteAlertClose}
        header="Delete Alert"
        description="Are you sure you want to delete this user?"
        submitText="Yes"
        onCancelClick={handleDeleteCancelButton}
        // onSubmitClick={handleDeleteAcceptedUser}
        cancelText="No"
      />
    </div>
  );
};

export default AcceptedUserTable;
