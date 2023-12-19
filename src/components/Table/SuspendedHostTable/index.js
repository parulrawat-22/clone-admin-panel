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
import { FiSearch } from "react-icons/fi";
import SearchInput from "../../SearchInput";
import Pagination from "../../Pagination";
import Lottie from "react-lottie";
import noData from "../../../base/Animation/No Data Found.json";

const SuspendedHostTable = () => {
  const [suspendedHostList, setSuspendedHostList] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [id, setId] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");

  const loader = useLoader();

  const handleDeleteAlert = () => {
    setShowDeleteAlert(true);
  };

  const handleDeleteAlertClose = () => {
    setShowDeleteAlert(false);
  };

  useEffect(() => {
    getSuspendedHost();
  }, [value, page, perPage]);

  const getSuspendedHost = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.SUSPENDEDHOST,
      "POST",
      searchParams.get("id")
        ? { hostId: searchParams.get("id") }
        : {
            key: value,
            page,
            perPage,
          }
    )
      .then((res) => {
        loader.showLoader(false);
        setSuspendedHostList(res.result);
        setTotalCount(res?.totalCount);
        setTotalPages(res?.totalPages);
      })
      .catch((err) => {
        console.log(err);
        loader.showLoader(false);
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

  const handleText = (e) => {
    setValue(e.target.value);
  };

  const searchIcon = () => {
    return <FiSearch />;
  };
  return (
    <div className="suspended__host__table__container">
      <div className="banner__search__btn">
        <SearchInput
          value={value}
          onChange={handleText}
          placeholder="Search"
          icon={searchIcon()}
        />
      </div>
      <div className="table_parent_box">
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
            {suspendedHostList.length > 0
              ? suspendedHostList.map((data, index) => {
                  return (
                    <tr>
                      <td className="suspended__host__table__data">
                        {(page - 1) * perPage + index + 1}
                      </td>
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
                        {moment(data?.suspensionEndDate).format(
                          "DD/MM/YYYY , LT"
                        )}
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
                })
              : null}
          </tbody>
        </table>
      </div>

      {suspendedHostList.length > 0 ? (
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
          <p className="no__data__found"> No Data Found</p>
        </div>
      )}

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
