import { AiFillDelete } from "react-icons/ai";
import "./style.css";
import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import AlertPopUp from "../../AlertPopUp";
import { errorToast, successToast } from "../../../utils/toast";
import { useLoader } from "../../../base/Context/loaderProvider";
import { FiSearch } from "react-icons/fi";
import SearchInput from "../../SearchInput";
import Pagination from "../../Pagination";

const NotificationTable = () => {
  const [getNotification, setGetNotification] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState("");
  const [id, setId] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const loader = useLoader();

  const handleDeleteNotification = (id) => {
    setShowDeleteAlert(true);
    setId(id);
  };

  const handleDeleteNotificationClose = () => {
    setShowDeleteAlert(false);
  };

  useEffect(() => {
    fetchNotification();
  }, [page, perPage]);

  const fetchNotification = () => {
    loader.showLoader(true);

    fetchDataFromAPI(API_URL + NetworkConfiguration.GETNOTIFICATION, "POST", {
      page,
      perPage,
    })
      .then((res) => {
        setGetNotification(res.result);
        loader.showLoader(false);
        setTotalCount(res.totalCount);
        setTotalPages(res.totalPages);
      })
      .catch((err) => {
        console.log(err);
        loader.showLoader(false);
      });
  };

  const handleNotification = () => {
    loader.showLoader(true);

    fetchDataFromAPI(
      API_URL + NetworkConfiguration.DELETENOTIFICATION + `/${id}`,
      "DELETE"
    )
      .then((res) => {
        loader.showLoader(false);

        console.log(res);
        setShowDeleteAlert(false);
        successToast(res.message);
        fetchNotification();
      })
      .catch((err) => {
        loader.showLoader(false);

        errorToast(err.message);
        console.log(err);
      });
  };

  const searchIcon = () => {
    return <FiSearch />;
  };
  return (
    <div className="notification__table__container">
      <div className="banner__search__btn">
        <SearchInput placeholder="Search" icon={searchIcon()} />
      </div>
      <table className="notification__table__table">
        <thead>
          <th className="notification__table__header">S.No.</th>
          <th className="notification__table__header">User ID</th>
          <th className="notification__table__header">Title</th>
          <th className="notification__table__header">Message</th>
          <th className="notification__table__header">Action</th>
        </thead>
        <tbody>
          {getNotification &&
            getNotification.length > 0 &&
            getNotification.map((data, index) => {
              return (
                <tr>
                  <td className="notification__table__data">{index + 1}</td>
                  <td className="notification__table__data">{data?._id}</td>
                  <td className="notification__table__data">{data?.title}</td>
                  <td className="notification__table__data">{data?.body}</td>
                  <td className="notification__table__data">
                    <AiFillDelete
                      onClick={() => {
                        handleDeleteNotification(data?._id);
                      }}
                      className="notification__table__delete__icon"
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <Pagination
        page={page}
        setPage={setPage}
        perPage={perPage}
        setPerPage={setPerPage}
        totalCount={totalCount}
        totalPages={totalPages}
        options={[5, 10, 15, 20]}
      />
      <AlertPopUp
        open={showDeleteAlert}
        handleOpen={handleDeleteNotification}
        handleClose={handleDeleteNotificationClose}
        header="Delete Alert"
        description="Are you sure you want to delete this notification?"
        submitText="Yes"
        cancelText="No"
        onSubmitClick={handleNotification}
        onCancelClick={handleDeleteNotificationClose}
      />
    </div>
  );
};

export default NotificationTable;
