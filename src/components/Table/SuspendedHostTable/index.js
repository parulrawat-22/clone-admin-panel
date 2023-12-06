import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import "./style.css";
import { useEffect, useState } from "react";
import moment from "moment";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import AlertPopUp from "../../AlertPopUp";
import { useSearchParams } from "react-router-dom";
import { useLoader } from "../../../base/Context/loaderProvider";

const SuspendedHostTable = () => {
  const [suspendedHostList, setSuspendedHostList] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [id, setId] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const loader = useLoader();

  const handleDeleteAlert = () => {
    setShowDeleteAlert(true);
  };

  const handleDeleteAlertClose = () => {
    setShowDeleteAlert(false);
  };

  useEffect(() => {
    getSuspendedHost();
  }, []);

  const getSuspendedHost = () => {
    loader.showLoader(true);

    fetchDataFromAPI(
      API_URL + NetworkConfiguration.SUSPENDEDHOST,
      "POST",
      searchParams.get("id") ? { hostId: searchParams.get("id") } : {}
    )
      .then((res) => {
        loader.showLoader(false);

        setSuspendedHostList(res.result);
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

  const handleDeleteApi = () => {
    loader.showLoader(true);

    fetchDataFromAPI(
      API_URL + NetworkConfiguration.DELETESUSPENSION + `/${id}`,
      "DELETE"
    )
      .then((res) => {
        setShowDeleteAlert(false);
        loader.showLoader(false);

        getSuspendedHost();
      })
      .catch((err) => {
        loader.showLoader(false);

        console.log(err);
      });
  };
  return (
    <div className="suspended__host__table__container">
      <table className="suspended__table">
        <thead>
          <th className="suspended__host__table__header">S.no</th>
          {!searchParams.get("id") && (
            <>
              <th className="suspended__host__table__header">Host ID</th>
              <th className="suspended__host__table__header">Host Name</th>
            </>
          )}
          <th className="suspended__host__table__header">Suspended From</th>
          <th className="suspended__host__table__header">Suspended To</th>
          <th className="suspended__host__table__header">Action</th>
        </thead>
        <tbody>
          {suspendedHostList.map((data, index) => {
            return (
              <tr>
                <td className="suspended__host__table__data">{index + 1}</td>
                {!searchParams.get("id") && (
                  <>
                    <td className="suspended__host__table__data">
                      {data?._id}
                    </td>
                    <td className="suspended__host__table__data">
                      {data?.hostId?.name}
                    </td>
                  </>
                )}
                <td className="suspended__host__table__data">
                  {moment(data?.createdAt).format("DD/MM/YYYY , LT")}
                </td>
                <td className="suspended__host__table__data">
                  {moment(data?.suspensionEndDate).format("DD/MM/YYYY , LT")}
                </td>
                <td className="suspended__host__table__data">
                  <AiFillEdit className="suspended__host__table__edit__icon" />
                  <AiFillDelete
                    onClick={() => {
                      handleOnClickAlert(data?._id);
                      console.log(data?._id, "data id");
                    }}
                    className="suspended__host__table__delete__icon"
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
        description="Are you sure you want to delete this suspended host?"
        submitText="Yes"
        cancelText="No"
        onSubmitClick={handleDeleteApi}
        onCancelClick={handleDeleteAlertClose}
      />
    </div>
  );
};

export default SuspendedHostTable;
