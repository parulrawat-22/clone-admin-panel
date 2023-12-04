import { BsFillEyeFill } from "react-icons/bs";
import "./style.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Button from "../../library/Button";
import FormAlertPopUp from "../../FormAlertPopUp";
import { useEffect, useState } from "react";
import AddGiftForm from "../../formComponents/AddGiftForm";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import moment from "moment";
import AlertPopUp from "../../AlertPopUp";
import ImagePopUpModal from "../../ImagePopUpModal";

const GiftTable = () => {
  const [showGiftForm, setShowGiftForm] = useState(false);
  const [getGift, setGetGift] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [showImageAlert, setShowImageAlert] = useState(false);
  const [img, setImg] = useState("");
  const [id, setId] = useState("");
  const [editedGift, setEditedGift] = useState({
    giftId: id,
    giftName: "",
    giftPrice: "",
    giftImage: "",
  });

  const handleOnClickAlert = (img) => {
    setShowImageAlert(true);
    setImg(img);
  };

  const handleOnClickAlertClose = () => {
    setShowImageAlert(false);
  };

  const handleDeleteAlert = () => {
    setShowDeleteAlert(true);
  };

  const handleDeleteAlertClose = () => {
    setShowDeleteAlert(false);
  };

  const handleAddGift = () => {
    setShowGiftForm(true);
  };

  const handleAddGiftClose = () => {
    fetchGift();
    setShowGiftForm(false);
  };

  const handleOnClickDelete = (id) => {
    setId(id);
    setShowDeleteAlert(true);
  };

  useEffect(() => {
    fetchGift();
  }, []);

  const fetchGift = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.GETGIFT, "GET")
      .then((res) => {
        setGetGift(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteApi = () => {
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.DELETEGIFT + `/${id}`,
      "DELETE"
    )
      .then((res) => {
        setShowDeleteAlert(false);
        fetchGift();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnClickEdit = (id, gift) => {
    setShowEditAlert(true);
    setEditedGift({
      giftId: id,
      giftName: gift?.name,
      giftPrice: gift?.price,
      giftImage: gift?.giftUrl,
    });
    setId(id);
  };

  const handleOnClickEditClose = () => {
    setShowEditAlert(false);
  };

  const onClickEdit = () => {
    setShowEditAlert(false);
    fetchGift();
  };
  return (
    <div>
      <div onClick={handleAddGift} className="add__gift">
        <Button text="Add Gift" />
      </div>
      <div className="gift__container">
        <table className="gift__table__container">
          <thead>
            <th className="gift__table__heading">S.No</th>
            <th className="gift__table__heading">Gift Name</th>
            <th className="gift__table__heading">Gift Image</th>
            <th className="gift__table__heading">Gift Price</th>
            <th className="gift__table__heading">Created At</th>
            <th className="gift__table__heading">Updated At</th>
            <th className="gift__table__heading">Action</th>
          </thead>

          <tbody>
            {getGift.map((data, index) => {
              return (
                <tr>
                  <td className="gift__table__body">{index + 1}</td>
                  <td className="gift__table__body">{data?.name}</td>
                  <td className="gift__table__body">
                    <BsFillEyeFill
                      className="gift__table__eye__icon"
                      onClick={() => {
                        handleOnClickAlert(data?.giftUrl);
                        console.log(data?.giftUrl, "12346");
                      }}
                    />
                  </td>
                  <td className="gift__table__body">{data?.price}</td>
                  <td className="gift__table__body">
                    {moment(data?.createdAt).format("DD/MM/YYYY LT")}
                  </td>
                  <td className="gift__table__body">
                    {moment(data?.updatedAt).format("DD/MM/YYYY LT")}
                  </td>
                  <td className="gift__table__body ">
                    <AiFillEdit
                      onClick={() => {
                        handleOnClickEdit(data?._id, data);
                      }}
                      className="gift__table__edit__icon"
                    />
                    <AiFillDelete
                      onClick={() => {
                        handleOnClickDelete(data?._id);
                      }}
                      className="gift__table__delete__icon"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <FormAlertPopUp open={showGiftForm} onRequestClose={handleAddGiftClose}>
        <AddGiftForm onSubmit={handleAddGiftClose} />
      </FormAlertPopUp>

      <AlertPopUp
        open={showDeleteAlert}
        handleOpen={handleDeleteAlert}
        handleClose={handleDeleteAlertClose}
        header="Delete Alert"
        description="Are you sure you want to delete this gift?"
        submitText="Yes"
        cancelText="No"
        onSubmitClick={handleDeleteApi}
        onCancelClick={handleDeleteAlertClose}
      />
      <ImagePopUpModal
        open={showImageAlert}
        handleClose={handleOnClickAlertClose}
        img={img}
      />
      <FormAlertPopUp
        open={showEditAlert}
        onRequestClose={handleOnClickEditClose}
      >
        <AddGiftForm
          edit={true}
          editedGift={editedGift}
          onClickEdit={onClickEdit}
        />
      </FormAlertPopUp>
    </div>
  );
};

export default GiftTable;
