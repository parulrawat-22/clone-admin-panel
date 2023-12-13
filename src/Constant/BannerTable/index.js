import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import "./style.css";
import { useState } from "react";

import { AiFillEye } from "react-icons/ai";

import ImagePopUpModal from "../../components/ImagePopUpModal";
import FormAlertPopUp from "../../components/FormAlertPopUp";
import BannerForm from "../../components/formComponents/BannerForm";
import moment from "moment";

const BannerTable = ({
  setBannerId,
  showBannerData,
  setShowDeleteAlert,
  fetchBannerList,
  page,
  perPage,
}) => {
  // let navigate = useNavigate();
  const [showImageAlert, setShowImageAlert] = useState(false);
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [id, setId] = useState("");
  const [img, setImg] = useState();

  const handleOnClickEdit = (id) => {
    console.log(id, "-------------");
    setShowEditAlert(true);
    setId(id);
  };

  const onClickEdit = () => {
    setShowEditAlert(false);
  };

  const handleOnClickEditClose = () => {
    setShowEditAlert(false);
  };

  const handleOpenBannerImage = (img) => {
    setShowImageAlert(true);
    setImg(img);
  };

  const handleCloseBannerImage = () => {
    setShowImageAlert(false);
  };

  const handleDeleteBanner = (id) => {
    setBannerId(id);
    setShowDeleteAlert(true);
  };

  return (
    <div className="banner__list__container">
      <table className="banner__list__table__container">
        <thead>
          <th className="banner__list__table__head">S.No</th>
          <th className="banner__list__table__head">Banner Name</th>
          <th className="banner__list__table__head">Banner Image</th>
          <th className="banner__list__table__head">Date & Time</th>
          <th className="banner__list__table__head">Updated Date & Time</th>
          <th className="banner__list__table__head">Action</th>
        </thead>
        <tbody className="banner__list__body">
          {showBannerData?.map((data, index) => {
            return (
              <tr key={index}>
                <td className="banner__list__data">
                  {(page - 1) * perPage + index + 1}
                </td>
                <td className="banner__list__data">{data?.name}</td>
                <td className="banner__list__data">
                  <AiFillEye
                    onClick={() => {
                      handleOpenBannerImage(data?.imageUrl);
                    }}
                    className="banner__list__eye__icon"
                  />
                </td>
                <td className="banner__list__data">
                  {moment(data?.createdAt).format("DD/MM/YYYY , LT")}
                </td>
                <td className="banner__list__data">
                  {moment(data?.updatedAt).format("DD/MM/YYYY , LT")}
                </td>
                <td className="banner__list__data">
                  <AiFillEdit
                    onClick={() => {
                      handleOnClickEdit(data?._id);
                    }}
                    className="banner__list__edit__action"
                  />
                  <AiTwotoneDelete
                    className="banner__list__delete__action"
                    onClick={() => {
                      handleDeleteBanner(data._id);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <ImagePopUpModal
        open={showImageAlert}
        handleClose={handleCloseBannerImage}
        img={img}
      />

      <FormAlertPopUp
        open={showEditAlert}
        onRequestClose={handleOnClickEditClose}
      >
        <BannerForm
          onClickEdit={onClickEdit}
          edit={true}
          id={id}
          fetchBannerList={fetchBannerList}
        />
      </FormAlertPopUp>
    </div>
  );
};

export default BannerTable;
