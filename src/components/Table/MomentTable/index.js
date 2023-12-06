import { BsFillEyeFill } from "react-icons/bs";
import "./style.css";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import AlertPopUp from "../../AlertPopUp";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import moment from "moment";
import ImagePopUpModal from "../../ImagePopUpModal";
import { errorToast, successToast } from "../../../utils/toast";
import { useLoader } from "../../../base/Context/loaderProvider";

const MomentTable = () => {
  let navigate = useNavigate();
  const { id } = useParams();

  const [showDeleteAlert, setShowDeleteAlert] = useState();
  const [getUserMoment, setGetUserMoment] = useState([]);
  const [momentId, setMomentId] = useState("");
  const [showImageAlert, setShowImageAlert] = useState("");
  const [img, setImg] = useState("");

  const loader = useLoader();

  const handleImageAlert = (img) => {
    setShowImageAlert(true);
    setImg(img);
  };

  const handleImageAlertClose = () => {
    setShowImageAlert(false);
  };

  const handleDeleteAlert = () => {
    setShowDeleteAlert(true);
  };

  const handleDeleteAlertClose = () => {
    setShowDeleteAlert(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteAlert(false);
    navigate("/moment");
  };

  useEffect(() => {
    fetchUserMoment();
  }, []);

  const fetchUserMoment = () => {
    loader.showLoader(true);

    fetchDataFromAPI(
      API_URL + NetworkConfiguration.GETUSERMOMENT,
      "POST",
      id ? { userId: id } : {}
    )
      .then((res) => {
        loader.showLoader(false);

        setGetUserMoment(res.result);
      })
      .catch((err) => {
        console.log(err);
        loader.showLoader(false);
      });
  };

  const handleOnClickAlert = (id) => {
    setShowDeleteAlert(true);
    setMomentId(id);
  };

  const handleDeleteApi = () => {
    loader.showLoader(true);

    fetchDataFromAPI(
      API_URL + NetworkConfiguration.DELETEUSERMOMENT + `/${momentId}`,
      "DELETE"
    )
      .then((res) => {
        loader.showLoader(false);

        setShowDeleteAlert(false);
        successToast(res.message);
        fetchUserMoment();
      })
      .catch((err) => {
        loader.showLoader(false);

        console.log(err);
        errorToast(err.message);
      });
  };
  return (
    <div className="moment__container">
      <table className="moment__table__container">
        <thead>
          <th className="moment__table__head">S.No</th>
          {!id && <th className="moment__table__head">Name</th>}
          <th className="moment__table__head">Caption</th>
          <th className="moment__table__head">Likes</th>
          <th className="moment__table__head">Image/Video</th>
          <th className="moment__table__head">Created At</th>
          <th className="moment__table__head">Action</th>
        </thead>
        <tbody>
          {getUserMoment.map((data, index) => {
            return (
              <tr>
                <td className="moment__table__body">{index + 1}</td>
                {!id && (
                  <td className="moment__table__body">{data?.userId?.name}</td>
                )}
                <td className="moment__table__body">{data?.subject}</td>
                <td className="moment__table__body">{data?.likes}</td>

                <td className="moment__table__body">
                  <BsFillEyeFill
                    onClick={() => {
                      handleImageAlert(data?.postImage);
                    }}
                    className="moment__table__body__eye_icon"
                  />
                </td>
                <td className="moment__table__body">
                  {moment(data?.postDate).format("DD/MM/YYYY LT")}
                </td>
                <td className="moment__table__body">
                  <AiFillEdit className="moment__table__edit_icon" />
                  <AiTwotoneDelete
                    onClick={() => {
                      handleOnClickAlert(data._id);
                    }}
                    className="moment__table__delete_icon"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <AlertPopUp
        open={showDeleteAlert}
        handleOpen={handleDeleteAlert}
        handleClose={handleDeleteAlertClose}
        header="Delete Moment?"
        description="Are you sure you want to delete this Moment?"
        submitText="Yes"
        onCancelClick={handleDeleteCancel}
        onSubmitClick={handleDeleteApi}
        cancelText="No"
      />

      <ImagePopUpModal
        open={showImageAlert}
        handleClose={handleImageAlertClose}
        img={img}
      />
    </div>
  );
};

export default MomentTable;
