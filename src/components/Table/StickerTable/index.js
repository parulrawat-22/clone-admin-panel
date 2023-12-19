import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import "./style.css";
import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import moment from "moment";
import Button from "../../library/Button";
import ImagePopUpModal from "../../ImagePopUpModal";
import AlertPopUp from "../../AlertPopUp";
import FormAlertPopUp from "../../FormAlertPopUp";
import StickerForm from "../../formComponents/StickerForm";
import { errorToast, successToast } from "../../../utils/toast";
import { useLoader } from "../../../base/Context/loaderProvider";
import { FiSearch } from "react-icons/fi";
import SearchInput from "../../SearchInput";
import Pagination from "../../Pagination";
import Lottie from "react-lottie";
import noData from "../../../base/Animation/No Data Found.json";

const StickerTable = () => {
  const [getSticker, setGetSticker] = useState([]);
  const [img, setImg] = useState("");
  const [showImageAlert, setShowImageAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showStickerForm, setShowStickerForm] = useState(false);
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [id, setId] = useState("");
  const [editedSticker, setEditedSticker] = useState({
    name: "",
    price: "",
    stickerUrl: "",
  });

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
    fetchSticker();
  }, [value, page, perPage]);

  const fetchSticker = () => {
    loader.showLoader(true);
    fetchDataFromAPI(API_URL + NetworkConfiguration.GETSTICKER, "POST", {
      key: value,
      page,
      perPage,
    })
      .then((res) => {
        loader.showLoader(false);
        setGetSticker(res.result);
        setTotalCount(res.totalCount);
        setTotalPages(res.totalPages);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };

  const handleEyeOnClick = (img) => {
    setImg(img);
    setShowImageAlert(true);
  };

  const handleEyeOnClickClose = () => {
    setShowImageAlert(false);
  };

  const handleOnClickAlert = (id) => {
    setId(id);
    setShowDeleteAlert(true);
  };

  const handleStickerForm = () => {
    setShowStickerForm(true);
  };

  const handleStickerFormClose = () => {
    setShowStickerForm(false);
    fetchSticker();
  };

  const handleOnClickEdit = (id, sticker) => {
    setShowEditAlert(true);
    setId(id);
    setEditedSticker({
      name: sticker?.name,
      price: sticker?.price,
      stickerUrl: sticker?.stickerUrl,
    });
    setId(id);
  };

  const handleOnClickEditClose = () => {
    setShowEditAlert(false);
  };

  const onClickEdit = () => {
    setShowEditAlert(false);
    fetchSticker();
  };

  const handleDeleteApi = () => {
    loader.showLoader(true);

    fetchDataFromAPI(
      API_URL + NetworkConfiguration.DELETESTICKER + `/${id}`,
      "DELETE"
    )
      .then((res) => {
        setShowDeleteAlert(false);
        loader.showLoader(false);

        successToast(res.message);
        fetchSticker();
      })
      .catch((err) => {
        loader.showLoader(false);

        console.log(err);
        errorToast(err.message);
      });
  };

  const searchIcon = () => {
    return <FiSearch />;
  };

  const handleText = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="sticker__container">
      <div className="add__sticker" onClick={handleStickerForm}>
        <Button text="Add Sticker" />
      </div>
      <div className="banner__search__btn">
        <SearchInput
          value={value}
          onChange={handleText}
          placeholder="Search"
          icon={searchIcon()}
        />
      </div>
      <table className="sticker__table">
        <thead>
          <th className="sticker__table__heading">S.No</th>
          <th className="sticker__table__heading">Sticker Name</th>
          <th className="sticker__table__heading">Sticker Image</th>
          <th className="sticker__table__heading">Sticker Price</th>
          <th className="sticker__table__heading">Created At</th>
          <th className="sticker__table__heading">Updated At</th>
          <th className="sticker__table__heading">Action</th>
        </thead>
        <tbody>
          {getSticker && getSticker?.length > 0
            ? getSticker.map((data, index) => {
                return (
                  <tr>
                    <td className="sticker__table__data">
                      {(page - 1) * perPage + index + 1}
                    </td>
                    <td className="sticker__table__data">{data?.name}</td>
                    <td className="sticker__table__data">
                      <AiFillEye
                        className="sticker__table__eye__icon"
                        onClick={() => {
                          handleEyeOnClick(data?.stickerUrl);
                        }}
                      />
                    </td>
                    <td className="sticker__table__data">{data?.price}</td>
                    <td className="sticker__table__data">
                      {moment(data?.createdAt).format("DD/MM/YYYY LT")}
                    </td>
                    <td className="sticker__table__data">
                      {moment(data?.updatedAt).format("DD/MM/YYYY LT")}
                    </td>
                    <td className="sticker__table__data">
                      <AiFillEdit
                        onClick={() => {
                          handleOnClickEdit(data?._id, data);
                        }}
                        className="sticker__table__edit__icon"
                      />
                      <AiFillDelete
                        onClick={() => {
                          handleOnClickAlert(data?._id);
                        }}
                        className="sticker__table__delete__icon"
                      />
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>

      {getSticker && getSticker.length > 0 ? (
        <Pagination
          page={page}
          setPage={setPage}
          perPage={perPage}
          setPerPage={setPerPage}
          totalCount={totalCount}
          totalPages={totalPages}
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

      <ImagePopUpModal
        open={showImageAlert}
        handleClose={handleEyeOnClickClose}
        img={img}
      />

      <AlertPopUp
        open={showDeleteAlert}
        handleOpen={handleDeleteAlert}
        handleClose={handleDeleteAlertClose}
        header="Delete Alert"
        description="Are you sure you want to delete this sticker"
        submitText="Yes"
        cancelText="No"
        onSubmitClick={handleDeleteApi}
        onCancelClick={handleDeleteAlertClose}
      />

      <FormAlertPopUp
        open={showStickerForm}
        handleOpen={handleStickerForm}
        onRequestClose={handleStickerFormClose}
      >
        <StickerForm onSubmit={handleStickerFormClose} />
      </FormAlertPopUp>

      <FormAlertPopUp
        open={showEditAlert}
        handleOpen={handleOnClickEdit}
        onRequestClose={handleOnClickEditClose}
      >
        <StickerForm
          edit={true}
          editedSticker={editedSticker}
          onClickEdit={onClickEdit}
          id={id}
        />
      </FormAlertPopUp>
    </div>
  );
};

export default StickerTable;
