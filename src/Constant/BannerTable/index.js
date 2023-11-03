import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../baseUrl";
import { AiFillEye } from "react-icons/ai";
import AlertPopUp from "../../components/AlertPopUp";
import { useNavigate } from "react-router-dom";
import ImagePopUpModal from "../../components/ImagePopUpModal";

const BannerTable = () => {
  let navigate = useNavigate();
  const [showBannerData, setShowBannerData] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState();
  const [showImageAlert, setShowImageAlert] = useState(false);
  const [id, setId] = useState();
  const [img, setImg] = useState();

  const handleShowDeleteAlert = () => {
    setShowDeleteAlert(true);
  };

  const handleShowDeleteAlerClose = () => {
    setShowDeleteAlert(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteAlert(false);
    navigate("/banner");
  };

  const handleOpenBannerImage = (img) => {
    setShowImageAlert(true);
    setImg(img);
  };

  const handleCloseBannerImage = () => {
    setShowImageAlert(false);
  };

  useEffect(() => {
    fetchBannerList();
  }, []);

  const fetchBannerList = () => {
    axios
      .get(baseUrl + "banner/getAllBanner", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log("Banner List", res.data.result);
        setShowBannerData(res.data.result);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleDeleteBanner = (id) => {
    setId(id);
    setShowDeleteAlert(true);
  };
  const handleDelete = () => {
    axios
      .delete(baseUrl + "banner/bannerDelete/" + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        fetchBannerList();
        setShowDeleteAlert(false);
      })
      .catch((err) => {
        console.log(err, "err==========");
      });
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
                <td className="banner__list__actions banner__list__data">
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
      <AlertPopUp
        open={showDeleteAlert}
        handleOpen={handleShowDeleteAlert}
        handleClose={handleShowDeleteAlerClose}
        header="Delete Alert"
        description="Are you sure you want to delete this banner?"
        submitText="Yes"
        cancelText="No"
        onCancelClick={handleCancelDelete}
        onSubmitClick={handleDelete}
      />

      <ImagePopUpModal
        open={showImageAlert}
        handleClose={handleCloseBannerImage}
        img={img}
      />
    </div>
  );
};

export default BannerTable;
