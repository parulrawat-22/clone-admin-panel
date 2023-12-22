import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import "./style.css";
import Button from "../../components/library/Button";
import FormAlertPopUp from "../../components/FormAlertPopUp";
import { useEffect, useState } from "react";
import CreateWalletForm from "../../components/formComponents/CreateWalletForm";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../network/NetworkConfiguration";
import moment from "moment";
import AlertPopUp from "../../components/AlertPopUp";
import { errorToast, successToast } from "../../utils/toast";
import SearchInput from "../../components/SearchInput";
import { FiSearch } from "react-icons/fi";
import Pagination from "../../components/Pagination";
import Lottie from "react-lottie";
import noData from "../../base/Animation/No Data Found.json";
import { useLoader } from "../../base/Context/loaderProvider";
import { useApi } from "../../base/Context/apiProvider";

const Coin = () => {
  const [showCreateWallet, setShowCreateWallet] = useState(false);
  const [getCoin, setGetCoin] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [id, setId] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const loader = useLoader();
  const apiProvider = useApi();

  const handleDeleteAlert = () => {
    setShowDeleteAlert(true);
  };

  const handleDeleteAlertClose = () => {
    setShowDeleteAlert(false);
  };
  useEffect(() => {
    fetchCoin(apiProvider);
  }, []);

  const fetchCoin = (apiProvider) => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.GETWALLET,
      "POST",
      {
        page,
        perPage,
      }
    )
      .then((res) => {
        loader.showLoader(false);
        setGetCoin(res.result);
        setTotalCount(res.totalCount);
        setTotalPages(res.totalPages);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };

  const handleOnClickAlert = (id) => {
    setId(id);
    setShowDeleteAlert(true);
  };

  const handleDelete = (apiProvider) => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.DELETECOIN + `/${id}`,
      "DELETE"
    )
      .then((res) => {
        setShowDeleteAlert(false);
        successToast(res.message);
        fetchCoin();
      })
      .catch((err) => {
        console.log(err);
        errorToast(err.message);
      });
  };

  const onSubmit = () => {
    setShowCreateWallet(false);
    fetchCoin();
  };

  const handleCreateWallet = () => {
    setShowCreateWallet(true);
  };

  const handleCreateWalletClose = () => {
    setShowCreateWallet(false);
  };

  const handleOnClickEdit = (id) => {
    setShowEditAlert(true);
    setId(id);
  };

  const handleOnClickEditClose = () => {
    setShowEditAlert(false);
  };

  const onClickEdit = () => {
    setShowEditAlert(false);
    fetchCoin();
  };

  const searchIcon = () => {
    return <FiSearch />;
  };

  return (
    <div>
      <div onClick={handleCreateWallet} className="add__wallet">
        <Button text="Create Coin" />
      </div>
      <div className="banner__search__btn">
        <SearchInput placeholder="Search" icon={searchIcon()} />
      </div>
      <div className="wallet__container">
        <table className="wallet__table">
          <thead>
            <th className="wallet__header">S.No.</th>
            <th className="wallet__header">Coin</th>
            <th className="wallet__header">Price</th>
            <th className="wallet__header">Offer Price</th>
            <th className="wallet__header">Created At</th>
            <th className="wallet__header">Updated At</th>
            <th className="wallet__header">Action</th>
          </thead>
          <tbody>
            {getCoin.length > 0
              ? getCoin.map((data, index) => {
                  return (
                    <tr>
                      <td className="wallet__data">
                        {(page - 1) * perPage + index + 1}
                      </td>
                      <td className="wallet__data">{data?.coins}</td>
                      <td className="wallet__data">{data?.price}</td>
                      <td className="wallet__data">{data?.offer}</td>
                      <td className="wallet__data">
                        {moment(data?.createdAt).format("DD/MM/YYYY LT")}
                      </td>
                      <td className="wallet__data">
                        {moment(data?.updatedAt).format("DD/MM/YYYY LT")}
                      </td>
                      <td className="wallet__data wallet__icons">
                        <AiFillEdit
                          onClick={() => {
                            handleOnClickEdit(data?._id);
                          }}
                          className="wallet__edit__icon"
                        />
                        <AiFillDelete
                          onClick={() => {
                            handleOnClickAlert(data._id);
                          }}
                          className="wallet__delete__icon"
                        />
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>

      {getCoin.length > 0 ? (
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
          <div>
            <Lottie
              options={{ animationData: noData, loop: true }}
              style={{ width: "10rem", height: "10rem" }}
            />
          </div>
        )
      )}

      <FormAlertPopUp
        open={showCreateWallet}
        onRequestClose={handleCreateWalletClose}
      >
        <CreateWalletForm onSubmit={onSubmit} />
      </FormAlertPopUp>

      <AlertPopUp
        open={showDeleteAlert}
        handleOpen={handleDeleteAlert}
        handleClose={handleDeleteAlertClose}
        header="Delete Alert"
        description="Are you sure you want to delete this coin?"
        submitText="Yes"
        cancelText="No"
        onSubmitClick={handleDelete}
        onCancelClick={handleDeleteAlertClose}
      />

      <FormAlertPopUp
        open={showEditAlert}
        onRequestClose={handleOnClickEditClose}
      >
        <CreateWalletForm onClickEdit={onClickEdit} id={id} edit={true} />
      </FormAlertPopUp>
    </div>
  );
};

export default Coin;
