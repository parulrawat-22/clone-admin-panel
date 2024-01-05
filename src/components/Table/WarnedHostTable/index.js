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
import { FiSearch } from "react-icons/fi";
import SearchInput from "../../SearchInput";
import { useDebounce } from "use-debounce";
import Pagination from "../../Pagination";
import Lottie from "react-lottie";
import noData from "../../../base/Animation/No Data Found.json";
import { useApi } from "../../../base/Context/apiProvider";

const WarnedHostTable = () => {
  const [warnedHostList, setWarnedHostList] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [id, setId] = useState("");
  const [value, setValue] = useState("");
  const [key] = useDebounce(value, 1000);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");

  console.log("key", key);
  console.log("value", value);

  const loader = useLoader();
  const apiProvider = useApi();

  const handleDeleteAlert = () => {
    setShowDeleteAlert(true);
  };

  const handleDeleteAlertClose = () => {
    setShowDeleteAlert(false);
  };

  useEffect(() => {
    getWarnedHost();
  }, [value, perPage, page, apiProvider?.apiUrl]);

  const getWarnedHost = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.WARNEDHOST,
      "POST",
      searchParams.get("id")
        ? { hostId: searchParams.get("id") }
        : {
            key: key,
            page,
            perPage,
          }
    )
      .then((res) => {
        setTotalCount(res?.totalCount);
        setTotalPages(res?.totalPages);
        setWarnedHostList(res.result);
      })
      .catch((err) => {
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
      apiProvider?.apiUrl + NetworkConfiguration.DELETEWARNING + `/${id}`,
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

  const searchIcon = () => {
    return <FiSearch />;
  };

  const handleText = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <SearchInput
        value={value}
        onChange={handleText}
        placeholder="Search"
        icon={searchIcon()}
      />
      <div className="warned__host__container">
        <div className="table_parent_box">
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
              {warnedHostList.length > 0
                ? warnedHostList.map((data, index) => {
                    return (
                      <tr>
                        <td className="warned__host__data">
                          {(page - 1) * perPage + index + 1}
                        </td>
                        {!searchParams.get("id") && (
                          <>
                            <td className="warned__host__data">
                              {data?.hostId?._id}
                            </td>
                            <td className="warned__host__data">
                              {data?.hostId?.name}
                            </td>
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
                  })
                : null}
            </tbody>
          </table>
        </div>

        {warnedHostList.length > 0 ? (
          <Pagination
            page={page}
            setPage={setPage}
            totalCount={totalCount}
            totalPages={totalPages}
            perPage={perPage}
            setPerPage={setPerPage}
            options={[5, 10, 15, 20]}
          />
        ) : (
          !loader.loaderPopup && (
            <div className="host__no__data__found__icon">
              <Lottie
                options={{ animationData: noData, loop: true }}
                style={{ width: "20rem", height: "20rem" }}
              />
              <p className="no__data__found">No Data Found</p>
            </div>
          )
        )}

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
    </>
  );
};

export default WarnedHostTable;
