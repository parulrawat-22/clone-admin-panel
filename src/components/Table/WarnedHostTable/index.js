import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import "./style.css";
import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import AlertPopUp from "../../AlertPopUp";
import { useSearchParams } from "react-router-dom";
// import moment from "moment";
import { useLoader } from "../../../base/Context/loaderProvider";

const WarnedHostTable = () => {
  const [warnedHostList, setWarnedHostList] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [id, setId] = useState("");

  const loader = useLoader();

  const handleDeleteAlert = () => {
    setShowDeleteAlert(true);
  };

  const handleDeleteAlertClose = () => {
    setShowDeleteAlert(false);
  };

  useEffect(() => {
    getWarnedHost();
  }, []);

  const getWarnedHost = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.WARNEDHOST,
      "POST",
      searchParams.get("id") ? { hostId: searchParams.get("id") } : {}
    )
      .then((res) => {
        loader.showLoader(false);
        setWarnedHostList(res.result);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };

  const handleOnClickAlert = (id) => {
    setShowDeleteAlert(true);
    setId(id);
  };

  const handleDelete = () => {
    loader.showLoader(true);

    fetchDataFromAPI(
      API_URL + NetworkConfiguration.DELETEWARNING + `/${id}`,
      "DELETE"
    )
      .then((res) => {
        loader.showLoader(false);
        setShowDeleteAlert(false);
        getWarnedHost();
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };

  return (
    <div className="warned__host__container">
      <table className="warned__host__table">
        <thead>
          <th className="warned__host__header">S.No.</th>
          {!searchParams.get("id") && (
            <>
              <th className="warned__host__header">Host ID</th>
              <th className="warned__host__header">Host Name</th>
            </>
          )}
          <th className="warned__host__header">Title</th>
          <th className="warned__host__header">Description</th>
          <th className="warned__host__header">Action</th>
        </thead>
        <tbody>
          {warnedHostList.map((data, index) => {
            return (
              <tr>
                <td className="warned__host__data">{index + 1}</td>
                {!searchParams.get("id") && (
                  <>
                    <td className="warned__host__data">{data?.hostId?._id}</td>
                    <td className="warned__host__data">{data?.hostId?.name}</td>
                  </>
                )}
                <td className="warned__host__data">{data?.title}</td>
                <td className="warned__host__data">{data?.body}</td>
                <td className="warned__host__data warned__host__icon">
                  <AiFillDelete
                    onClick={() => {
                      handleOnClickAlert(data?._id);
                    }}
                    className="warned__host__delete__icon"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <AlertPopUp
        open={showDeleteAlert}
        handleOpen={handleDeleteAlert}
        handleClose={handleDeleteAlertClose}
        header="Delete Alert"
        description="Are you sure you want to delete this warning?"
        submitText="Yes"
        cancelText="No"
        onSubmitClick={handleDelete}
        onCancelClick={handleDeleteAlertClose}
      />
    </div>
  );
};

export default WarnedHostTable;
