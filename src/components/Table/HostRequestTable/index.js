import { BsFillEyeFill } from "react-icons/bs";
import "./style.css";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import baseUrl from "../../../baseUrl";
import axios from "axios";
import AlertPopUp from "../../AlertPopUp";
import { useNavigate } from "react-router-dom";

const HostRequestTable = () => {
  let navigate = useNavigate();
  const [hostrequest, setHostRequest] = useState([]);
  const [showAcceptedHostAlert, setShowAcceptedHostAlert] = useState(false);
  const [showRejectedHostAlert, setShowRejectedHostAlert] = useState();
  const [showRejectedReason, setShowRejectedReason] = useState();
  const [id, setId] = useState();
  const [rejectedReason, setRejectedReason] = useState("");

  const handleReasonChange = (e) => {
    setRejectedReason(e.target.value);
  };

  useEffect(() => {
    getHostRequest();
  }, []);

  const getHostRequest = () => {
    axios
      .post(
        baseUrl + "admin/getHostPending",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setHostRequest(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAcceptedHostsAlert = (id) => {
    setShowAcceptedHostAlert(true);
    setId(id);
  };

  const handleAcceptedHostsAlertClose = () => {
    setShowAcceptedHostAlert(false);
  };

  const handleAcceptedHost = () => {
    axios
      .put(
        baseUrl + "admin/acceptHostRequest",
        { id: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setShowAcceptedHostAlert(false);
        navigate("/acceptedhost");
      })
      .catch((err) => {
        console.log(err, "err--------");
      });
  };

  const handleRejectedHost = () => {
    console.log("Rejected Reason", rejectedReason);
    console.log("Rejected Id", id);
    axios
      .put(
        baseUrl + "admin/rejectHostRequest",
        { id: id, rejectedReason: rejectedReason },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setShowRejectedHostAlert(false);
        navigate("/rejectedhost");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRejectedHostsAlert = (id) => {
    setShowRejectedHostAlert(true);
    setId(id);
  };

  const handleRejectedHostsAlertClose = () => {
    setShowRejectedHostAlert(false);
    navigate("/hostrequest");
  };

  const handleAcceptedHostCancel = () => {
    setShowAcceptedHostAlert(false);
    navigate("/hostrequest");
  };

  const handleRejectedReasonAlert = () => {
    setShowRejectedReason(true);
  };

  const handleRejectedReasonAlertClose = () => {
    setShowRejectedReason(false);
  };

  const handleRejectedReasonCancel = () => {
    setShowRejectedReason(false);
    navigate("/hostrequest");
  };

  const handleRejectedReason = () => {
    setShowRejectedReason(true);
    setShowRejectedHostAlert(false);
  };

  return (
    <div className="host__request__container">
      <table className="host__request__table">
        <thead>
          <th className="host__request__header">S.No.</th>
          <th className="host__request__header">Host ID</th>
          <th className="host__request__header">Name</th>
          <th className="host__request__header">Gender</th>
          <th className="host__request__header">Date Of Birth</th>
          <th className="host__request__header">Email</th>
          <th className="host__request__header">Mobile Number</th>
          <th className="host__request__header">Pin Code</th>
          <th className="host__request__header">Country</th>
          <th className="host__request__header">State</th>
          <th className="host__request__header">Profession</th>
          <th className="host__request__header">Bio</th>
          <th className="host__request__header">Image/Video</th>
          <th className="host__request__header">Action</th>
        </thead>
        <tbody>
          {hostrequest.map((data, index) => {
            return (
              <tr>
                <td className="host__request__data">{index + 1}</td>
                <td className="host__request__data">{data._id}</td>
                <td className="host__request__data">{data.name}</td>
                <td className="host__request__data">{data.gender}</td>
                <td className="host__request__data">{data.dateOfBirth}</td>
                <td className="host__request__data">{data.email}</td>
                <td className="host__request__data">{data.mobileNumber}</td>
                <td className="host__request__data">{data.pinCode}</td>
                <td className="host__request__data">{data.country}</td>
                <td className="host__request__data">{data.state}</td>
                <td className="host__request__data">{data.proffession}</td>
                <td className="host__request__data">{data.addBio}</td>
                <td className="host__request__data">
                  <BsFillEyeFill className="host__request__eye__icon" />
                </td>
                <td className="host__request__data">
                  <div className="host__request__action__icons">
                    <TiTick
                      onClick={() => {
                        handleAcceptedHostsAlert(data._id);
                      }}
                      className="host__request__accept__icon"
                    />
                    <RxCross2
                      onClick={() => {
                        handleRejectedHostsAlert(data._id);
                      }}
                      className="host__request__reject__icon"
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <AlertPopUp
        open={showAcceptedHostAlert}
        handleOpen={handleAcceptedHostsAlert}
        handleClose={handleAcceptedHostsAlertClose}
        header="Accept Host?"
        description="Are you sure you want to accept this host?"
        submitText="Yes"
        cancelText="No"
        onSubmitClick={handleAcceptedHost}
        onCancelClick={handleAcceptedHostCancel}
      />

      <AlertPopUp
        open={showRejectedHostAlert}
        handleOpen={handleRejectedHostsAlert}
        handleClose={handleRejectedHostsAlertClose}
        header="Reject User?"
        description="Are you sure you want to reject this Host request?"
        submitText="Yes"
        cancelText="No"
        onCancelClick={handleRejectedHostsAlertClose}
        onSubmitClick={handleRejectedReason}
      />

      <AlertPopUp
        open={showRejectedReason}
        handleOpen={handleRejectedReasonAlert}
        handleClose={handleRejectedReasonAlertClose}
        header="Rejected Reason"
        description="Choose a reason to reject this user request"
        submitText="Submit"
        cancelText="Cancel"
        onSubmitClick={handleRejectedHost}
        onCancelClick={handleRejectedReasonCancel}
        rejectedReason={true}
        reason={rejectedReason}
        handleReasonChange={handleReasonChange}
      />
    </div>
  );
};

export default HostRequestTable;
