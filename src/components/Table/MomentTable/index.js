import { BsFillEyeFill } from "react-icons/bs";
import "./style.css";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import AlertPopUp from "../../AlertPopUp";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import moment from "moment";

const MomentTable = () => {
  let navigate = useNavigate();
  const [searchParams, setSeachParams] = useSearchParams();

  const [showDeleteAlert, setShowDeleteAlert] = useState();
  const [getUserMoment, setGetUserMoment] = useState([]);
  const [id, setId] = useState("");

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
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.GETUSERMOMENT,
      "POST",
      searchParams.get("id") ? { userId: searchParams.get("id") } : {}
    )
      .then((res) => {
        setGetUserMoment(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnClickAlert = (id) => {
    setShowDeleteAlert(true);
    setId(id);
  };

  const handleDeleteApi = () => {
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.DELETEUSERMOMENT + `/${id}`,
      "DELETE"
    )
      .then((res) => {
        setShowDeleteAlert(false);
        fetchUserMoment();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="moment__container">
      {searchParams.get("id") ? (
        <table className="moment__table__container">
          <thead>
            <th className="moment__table__head">S.No</th>
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
                  <td className="moment__table__body">{data?.subject}</td>
                  <td className="moment__table__body">{data?.likes}</td>

                  <td className="moment__table__body">
                    <BsFillEyeFill className="moment__table__body__eye_icon" />
                  </td>
                  <td className="moment__table__body">
                    {moment(data?.postDate).format("DD/MM/YYYY LT")}
                  </td>
                  <td className="moment__table__body moment__table__body_icons">
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
      ) : (
        <table className="moment__table__container">
          <thead>
            <th className="moment__table__head">S.No</th>

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
                  <td className="moment__table__body">{data?.likes}</td>

                  <td className="moment__table__body">
                    <BsFillEyeFill className="moment__table__body__eye_icon" />
                  </td>
                  <td className="moment__table__body">
                    {moment(data?.postDate).format("DD/MM/YYYY LT")}
                  </td>
                  <td className="moment__table__body moment__table__body_icons">
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
      )}

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
    </div>
  );
};

export default MomentTable;
