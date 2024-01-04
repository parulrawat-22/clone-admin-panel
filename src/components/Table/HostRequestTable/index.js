import { BsFillEyeFill } from "react-icons/bs";
import "./style.css";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import AlertPopUp from "../../AlertPopUp";
import { useNavigate } from "react-router-dom";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import { NetworkConfiguration } from "../../../network/NetworkConfiguration";
import ImagePopUpModal from "../../ImagePopUpModal";
import { useLoader } from "../../../base/Context/loaderProvider";
import SearchInput from "../../SearchInput";
import { FiSearch } from "react-icons/fi";
import Pagination from "../../Pagination";
import noData from "../../../base/Animation/No Data Found.json";
import Lottie from "react-lottie";
import { useApi } from "../../../base/Context/apiProvider";

const HostRequestTable = () => {
  let navigate = useNavigate();
  const [hostrequest, setHostRequest] = useState([]);
  const [showAcceptedHostAlert, setShowAcceptedHostAlert] = useState(false);
  const [showRejectedHostAlert, setShowRejectedHostAlert] = useState();
  const [showRejectedReason, setShowRejectedReason] = useState();
  const [id, setId] = useState();
  const [rejectedReason, setRejectedReason] = useState("");
  const [showImageAlert, setShowImageAlert] = useState("");
  const [img, setImg] = useState("");
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");

  const loader = useLoader();
  const apiProvider = useApi();

  const handleReasonChange = (e) => {
    setRejectedReason(e.target.value);
  };

  useEffect(() => {
    getHostRequest();
  }, [value, page, perPage, apiProvider?.apiUrl]);

  const getHostRequest = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.PENDINGHOST,
      "POST",
      {
        key: value,
        page,
        perPage,
      }
    )
      .then((res) => {
        setHostRequest(res?.result);
        loader.showLoader(false);
        setTotalCount(res?.totalCount);
        setTotalPages(res?.totalPages);
      })
      .catch((err) => {
        console.log(err);
        loader.showLoader(false);
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
    loader.showLoader(true);

    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.REQUESTEDHOST,
      "PUT",
      {
        id: id,
      }
    )
      .then((res) => {
        loader.showLoader(false);

        setShowAcceptedHostAlert(false);
        navigate("/acceptedhost");
      })
      .catch((err) => {
        loader.showLoader(false);

        console.log(err, "err--------");
      });
  };

  const handleRejectedHost = () => {
    loader.showLoader(true);

    console.log("Rejected Reason", rejectedReason);
    console.log("Rejected Id", id);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.REJECTHOST,
      "PUT",
      {
        id: id,
        rejectedReason: rejectedReason,
      }
    )
      .then((res) => {
        loader.showLoader(false);

        setShowRejectedHostAlert(false);
        navigate("/rejectedhost");
      })
      .catch((err) => {
        console.log(err);
        loader.showLoader(false);
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

  const handleImageAlert = (img) => {
    console.log("1234", img);
    setShowImageAlert(true);
    setImg(img);
  };

  const handleImageAlertClose = () => {
    setShowImageAlert(false);
  };

  const searchIcon = () => {
    return <FiSearch />;
  };

  const handleText = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="host__request__container">
      <div className="banner__search__btn">
        <SearchInput
          onChange={handleText}
          value={value}
          placeholder="Search"
          icon={searchIcon()}
        />
      </div>
      <div className="table_parent_box">
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
            {hostrequest.length > 0
              ? hostrequest.map((data, index) => {
                  return (
                    <tr>
                      <td className="host__request__data">
                        {(page - 1) * perPage + index + 1}
                      </td>
                      <td className="host__request__data">{data?._id}</td>
                      <td className="host__request__data">{data?.name}</td>
                      <td className="host__request__data">{data?.gender}</td>
                      <td className="host__request__data">
                        {data?.dateOfBirth}
                      </td>
                      <td className="host__request__data">{data?.email}</td>
                      <td className="host__request__data">
                        {data?.mobileNumber}
                      </td>
                      <td className="host__request__data">{data?.pinCode}</td>
                      <td className="host__request__data">{data?.country}</td>
                      <td className="host__request__data">{data?.state}</td>
                      <td className="host__request__data">
                        {data?.proffession}
                      </td>
                      <td className="host__request__data">{data?.addBio}</td>
                      <td className="host__request__data">
                        <BsFillEyeFill
                          onClick={() => {
                            handleImageAlert(data?.presentationPic);
                          }}
                          className="host__request__eye__icon"
                        />
                      </td>
                      <td className="host__request__data">
                        <div className="host__request__action__icons">
                          <TiTick
                            onClick={() => {
                              handleAcceptedHostsAlert(data?._id);
                            }}
                            className="host__request__accept__icon"
                          />
                          <RxCross2
                            onClick={() => {
                              handleRejectedHostsAlert(data?._id);
                            }}
                            className="host__request__reject__icon"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>

      {hostrequest.length > 0 ? (
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
        <div className="host__no__data__found__icon">
          <Lottie
            options={{ animationData: noData, loop: true }}
            style={{ width: "20rem", height: "20rem" }}
          />
          <p className="host__no_data_found">No Data Found</p>
        </div>
      )}

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
        header="Reject Host?"
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

      <ImagePopUpModal
        open={showImageAlert}
        handleOpen={handleImageAlert}
        handleClose={handleImageAlertClose}
        images={img}
      />
    </div>
  );
};

export default HostRequestTable;
