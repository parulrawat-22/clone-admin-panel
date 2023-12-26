import { useEffect, useState } from "react";
import SearchInput from "../../SearchInput";
import Button from "../../library/Button";
import "./style.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import ResponsibilitiesPopup from "../../../pages/subAdmin/responsibilitiesPopup";
import AlertPopUp from "../../AlertPopUp";
import { useApi } from "../../../base/Context/apiProvider";

const SubAdminTable = () => {
  let navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState();
  const [totalPages, setTotalPages] = useState();
  const [subAdminList, setSubAdminList] = useState([]);
  const [value, setValue] = useState("");
  const [responsibilityPopup, setResponsibilityPopup] = useState(false);
  const [responsibilities, setResponsibilities] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState("");
  const [searchParams, setSearchParams] = useState("");
  const [subAdminId, setSubAdminId] = useState("");
  const apiProvider = useApi();

  const handleSubAdmins = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.SUBADMINLIST,
      "POST",
      {
        key: value,
        page,
        perPage,
      }
    )
      .then((res) => {
        console.log(res);
        setSubAdminList(res?.result);
        setTotalCount(res?.totalCount);
        setTotalPages(res?.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleSubAdmins();
  }, [page, perPage, value]);

  const viewResponsibilities = (e) => {
    setResponsibilityPopup(true);
    setResponsibilities(e.responsibility);
  };

  const handleEditSubAdmin = (e) => {
    navigate(`/editSubAdmin/?id=${e._id}&name=${e.name}`);
  };

  const handleDeleteSubAdminClose = () => {
    setShowDeleteAlert(false);
  };

  const handleDeleteSubAdmin = (e) => {
    setShowDeleteAlert(true);
    setSubAdminId(e._id);
  };

  const handleDelete = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl +
        NetworkConfiguration.DELETESUBADMIN +
        `/${subAdminId}`,
      "DELETE"
    )
      .then((res) => {
        console.log(res);
        handleSubAdmins();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="add__wallet">
        <Button
          style={{ textAlign: "center" }}
          text="Add Sub-Admin"
          onClick={() => {
            navigate("/addsubadmin");
          }}
        />
      </div>
      <div className="banner__search__btn">
        <SearchInput placeholder="Search" />
      </div>
      <div className="subadmin__container">
        <table className="subadmin__table">
          <thead>
            <th className="subadmin__header">S.No</th>
            <th className="subadmin__header"> Name</th>
            <th className="subadmin__header">Email</th>
            <th className="subadmin__header">Responsibilities</th>
            <th className="subadmin__header">Action</th>
          </thead>
          <tbody>
            {subAdminList.map((data, index) => {
              return (
                <tr>
                  <td className="sub__admin__data">{index + 1}</td>
                  <td className="sub__admin__data">{data?.name}</td>
                  <td className="sub__admin__data">{data?.email}</td>
                  <td
                    className="sub__admin__data subadmin__view__btn"
                    onClick={() => viewResponsibilities(data)}
                  >
                    View
                  </td>
                  <td className="sub__admin__data">
                    <AiFillEdit
                      className="subadmin__edit__icon"
                      onClick={() => handleEditSubAdmin(data)}
                    />
                    <AiFillDelete
                      onClick={() => handleDeleteSubAdmin(data)}
                      className="subadmin__delete__icon"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ResponsibilitiesPopup
        modalIsOpen={responsibilityPopup}
        setIsOpen={setResponsibilityPopup}
        data={responsibilities}
      />
      <AlertPopUp
        open={showDeleteAlert}
        handleClose={handleDeleteSubAdminClose}
        header="Delete Alert"
        description="Are you sure you want to delete Sub Admin?"
        submitText="Yes"
        cancelText="No"
        onSubmitClick={handleDelete}
        onCancelClick={handleDeleteSubAdminClose}
      />
    </div>
  );
};

export default SubAdminTable;
