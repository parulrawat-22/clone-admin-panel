import { useEffect, useState } from "react";
import "./style.css";
import baseUrl from "../../../baseUrl";
import axios from "axios";
import moment from "moment/moment";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import AlertPopUp from "../../AlertPopUp";

const AcceptedHostTable = () => {
  const [acceptedHost, setAcceptedHost] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showChangeLeaderAlert, setShowChangeLeaderAlert] = useState(false);
  const [showChargeAlert, setShowChargeAlert] = useState(false);
  const [id, setId] = useState("");
  const [leaderId, setLeaderId] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [leaderNames, setLeaderNames] = useState([]);

  useEffect(() => {
    getAcceptedHost();
    getHostLeader();
  }, []);

  const handleChangeCharge = () => {
    setShowChargeAlert(true);
  };

  const handleChangeChargeClose = () => {
    setShowChargeAlert(false);
  };

  const handleDeleteAcceptedHostAlert = (id) => {
    setShowDeleteAlert(true);
    setId(id);
  };

  const handleDeleteAcceptedHostAlertClose = () => {
    setShowDeleteAlert(false);
  };

  const handleChangeLeader = (leaderId, leaderName) => {
    setShowChangeLeaderAlert(true);
    setLeaderId(leaderId);
    setLeaderName(leaderName);
  };

  const handleChangeLeaderClose = () => {
    setShowChangeLeaderAlert(false);
  };

  const getHostLeader = () => {
    axios
      .get(baseUrl + "admin/getAllLeader", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data.result);
        const leaderNames = res?.data?.result?.map(
          (leader) => leader.leaderName
        );
        console.log(leaderNames);
        setLeaderNames(leaderNames);
      })
      .catch((err) => console.log(err));
  };

  const getAcceptedHost = () => {
    axios
      .post(
        baseUrl + "admin/getAllAcceptHost",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setAcceptedHost(res.data.result);
        console.log("----", res.data.result);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  const handleDeleteAcceptedHost = (id) => {
    setShowDeleteAlert(true);
    setId(id);
  };

  const handleDeletedAcceptedHost = () => {
    axios
      .delete(baseUrl + "admin/adminDeletedHost/" + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setShowDeleteAlert(false);
        getAcceptedHost();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAcceptedHostLeader = () => {
    axios
      .put(
        baseUrl + "admin/updateLeaderData",
        {
          id: leaderId,
          leaderName: leaderName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="accepted__host__container">
      <table className="accepted__host__table">
        <thead>
          <th className="accepted__host__header">S.No.</th>
          <th className="accepted__host__header">Host ID</th>
          <th className="accepted__host__header">Name</th>
          <th className="accepted__host__header">Date Of Birth</th>
          <th className="accepted__host__header">Age</th>
          <th className="accepted__host__header">Mobile Number</th>
          <th className="accepted__host__header">Email ID</th>
          <th className="accepted__host__header">Accepted At</th>
          <th className="accepted__host__header">Charge/min</th>
          <th className="accepted__host__header">Leader</th>
          <th className="accepted__host__header">Details</th>
          <th className="accepted__host__header">Action</th>
        </thead>
        <tbody>
          {acceptedHost.map((data, index) => {
            return (
              <tr>
                <td className="accepted__host__data">{index + 1}</td>
                <td className="accepted__host__data">{data._id}</td>
                <td className="accepted__host__data">{data.name}</td>
                <td className="accepted__host__data">{data.dateOfBirth}</td>
                <td className="accepted__host__data">{data.age}</td>
                <td className="accepted__host__data">{data.mobileNumber}</td>
                <td className="accepted__host__data">{data.email}</td>
                <td className="accepted__host__data">
                  {moment(data.acceptedDate).format("DD/MM/YYYY LT")}
                </td>
                <td className="host__charge__edit accepted__host__data">
                  {data.hostuser_fees}
                  <AiFillEdit
                    className="accepted__host__edit_icon"
                    onClick={handleChangeCharge}
                  />
                </td>
                <td className="accepted__host__data">
                  <div className="host__leader__edit">
                    {data.leader.leaderName}
                    <AiFillEdit
                      className="accepted__host__edit_icon"
                      onClick={handleChangeLeader}
                    />
                  </div>
                </td>
                <td className="accepted__host__view accepted__host__data">
                  View
                </td>
                <td className="accepted__host__action accepted__host__data">
                  <AiFillEdit className="accepted__host__edit__icon" />
                  <AiFillDelete
                    onClick={() => {
                      handleDeleteAcceptedHost(data._id);
                    }}
                    className="accepted__host__delete__icon"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <AlertPopUp
        open={showDeleteAlert}
        handleOpen={handleDeleteAcceptedHostAlert}
        handleClose={handleDeleteAcceptedHostAlertClose}
        header="Delete Accepted Host"
        description="Are you sure you want to delete this accepted host?"
        submitText="Yes"
        onCancelClick={handleDeleteAcceptedHostAlertClose}
        cancelText="No"
        onSubmitClick={handleDeletedAcceptedHost}
      />

      <AlertPopUp
        open={showChangeLeaderAlert}
        handleOpen={handleChangeLeader}
        handleClose={handleChangeLeaderClose}
        submitText="Submit"
        cancelText="Cancel"
        dropdown={true}
        onSubmitClick={handleAcceptedHostLeader}
        onCancelClick={handleChangeLeaderClose}
      />

      <AlertPopUp
        open={showChargeAlert}
        handleOpen={handleChangeCharge}
        handleClose={handleChangeChargeClose}
        submitText="Submit"
        cancelText="Cancel"
        // onSubmitClick={handleAcceptedHost}
        onCancelClick={handleChangeChargeClose}
      />
    </div>
  );
};

export default AcceptedHostTable;
