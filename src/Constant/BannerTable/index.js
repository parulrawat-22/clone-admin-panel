import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import "./style.css";
import { useState } from "react";

import { AiFillEye } from "react-icons/ai";

import ImagePopUpModal from "../../components/ImagePopUpModal";

const BannerTable = ({ setBannerId, showBannerData, setShowDeleteAlert }) => {
  // let navigate = useNavigate();
  const [showImageAlert, setShowImageAlert] = useState(false);
  const [img, setImg] = useState();

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
          <tr>
            <th className="banner__list__table__head">S.No</th>
            <th className="banner__list__table__head">Banner Name</th>
            <th className="banner__list__table__head">Banner Image</th>
            <th className="banner__list__table__head">Action</th>
          </tr>
        </thead>
        <tbody className="banner__list__body">
          {showBannerData?.map((data, index) => {
            return (
              <tr key={index}>
                <td className="banner__list__data">{index + 1}</td>
                <td className="banner__list__data">{data.name}</td>
                <td className="banner__list__data">
                  <AiFillEye
                    onClick={() => {
                      handleOpenBannerImage(data.imageUrl);
                    }}
                    className="banner__list__eye__icon"
                  />
                </td>
                <td className="banner__list__data">
                  <AiFillEdit className="banner__list__edit__action" />
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
    </div>
  );
};

export default BannerTable;
