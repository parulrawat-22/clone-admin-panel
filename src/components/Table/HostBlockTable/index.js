import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";

const HostBlockTable = () => {
  const [getBlockList, setGetBlockList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchBlockList();
  }, []);

  const fetchBlockList = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.HOSTBLOCKDETAILS, "POST", {
      id: id,
    })
      .then((res) => {
        setGetBlockList(res.result.block);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="host__block__container">
      <table className="host__block__table">
        <thead>
          <th className="host__block__header">S.NO.</th>
          <th className="host__block__header">User ID</th>
          <th className="host__block__header">User Name</th>
          <th className="host__block__header">Date Of Birth</th>
          <th className="host__block__header">Email</th>
          <th className="host__block__header">Mobile Number</th>
        </thead>
        <tbody>
          {getBlockList.map((data, index) => {
            return (
              <tr>
                <td className="host__block__data">{index + 1}</td>
                <td className="host__block__data">{data?._id}</td>
                <td className="host__block__data">{data?.name}</td>
                <td className="host__block__data">{data?.dateOfBirth}</td>
                <td className="host__block__data">{data?.email}</td>
                <td className="host__block__data">{data?.mobileNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HostBlockTable;
