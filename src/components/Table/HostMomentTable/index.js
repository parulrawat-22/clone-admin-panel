import { useEffect, useState } from "react";
import "./style.css";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";
import ImagePopUpModal from "../../ImagePopUpModal";
import moment from "moment";
import AlertPopUp from "../../AlertPopUp";
import { useLoader } from "../../../base/Context/loaderProvider";
import { FiSearch } from "react-icons/fi";
import SearchInput from "../../SearchInput";
import Pagination from "../../Pagination";
import Lottie from "react-lottie";
import noData from "../../../base/Animation/No Data Found.json";
import { useApi } from "../../../base/Context/apiProvider";

const HostMomentTable = () => {
  const [getHostMoment, setGetHostMoment] = useState([]);
  const [showImageAlert, setShowImageAlert] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [img, setImg] = useState("");
  const { id } = useParams();
  const [getId, setGetId] = useState("");
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");

  const loader = useLoader();
  const apiProvider = useApi();

  useEffect(() => {
    fetchHostMoment();
  }, [value, page, perPage, apiProvider?.apiUrl]);

  const handleDeleteMoment = (id) => {
    setShowDeleteAlert(true);
    setGetId(id);
  };

  const handleDeleteMomentClose = () => {
    setShowDeleteAlert(false);
  };

  const handleImageAlert = (img) => {
    setShowImageAlert(true);
    setImg(img);
  };

  const handleImageAlertClose = () => {
    setShowImageAlert(false);
  };

  const handleMomentDelete = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.DELETEHOSTMOMENT + `/${getId}`,
      "DELETE"
    )
      .then((res) => {
        loader.showLoader(false);
        console.log(res);
        fetchHostMoment();
        setShowDeleteAlert(false);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };

  const fetchHostMoment = (apiProvider) => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.HOSTMOMENT,
      "POST",
      id
        ? { hostId: id }
        : {
            key: value,
            page,
            perPage,
          }
    )
      .then((res) => {
        loader.showLoader(false);
        setGetHostMoment(res.result);
        setTotalCount(res?.totalCount);
        setTotalPages(res?.totalPages);
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
    <div className="host__moment__container">
      <div className="banner__search__btn">
        <SearchInput
          value={value}
          onChange={handleText}
          placeholder="Search"
          icon={searchIcon()}
        />
      </div>
      <div className="table_parent_box">
        <table className="host__moment__table">
          <thead>
            <th className="host__moment__header">S.No</th>
            {!id && <th className="host__moment__header">Host Name</th>}
            <th className="host__moment__header">Caption</th>
            <th className="host__moment__header">Likes</th>
            <th className="host__moment__header">Image/Video</th>
            <th className="host__moment__header">Created At</th>
            <th className="host__moment__header">Action</th>
          </thead>
          <tbody>
            {getHostMoment.length > 0
              ? getHostMoment.map((data, index) => {
                  return (
                    <tr>
                      <td className="host__moment__data">
                        {(page - 1) * perPage + index + 1}
                      </td>
                      {!id && (
                        <td className="host__moment__data">
                          {data?.hostId?.name}
                        </td>
                      )}
                      <td className="host__moment__data">{data?.subject}</td>
                      <td className="host__moment__data">{data?.likes}</td>
                      <td className="host__moment__data ">
                        <AiFillEye
                          onClick={() => {
                            handleImageAlert(data?.postImage);
                          }}
                          className="host__moment__eye__icon"
                        />
                      </td>
                      <td className="host__moment__data">
                        {moment(data?.postDate).format("DD/MM/YYYY , LT")}
                      </td>
                      <td className="host__moment__data">
                        <AiFillEdit className="host__moment__edit__icon" />
                        <AiFillDelete
                          onClick={() => {
                            handleDeleteMoment(data?._id);
                          }}
                          className="host__moment__delete__icon"
                        />
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>

      {getHostMoment.length > 0 ? (
        <Pagination
          page={page}
          setPage={setPage}
          perPage={perPage}
          setPerPage={setPerPage}
          totalCount={totalCount}
          totalPages={totalPages}
          options={[5, 10, 15, 20]}
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
        handleOpen={handleDeleteMoment}
        handleClose={handleDeleteMomentClose}
        submitText="Yes"
        cancelText="No"
        header="Delete Alert"
        description="Are you sure you want to delete this host moment?"
        onSubmitClick={handleMomentDelete}
        onCancelClick={handleDeleteMomentClose}
      />
      <ImagePopUpModal
        open={showImageAlert}
        handleClose={handleImageAlertClose}
        img={img}
      />
    </div>
  );
};

export default HostMomentTable;
