import { useEffect, useState } from "react";
import "./style.css";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";

const HostMomentTable = () => {
  const [getHostMoment, setGetHostMoment] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchHostMoment();
  }, []);

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
                    <AiFillEye className="host__moment__eye__icon" />
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
            <th className="host__moment__header">Updated At</th>
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
                  <td className="host__moment__data host__moment__eye__icon">
                    <AiFillEye />
                  </td>
                  <td className="host__moment__data">{data?.postAt}</td>
                  <td className="host__moment__data">{data?.updatedAt}</td>
                  <td className="host__moment__data">
                    <AiFillEdit className="host__moment__edit__icon host__moment__delete__icon" />
                    <AiFillDelete />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HostMomentTable;
