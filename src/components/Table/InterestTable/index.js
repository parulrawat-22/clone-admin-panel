import { useEffect, useState } from "react";
import SearchInput from "../../SearchInput";
import Button from "../../library/Button";
import "./style.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import moment from "moment";
import Pagination from "../../Pagination";
import FormAlertPopUp from "../../FormAlertPopUp";
import InterestForm from "../../formComponents/InterestForm";
import AlertPopUp from "../../AlertPopUp";
import { errorToast, successToast } from "../../../utils/toast";
import { useApi } from "../../../base/Context/apiProvider";

const InterestTable = () => {
  const [interestData, setInterestData] = useState([]);
  const [showInterestForm, setShowInterestForm] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [id, setId] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const apiProvider = useApi();

  const handleEditAlert = (id, name) => {
    setShowEditForm(true);
    setId(id);
    setName(name);
  };

  const handleEditAlertClose = () => {
    setShowEditForm(false);
  };

  const handleDeleteAlert = (id) => {
    setShowDeleteAlert(true);
    setId(id);
  };

  const handleDeleteAlertClose = () => {
    setShowDeleteAlert(false);
  };

  const handleAddInterest = () => {
    setShowInterestForm(true);
  };

  const handleAddInterestClose = (id) => {
    setShowInterestForm(false);
    setId(id);
  };

  useEffect(() => {
    fetchInterestData();
  }, [apiProvider?.apiUrl, page, perPage]);

  const fetchInterestData = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.GETINTEREST,
      "POST",
      {
        key: value,
        page,
        perPage,
      }
    )
      .then((res) => {
        setValue(res?.value);
        setInterestData(res?.result);
        setTotalCount(res?.totalCount);
        setTotalPages(res?.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = () => {
    setShowInterestForm();
    fetchInterestData();
  };

  const handleDeleteApi = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.DELETEINTEREST + `/${id}`,
      "DELETE",
      {
        name: interestData,
      }
    )
      .then((res) => {
        successToast(res?.message);

        console.log(res);
        setShowDeleteAlert(false);
        fetchInterestData();
      })
      .catch((err) => {
        errorToast(err?.message);

        console.log(err);
      });
  };

  const onEdit = () => {
    setShowEditForm(false);
    fetchInterestData();
  };

  return (
    <div>
      <div className="add__wallet">
        <Button
          style={{ textAlign: "center" }}
          text="Add Interest"
          onClick={handleAddInterest}
        />
      </div>
      <div className="banner__search__btn">
        <SearchInput placeholder="Search" />
      </div>
      <div className="interest__container">
        <table className="interest__table">
          <thead>
            <th className="interest__header">S.No</th>
            <th className="interest__header">Interest Name</th>
            <th className="interest__header">Created At</th>
            <th className="interest__header">Updated At</th>
            <th className="interest__header">Actions</th>
          </thead>
          <tbody>
            {interestData.map((data, index) => {
              return (
                <tr>
                  <td className="interest__data">
                    {(page - 1) * perPage + index + 1}
                  </td>
                  <td className="interest__data">{data?.name}</td>
                  <td className="interest__data">
                    {moment(data?.createdAt).format("DD/MM/YYYY , LT")}
                  </td>
                  <td className="interest__data">
                    {moment(data?.updatedAt).format("DD/MM/YYYY , LT")}
                  </td>
                  <td className="interest__data">
                    <AiFillEdit
                      onClick={() => handleEditAlert(data?._id, data?.name)}
                      className="interest__edit__icon"
                    />
                    <AiFillDelete
                      onClick={() => handleDeleteAlert(data?._id)}
                      className="interest__delete__icon"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <FormAlertPopUp
        open={showEditForm}
        handleOpen={handleAddInterest}
        onRequestClose={handleEditAlertClose}
      >
        {" "}
        <InterestForm
          name={name}
          onEdit={onEdit}
          id={id}
          setName={setName}
          edit={true}
        />
      </FormAlertPopUp>

      <AlertPopUp
        open={showDeleteAlert}
        handleClose={handleDeleteAlertClose}
        handleOpen={handleDeleteAlert}
        header="Delete Alert"
        description="Are you sure you want to delete this interest?"
        submitText="Yes"
        cancelText="No"
        onSubmitClick={handleDeleteApi}
        onCancelClick={handleDeleteAlertClose}
      />

      <FormAlertPopUp
        open={showInterestForm}
        handleOpen={handleAddInterest}
        onRequestClose={handleAddInterestClose}
      >
        <InterestForm onSubmit={onSubmit} />
      </FormAlertPopUp>

      <Pagination
        page={page}
        setPage={setPage}
        perPage={perPage}
        setPerPage={setPerPage}
        totalCount={totalCount}
        totalPages={totalPages}
        options={[5, 10, 15, 20]}
      />
    </div>
  );
};

export default InterestTable;
