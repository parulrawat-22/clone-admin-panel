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
import FormAlertPopUp from "../../FormAlertPopUp";
import HostVideoCallCharge from "../../FormAlertPopUp/HostVideoCallCharge";
import HostAudioCharge from "../../FormAlertPopUp/HostAudioCharge";
import SearchInput from "../../SearchInput";
import { FiSearch } from "react-icons/fi";
import Pagination from "../../Pagination";
import Lottie from "react-lottie";
import noData from "../../../base/Animation/No Data Found.json";

const AcceptedHostTable = () => {
  let navigate = useNavigate();
  const [acceptedHost, setAcceptedHost] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showChangeLeaderAlert, setShowChangeLeaderAlert] = useState(false);
  const [showChargeAlert, setShowChargeAlert] = useState(false);
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

  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");

  const loader = useLoader();

  useEffect(() => {
    getAcceptedHost();
    getHostLeader();
  }, [value, page, perPage]);

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
    fetchDataFromAPI(API_URL + NetworkConfiguration.ACCEPTEDHOST, "POST", {
      key: value,
      page,
      perPage,
    })
      .then((res) => {
        setAcceptedHost(res.result);
        loader.showLoader(false);
        setTotalCount(res?.totalCount);
        setTotalPages(res?.totalPages);
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

  const handleDeletedAcceptedHost = () => {
    loader.showLoader(true);
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

  const searchIcon = () => {
    return <FiSearch />;
  };

  const handleText = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="accepted__host__container">
      <div className="accepted__host__search__btn">
        <SearchInput
          onChange={handleText}
          value={value}
          placeholder="Search"
          icon={searchIcon()}
        />
      </div>
      <div className="table_parent_box">
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
            <th className="accepted__host__header">Audio Charge/sec</th>
            <th className="accepted__host__header">Video Charge/sec</th>
            <th className="accepted__host__header">Leader</th>
            <th className="accepted__host__header">Details</th>
            <th className="accepted__host__header">Action</th>
          </thead>
          <tbody>
            {acceptedHost.length > 0
              ? acceptedHost.map((data, index) => {
                  return (
                    <tr>
                      <td className="accepted__host__data">
                        {(page - 1) * perPage + index + 1}
                      </td>
                      <td className="accepted__host__data">{data?._id}</td>
                      <td className="accepted__host__data">{data?.name}</td>
                      <td className="accepted__host__data">
                        {data?.dateOfBirth}
                      </td>
                      <td className="accepted__host__data">{data?.age}</td>
                      <td className="accepted__host__data">
                        {data?.mobileNumber}
                      </td>
                      <td className="accepted__host__data">{data?.email}</td>
                      <td className="accepted__host__data">
                        {moment(data?.acceptedDate).format("DD/MM/YYYY LT")}
                      </td>
                      <td className="accepted__host__data">
                        {data?.audioCall_fees}

                        <AiFillEdit
                          className="accepted__host__edit_icon"
                          onClick={() => {
                            handleAudioCallCharge(
                              data?._id,
                              data?.audioCall_fees
                            );
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
                })
              : null}
          </tbody>
        </table>
      </div>

      {acceptedHost.length > 0 ? (
        <Pagination
          page={page}
          setPage={setPage}
          totalCount={totalCount}
          totalPages={totalPages}
          setPerPage={setPerPage}
          perPage={perPage}
          options={[5, 10, 15, 20]}
        />
      ) : (
        <div>
          <Lottie
            options={{ animationData: noData, loop: true }}
            style={{ width: "10rem", height: "10rem" }}
          />
        </div>
      )}

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

      <FormAlertPopUp
        open={showChargeAlert}
        onRequestClose={handleChangeChargeClose}
        submitText="Submit"
      >
        <HostVideoCallCharge
          id={id}
          getAcceptedHost={getAcceptedHost}
          setShowChargeAlert={setShowChargeAlert}
        />
      </FormAlertPopUp>

      <FormAlertPopUp
        open={showAudioAlert}
        onRequestClose={handleAudioCallChargeClose}
        handleOpen={handleAudioCallCharge}
      >
        <HostAudioCharge
          id={id}
          getAcceptedHost={getAcceptedHost}
          setShowAudioAlert={setShowAudioAlert}
        />
      </FormAlertPopUp>
    </div>
  );
};

export default AcceptedHostTable;
