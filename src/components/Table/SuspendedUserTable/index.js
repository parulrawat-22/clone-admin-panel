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
import InputField from "../../library/InputField";
import Button from "../../library/Button";
import WebModal from "../../WebModal";
import { useLoader } from "../../../base/Context/loaderProvider";
import SearchInput from "../../SearchInput";
import { FiSearch } from "react-icons/fi";

const SuspendedUserTable = () => {
  const [suspendedUserList, setSuspendedUserList] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [id, setId] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState("");

  const loader = useLoader();

  const handleDeleteAlert = () => {
    setShowDeleteAlert(true);
  };

  const handleDeleteAlertClose = () => {
    setShowDeleteAlert(false);
  };

  const getSuspendedUserList = () => {
    loader.showLoader(true);

    fetchDataFromAPI(
      API_URL + NetworkConfiguration.SUSPENDEDUSER,
      "POST",
      searchParams.get("id")
        ? { userId: searchParams.get("id") }
        : {
            key: value,
          }
    )
      .then((res) => {
        loader.showLoader(false);
        setSuspendedUserList(res.result);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getSuspendedUserList();
  }, [value]);

  const handleOnClickDelete = (id) => {
    setShowDeleteAlert(true);
    setId(id);
  };

  const handleOnClickEdit = (id) => {
    setShowEditAlert(true);
    setId(id);
  };

  const handleOnClickEditClose = () => {
    setShowEditAlert(false);
  };

  const handleAlertDelete = () => {
    loader.showLoader(true);

    fetchDataFromAPI(
      API_URL + NetworkConfiguration.DELETESUSPENSION + `/${id}`,
      "DELETE"
    )
      .then((res) => {
        loader.showLoader(false);

        setShowDeleteAlert(false);
        getSuspendedUserList();
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
    <div className="suspended__table__container">
      <div className="banner__search__btn">
        <SearchInput
          value={value}
          onChange={handleText}
          placeholder="Search"
          icon={searchIcon()}
        />
      </div>
      {searchParams.get("id") ? (
        <table className="suspended__table">
          <thead>
            <th className="suspended__table__header">S.no</th>
            <th className="suspended__table__header">Suspended From</th>
            <th className="suspended__table__header">Suspended To</th>
            <th className="suspended__table__header">Action</th>
          </thead>
          <tbody>
            {suspendedUserList.map((data, index) => {
              return (
                <tr>
                  <td className="suspended__table__data">{index + 1}</td>
                  <td className="suspended__table__data">
                    {moment(data?.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="suspended__table__data">
                    {moment(data?.suspensionEndDate).format("DD/MM/YYYY")}
                  </td>
                  <td className="suspended__table__data suspended__table__edit__icon ">
                    <AiFillEdit
                      onClick={() => {
                        handleOnClickEdit(data?._id);
                      }}
                    />
                    <AiFillDelete
                      className="suspended__table__delete__icon"
                      onClick={() => {
                        handleOnClickDelete(data?._id);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <table className="suspended__table">
          <thead>
            <th className="suspended__table__header">S.no</th>
            <th className="suspended__table__header">User ID</th>
            <th className="suspended__table__header">User Name</th>
            <th className="suspended__table__header">Suspended From</th>
            <th className="suspended__table__header">Suspended To</th>
            <th className="suspended__table__header">Action</th>
          </thead>
          <tbody>
            {suspendedUserList.map((data, index) => {
              return (
                <tr>
                  <td className="suspended__table__data">{index + 1}</td>
                  <td className="suspended__table__data">{data?._id}</td>
                  <td className="suspended__table__data">
                    {data?.userId?.name}
                  </td>
                  <td className="suspended__table__data">
                    {moment(data?.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="suspended__table__data">
                    {moment(data?.suspensionEndDate).format("DD/MM/YYYY")}
                  </td>
                  <td className="suspended__table__data suspended__table__edit__icon ">
                    <AiFillEdit
                      onClick={() => {
                        handleOnClickEdit(data?._id);
                      }}
                    />
                    <AiFillDelete
                      className="suspended__table__delete__icon"
                      onClick={() => {
                        handleOnClickDelete(data?._id);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <AlertPopUp
        open={showDeleteAlert}
        handleOpen={handleDeleteAlert}
        handleClose={handleDeleteAlertClose}
        header="Delete Alert"
        description="Are you sure you want to delete this Suspended User?"
        submitText="Yes"
        cancelText="No"
        onSubmitClick={handleAlertDelete}
        onCancelClick={handleDeleteAlertClose}
      />

      <WebModal open={showEditAlert} onRequestClose={handleOnClickEditClose}>
        <h2>Edit Suspended User</h2>
        <br />
        <InputField type="date" />
        <br />
        <Button text="Update" />
      </WebModal>
    </div>
  );
};

export default SuspendedUserTable;
