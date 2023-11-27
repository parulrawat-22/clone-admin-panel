import { useEffect, useState } from "react";
import "./style.css";
import moment from "moment/moment";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import AlertPopUp from "../../AlertPopUp";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useNavigate } from "react-router-dom";

const AcceptedHostTable = () => {
  let navigate = useNavigate();
  const [acceptedHost, setAcceptedHost] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showChangeLeaderAlert, setShowChangeLeaderAlert] = useState(false);
  const [showChargeAlert, setShowChargeAlert] = useState(false);
  const [id, setId] = useState("");
  const [leaderId, setLeaderId] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [leaderNames, setLeaderNames] = useState([
    {
      name: "--Select--",
      value: "",
    },
  ]);
  const [hostuser_fees, setHostuser_fees] = useState("");

  useEffect(() => {
    getAcceptedHost();
    getHostLeader();
  }, []);

  const handleChangeCharge = (hostId) => {
    setShowChargeAlert(true);
    setId(hostId);
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

  const handleChangeLeader = (hostId) => {
    setShowChangeLeaderAlert(true);
    setId(hostId);
  };

  const handleChangeLeaderClose = () => {
    setShowChangeLeaderAlert(false);
  };

  const getHostLeader = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.GETLEADER, "GET")
      .then((res) => {
        console.log(res.result, "987654");
        const leaders = res?.result?.map((leader) => ({
          name: leader.leaderName,
          value: leader?._id,
        }));
        console.log(leaders, "qwertyu");
        setLeaderNames([...leaderNames, ...leaders]);
      })
      .catch((err) => console.log(err));
  };

  const getAcceptedHost = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.ACCEPTEDHOST, "POST", {})
      .then((res) => {
        setAcceptedHost(res.result);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  const handleDeleteAcceptedHost = (id) => {
    setShowDeleteAlert(true);
    setId(id);
  };

  const handleHostLeader = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.UPDATEHOSTCHARGE, "PUT", {
      id: id,
      hostuser_fees: hostuser_fees,
    })
      .then((res) => {
        getAcceptedHost();
        setShowChargeAlert(false);
      })
      .catch((err) => {
        console.log(err, "2345");
      });
  };

  const handleDeletedAcceptedHost = () => {
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.DELETEHOST + `/${id}`,
      "DELETE"
    )
      .then((res) => {
        setShowDeleteAlert(false);
        getAcceptedHost();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAcceptedHostLeader = () => {
    console.log(leaderId, leaderName, "abcdefghi");
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.UPDATELEADER + `/${id}`,
      "PUT",
      {
        leader: leaderId,
      }
    )
      .then((res) => {
        getAcceptedHost();
        setShowChangeLeaderAlert(false);
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
                <td className="accepted__host__data">{data?._id}</td>
                <td className="accepted__host__data">{data?.name}</td>
                <td className="accepted__host__data">{data?.dateOfBirth}</td>
                <td className="accepted__host__data">{data?.age}</td>
                <td className="accepted__host__data">{data?.mobileNumber}</td>
                <td className="accepted__host__data">{data?.email}</td>
                <td className="accepted__host__data">
                  {moment(data?.acceptedDate).format("DD/MM/YYYY LT")}
                </td>
                <td className="accepted__host__data host__charge__edit">
                  {data?.hostuser_fees}
                  <AiFillEdit
                    className="accepted__host__edit_icon"
                    onClick={() => {
                      handleChangeCharge(data?._id);
                    }}
                  />
                </td>
                <td className="accepted__host__data">
                  <div className="host__leader__edit">
                    {data?.leader?.leaderName}
                    <AiFillEdit
                      className="accepted__host__edit_icon"
                      onClick={() => {
                        handleChangeLeader(data?._id);
                      }}
                    />
                  </div>
                </td>
                <td
                  className="accepted__host__view accepted__host__data"
                  onClick={() => {
                    navigate(`/hostmanagement/${data?._id}`);
                  }}
                >
                  View
                </td>
                <td className="accepted__host__data">
                  <AiFillEdit className="accepted__host__edit__icon" />
                  <AiFillDelete
                    onClick={() => {
                      handleDeleteAcceptedHost(data?._id);
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
        dropdownOptions={leaderNames}
        onChangeDropdown={(e) => setLeaderId(e.target.value)}
        onSubmitClick={handleAcceptedHostLeader}
        onCancelClick={handleChangeLeaderClose}
      />

      <AlertPopUp
        open={showChargeAlert}
        handleOpen={handleChangeCharge}
        handleClose={handleChangeChargeClose}
        submitText="Submit"
        cancelText="Cancel"
        textField={true}
        onChangeField={(e) => setHostuser_fees(e.target.value)}
        onSubmitClick={handleHostLeader}
        onCancelClick={handleChangeChargeClose}
      />
    </div>
  );
};

export default AcceptedHostTable;
