import { useEffect, useState } from "react";
import AlertPopUp from "../../AlertPopUp";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useLoader } from "../../../base/Context/loaderProvider";
import { useApi } from "../../../base/Context/apiProvider";
// import { useParams } from "react-router-dom";

const HostManagementTable = ({ id }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState();
  const [getOneHost, setGetOneHost] = useState("");

  const loader = useLoader();
  const apiProvider = useApi();

  const handleDelete = () => {
    setShowDeleteAlert(true);
  };

  const handleDeleteClose = () => {
    setShowDeleteAlert(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteAlert(false);
  };

  useEffect(() => {
    fetchOneHost();
  }, [apiProvider?.apiUrl]);

  const fetchOneHost = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.GETONEHOST + `/${id}`,
      "GET"
    )
      .then((res) => {
        loader.showLoader(false);
        setGetOneHost(res.result);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };

  return (
    <>
      <div className="user__management__profile">
        <img
          className="user__management__profile_pic"
          src={getOneHost?.profilePic}
          alt="Profile Pic"
        />
      </div>
      <div className="host__management__table__container">
        <table className="host__management__table">
          <thead>
            <div className="host__management__data__styling">
              <div className="host__management__data">
                <th className="host__management__header">Name</th>
                <td className="host__management__data">{getOneHost?.name}</td>
              </div>
              <div className="host__management__data">
                <th className="host__management__header">Date Of Birth</th>
                <td className="host__management__data">
                  {getOneHost?.dateOfBirth}
                </td>
              </div>
              <div className="host__management__data">
                <th className="host__management__header">Email ID</th>
                <td className="host__management__data">{getOneHost?.email}</td>
              </div>
              <div className="host__management__data">
                <th className="host__management__header">Mobile Number</th>
                <td className="host__management__data">
                  {getOneHost?.mobileNumber}
                </td>
              </div>
              <div className="host__management__data">
                <th className="host__management__header">PinCode</th>
                <td className="host__management__data">
                  {getOneHost?.pinCode}
                </td>
              </div>
              <div className="host__management__data">
                <th className="host__management__header">Country</th>
                <td className="host__management__data">
                  {getOneHost?.country}
                </td>
              </div>
              <div className="host__management__data">
                <th className="host__management__header">State</th>
                <td className="host__management__data">{getOneHost?.state}</td>
              </div>
              <div className="host__management__data">
                <th className="host__management__header">Profession</th>
                <td className="host__management__data">
                  {getOneHost?.proffession}
                </td>
              </div>
              <div className="host__management__data">
                <th className="host__management__header">Bio</th>
                <td className="host__management__data">{getOneHost?.addBio}</td>
              </div>
              <div
                className="host__management__data"
                style={{ display: "flex", gap: "10px" }}
              >
                <th className="host__management__header">Interests</th>
                <td className="host__management__data">
                  {getOneHost?.myInterests}
                </td>
              </div>
            </div>
          </thead>
          <tbody></tbody>
        </table>
        {/* </div> */}
        <AlertPopUp
          open={showDeleteAlert}
          handleOpen={handleDelete}
          handleClose={handleDeleteClose}
          header="Delete Alert"
          description="Are you sure you want to delete this Host?"
          submitText="Yes"
          cancelText="No"
          onCancelClick={handleCancelDelete}
        />
      </div>
    </>
  );
};

export default HostManagementTable;
