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
import { useLoader } from "../../../base/Context/loaderProvider";

const AcceptedHostTable = () => {
  let navigate = useNavigate();
  const [acceptedHost, setAcceptedHost] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showChangeLeaderAlert, setShowChangeLeaderAlert] = useState(false);
  const [showChargeAlert, setShowChargeAlert] = useState(false);
  const [audioCallFees, setAudioCallFees] = useState("");
  const [showAudioAlert, setShowAudioAlert] = useState(false);
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

  const loader = useLoader();

  useEffect(() => {
    getAcceptedHost();
    getHostLeader();
  }, []);

  const handleAudioCallCharge = (hostId) => {
    setShowAudioAlert(true);
    setId(hostId);
  };

  const handleAudioCallChargeClose = () => {
    setShowAudioAlert(false);
  };

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
    loader.showLoader(true);
    fetchDataFromAPI(API_URL + NetworkConfiguration.GETLEADER, "GET")
      .then((res) => {
        loader.showLoader(false);
        console.log(res.result, "987654");
        const leaders = res?.result?.map((leader) => ({
          name: leader.leaderName,
          value: leader?._id,
        }));
        console.log(leaders, "qwertyu");
        setLeaderNames([...leaderNames, ...leaders]);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };

  const getAcceptedHost = () => {
    loader.showLoader(true);
    fetchDataFromAPI(API_URL + NetworkConfiguration.ACCEPTEDHOST, "POST", {})
      .then((res) => {
        setAcceptedHost(res.result);
        loader.showLoader(false);
      })
      .catch((err) => {
        console.log(err, "err");
        loader.showLoader(false);
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
        loader.showLoader(false);
      })
      .catch((err) => {
        console.log(err, "2345");
        loader.showLoader(false);
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
        loader.showLoader(false);
      })
      .catch((err) => {
        loader.showLoader(false);

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
        loader.showLoader(false);

        getAcceptedHost();
        setShowChangeLeaderAlert(false);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };

  const handleAudioCharges = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.UPDATEAUDIOCALLCHARGE,
      "PUT",
      {
        id: id,
        audioCall_fees: audioCallFees,
      }
    )
      .then((res) => {
        console.log(res);
        loader.showLoader(false);
        getAcceptedHost();
        handleAudioCallChargeClose();
      })
      .catch((err) => {
        console.log(err);
        loader.showLoader(false);
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
          <th className="accepted__host__header">Audio Charge/min</th>
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
                <td className="accepted__host__data">
                  {data?.audioCall_fees}

                  <AiFillEdit
                    className="accepted__host__edit_icon"
                    onClick={() => {
                      handleAudioCallCharge(data?._id, data?.audioCall_fees);
                    }}
                  />
                </td>
                <td className="accepted__host__data">
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
                  <AiFillEdit
                    onClick={() => {
                      navigate(`/hostmanagement/moment/${data?._id}/`);
                    }}
                    className="accepted__host__edit__icon"
                  />
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
      <AlertPopUp
        open={showAudioAlert}
        handleClose={handleAudioCallChargeClose}
        handleOpen={handleAudioCallCharge}
        submitText="Submit"
        cancelText="Cancel"
        textField={true}
        onChangeField={(e) => setAudioCallFees(e.target.value)}
        header="Update Audio Call Charge"
        onSubmitClick={handleAudioCharges}
        onCancelClick={handleAudioCallChargeClose}
      />
    </div>
  );
};

export default AcceptedHostTable;
