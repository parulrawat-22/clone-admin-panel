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
import moment from "moment";
import { useLoader } from "../../../base/Context/loaderProvider";
import SearchInput from "../../SearchInput";
import { FiSearch } from "react-icons/fi";
import { useDebounce } from "use-debounce";
import Pagination from "../../Pagination";
import Lottie from "react-lottie";
import noData from "../../../base/Animation/No Data Found.json";
import { useApi } from "../../../base/Context/apiProvider";

const WarnedUserTable = () => {
  const [warnedUserList, setWarnedUserList] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [id, setId] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");

  const [key] = useDebounce(value, 1000);

  const loader = useLoader();
  const apiProvider = useApi();

  const handleDeleteAlert = () => {
    setShowDeleteAlert(true);
  };

  const handleDeleteAlertClose = () => {
    setShowDeleteAlert(false);
  };

  useEffect(() => {
    getWarnedUser(apiProvider);
  }, [value, page, perPage]);

  const getWarnedUser = (apiProvider) => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.WARNEDUSER,
      "POST",
      searchParams.get("id")
        ? { userId: searchParams.get("id") }
        : {
            key: key,
            page,
            perPage,
          }
    )
      .then((res) => {
        loader.showLoader(false);
        setWarnedUserList(res.result);
        setTotalCount(res?.totalCount);
        setTotalPages(res?.totalPages);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };

  const handleAlertDelete = (id) => {
    setShowDeleteAlert(true);
    setId(id);
  };

  const handleDelete = (apiProvider) => {
    loader.showLoader(true);

    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.DELETEWARNING + `/${id}`,
      "DELETE"
    )
      .then((res) => {
        setShowDeleteAlert(false);
        loader.showLoader(false);
        getWarnedUser();
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
    <div className="warned__user__container">
      <div className="banner__search__btn">
        <SearchInput
          value={value}
          onChange={handleText}
          placeholder="Search"
          icon={searchIcon()}
        />
      </div>
      <div className="table_parent_box">
        <table className="warned__user__table">
          <thead>
            <th className="warned__user__header">S.No.</th>
            {!searchParams.get("id") && (
              <>
                <th className="warned__user__header">User ID</th>
                <th className="warned__user__header">User Name</th>
              </>
            )}
            <th className="warned__user__header">Title</th>
            <th className="warned__user__header">Description</th>
            <th className="warned__user__header">Created At</th>
            <th className="warned__user__header">Action</th>
          </thead>
          <tbody>
            {warnedUserList.length > 0
              ? warnedUserList.map((data, index) => {
                  return (
                    <tr>
                      <td className="warned__user__data">
                        {(page - 1) * perPage + index + 1}
                      </td>
                      {!searchParams.get("id") && (
                        <>
                          <td className="warned__user__data">{data?._id}</td>
                          <td className="warned__user__data">
                            {data?.userId?.name}
                          </td>
                        </>
                      )}
                      <td className="warned__user__data">{data?.title}</td>
                      <td className="warned__user__data">{data?.body}</td>
                      <td className="warned__user__data">
                        {moment(data?.createdAt).format("DD/MM/YYYY")}
                      </td>
                      <td className="warned__user__data">
                        <AiFillDelete
                          onClick={() => {
                            handleAlertDelete(data?._id);
                          }}
                          className="warned__user__delete__icon"
                        />
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>

      {warnedUserList.length > 0 ? (
        <Pagination
          page={page}
          perPage={perPage}
          setPage={setPage}
          setPerPage={setPerPage}
          totalCount={totalCount}
          totalPages={totalPages}
          options={[5, 10, 15, 20, 25, 30]}
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
  );
};

export default WarnedUserTable;
