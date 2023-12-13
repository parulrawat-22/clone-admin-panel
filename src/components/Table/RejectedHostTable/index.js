import { useEffect, useState } from "react";
import "./style.css";
import moment from "moment";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import AlertPopUp from "../../AlertPopUp";
import { useNavigate } from "react-router-dom";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import ImagePopUpModal from "../../ImagePopUpModal";
import { useLoader } from "../../../base/Context/loaderProvider";
import SearchInput from "../../SearchInput";
import { FiSearch } from "react-icons/fi";
import Pagination from "../../Pagination";
import Lottie from "react-lottie";
import noData from "../../../base/Animation/No Data Found.json";

const RejectedHostTable = () => {
  let navigate = useNavigate();
  const [rejectedHost, setRejectedHost] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [id, setId] = useState();
  const [rejectedReason, setRejectedReason] = useState("");
  const [showImageAlert, setShowImageAlert] = useState(false);
  const [img, setImg] = useState("");
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");

  const loader = useLoader();

  const handleImageAlert = (img) => {
    setShowImageAlert(true);
    setImg(img);
  };

  const handleImageAlertClose = () => {
    setShowImageAlert(false);
  };

  useEffect(() => {
    getRejectedHost();
  }, [value, page, perPage]);

  const getRejectedHost = () => {
    loader.showLoader(true);

    fetchDataFromAPI(API_URL + NetworkConfiguration.REJECTEDHOST, "POST", {
      id: id,
      rejectedReason: rejectedReason,
      key: value,
      page,
      perPage,
    })
      .then((res) => {
        setRejectedHost(res.result);
        loader.showLoader(false);
        setTotalCount(res?.totalCount);
        setTotalPages(res?.totalPages);
      })
      .catch((err) => {
        console.log(err);
        loader.showLoader(false);
      });
  };

  const handleRejectedHostDelete = (id) => {
    console.log(id);
    setShowDeleteAlert(true);
    setId(id);
  };

  const handleRejectedHostDeleteClose = () => {
    setShowDeleteAlert(false);
  };

  const handleCancelRejectedHost = () => {
    setShowDeleteAlert(false);
    navigate("/rejectedhost");
  };

  const handleDeleteRejectedHost = () => {
    loader.showLoader(true);

    fetchDataFromAPI(
      API_URL + NetworkConfiguration.DELETEHOST + `/${id}`,
      "DELETE"
    )
      .then((res) => {
        setShowDeleteAlert(false);
        getRejectedHost();
        loader.showLoader(false);
      })
      .catch((err) => {
        console.log(err);
        loader.showLoader(false);
      });
  };

  const searchIcon = () => {
    return <FiSearch />;
  };

  const handleText = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="rejected__host__container">
      <div className="banner__search__btn">
        <SearchInput
          value={value}
          onChange={handleText}
          placeholder="Search"
          icon={searchIcon()}
        />
      </div>
      <div className="table_parent_box">
        <table className="rejected__host__table">
          <thead>
            <th className="rejected__host__header">S.No.</th>
            <th className="rejected__host__header">Host ID</th>
            <th className="rejected__host__header">Name</th>
            <th className="rejected__host__header">Date Of Birth</th>
            <th className="rejected__host__header">Email</th>
            <th className="rejected__host__header">Mobile Number</th>
            <th className="rejected__host__header">Rejected At</th>
            <th className="rejected__host__header">Rejected Reason</th>
            <th className="rejected__host__header">Profile Pic</th>
            {/* <th className="rejected__host__header">Details</th> */}
            <th className="rejected__host__header">Action</th>
          </thead>
          <tbody>
            {rejectedHost.length > 0
              ? rejectedHost.map((data, index) => {
                  return (
                    <tr>
                      <td className="rejected__host__data">{index + 1}</td>
                      <td className="rejected__host__data">{data?._id}</td>
                      <td className="rejected__host__data">{data?.name}</td>
                      <td className="rejected__host__data">
                        {data?.dateOfBirth}
                      </td>
                      <td className="rejected__host__data">{data?.email}</td>
                      <td className="rejected__host__data">
                        {data?.mobileNumber}
                      </td>
                      <td className="rejected__host__data">
                        {moment(data?.rejectedDate).format("DD/MM/YYYY LT")}
                      </td>
                      <td className="rejected__host__data">
                        {data?.rejectedReason}
                      </td>
                      <td className="rejected__host__data">
                        <AiFillEye
                          className="rejected__host__eye__icon"
                          onClick={() => handleImageAlert(data?.profilePic)}
                        />
                      </td>
                      {/* <td className="rejected__host__data">View</td> */}
                      <td className="rejected__host__data">
                        {/* <AiFillEdit className="rejected__host__edit__icon" /> */}
                        <AiFillDelete
                          className="rejected__host__delete__icon"
                          onClick={() => handleRejectedHostDelete(data._id)}
                        />
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>

      {rejectedHost.length > 0 ? (
        <Pagination
          page={page}
          setPage={setPage}
          totalCount={totalCount}
          totalPages={totalPages}
          options={[5, 10, 15, 20]}
          perPage={perPage}
          setPerPage={setPerPage}
        />
      ) : (
        !loader.loaderPopup && (
          <div>
            <Lottie
              options={{ animationData: noData, loop: true }}
              style={{ width: "10rem", height: "10rem" }}
            />
          </div>
        )
      )}

      <AlertPopUp
        open={showDeleteAlert}
        handleOpen={handleRejectedHostDelete}
        handleClose={handleRejectedHostDeleteClose}
        header="Delete Alert"
        description="Are you sure you want to delete this rejected host?"
        submitText="Yes"
        cancelText="No"
        onSubmitClick={handleDeleteRejectedHost}
        onCancelClick={handleCancelRejectedHost}
      />

      <ImagePopUpModal
        open={showImageAlert}
        handleClose={handleImageAlertClose}
        img={img}
      />
    </div>
  );
};

export default RejectedHostTable;
