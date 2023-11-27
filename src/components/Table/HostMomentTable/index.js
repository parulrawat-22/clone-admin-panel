import { useEffect, useState } from "react";
import "./style.css";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";
import ImagePopUpModal from "../../ImagePopUpModal";
import moment from "moment";
import AlertPopUp from "../../AlertPopUp";

const HostMomentTable = () => {
  const [getHostMoment, setGetHostMoment] = useState([]);
  const [showImageAlert, setShowImageAlert] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [img, setImg] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetchHostMoment();
  }, []);

  const handleDeleteMoment = () => {
    setShowDeleteAlert(true);
  };

  const handleDeleteMomentClose = () => {
    setShowDeleteAlert(false);
  };

  const handleImageAlert = (img) => {
    setShowImageAlert(true);
    setImg(img);
  };

  const handleImageAlertClose = () => {
    setShowImageAlert(false);
  };

  // const handleHostMoment = () =>{
  //   fetchDataFromAPI(API_URL + NetworkConfiguration)
  // }

  const fetchHostMoment = () => {
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.HOSTMOMENT,
      "POST",
      id ? { hostId: id } : {}
    )
      .then((res) => {
        setGetHostMoment(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="host__moment__container">
      {id ? (
        <table className="host__moment__table">
          <thead>
            <th className="host__moment__header">S.No</th>
            <th className="host__moment__header">Caption</th>
            <th className="host__moment__header">Likes</th>
            <th className="host__moment__header">Image/Video</th>
            <th className="host__moment__header">Created At</th>
            <th className="host__moment__header">Updated At</th>
            <th className="host__moment__header">Action</th>
          </thead>
          <tbody>
            {getHostMoment.map((data, index) => {
              return (
                <tr>
                  <td className="host__moment__data">{index + 1}</td>
                  <td className="host__moment__data">{data?.caption}</td>
                  <td className="host__moment__data">{data?.likes}</td>
                  <td className="host__moment__data">
                    <AiFillEye
                      onClick={() => {
                        handleImageAlert(data?.postImage);
                      }}
                      className="host__moment__eye__icon"
                    />
                  </td>
                  <td className="host__moment__data">{data?.postDate}</td>
                  <td className="host__moment__data">{data?.updatedAt}</td>
                  <td className="host__moment__data">
                    <AiFillEdit className="host__moment__edit__icon" />
                    <AiFillDelete className="host__moment__delete__icon" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <table className="host__moment__table">
          <thead>
            <th className="host__moment__header">S.No</th>
            <th className="host__moment__header">Host Name</th>
            <th className="host__moment__header">Caption</th>
            <th className="host__moment__header">Likes</th>
            <th className="host__moment__header">Image/Video</th>
            <th className="host__moment__header">Created At</th>
            <th className="host__moment__header">Action</th>
          </thead>
          <tbody>
            {getHostMoment.map((data, index) => {
              return (
                <tr>
                  <td className="host__moment__data">{index + 1}</td>
                  <td className="host__moment__data">{data?.hostName}</td>
                  <td className="host__moment__data">{data?.subject}</td>
                  <td className="host__moment__data">{data?.likes}</td>
                  <td className="host__moment__data ">
                    <AiFillEye
                      onClick={() => {
                        handleImageAlert(data?.postImage);
                      }}
                      className="host__moment__eye__icon"
                    />
                  </td>
                  <td className="host__moment__data">
                    {moment(data?.postDate).format("DD/MM/YYYY , LT")}
                  </td>
                  <td className="host__moment__data">
                    <AiFillEdit className="host__moment__edit__icon" />
                    <AiFillDelete
                      onClick={() => {
                        handleDeleteMoment(data?._id);
                      }}
                      className="host__moment__delete__icon"
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
        handleOpen={handleDeleteMoment}
        handleClose={handleDeleteMomentClose}
        header="Delete Alert"
        description="Are you sure you want to delete this host moment?"
        // onSubmitClick={handleHostMoment}
        onCancelClick={handleDeleteMomentClose}
      />
      <ImagePopUpModal
        open={showImageAlert}
        handleClose={handleImageAlertClose}
        img={img}
      />
    </div>
  );
};

export default HostMomentTable;
