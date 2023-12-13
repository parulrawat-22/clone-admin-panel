import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";
import { useLoader } from "../../../base/Context/loaderProvider";
import Lottie from "react-lottie";
import noData from "../../../base/Animation/No Data Found.json";

const HostBlockTable = () => {
  const [getBlockList, setGetBlockList] = useState([]);
  const { id } = useParams();

  const loader = useLoader();

  useEffect(() => {
    fetchBlockList();
  }, []);

  const fetchBlockList = () => {
    loader.showLoader(true);
    fetchDataFromAPI(API_URL + NetworkConfiguration.HOSTBLOCKDETAILS, "POST", {
      id: id,
    })
      .then((res) => {
        loader.showLoader(false);
        setGetBlockList(res.result.block);
      })
      .catch((err) => {
        loader.showLoader(false);
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
          {getBlockList.length > 0
            ? getBlockList.map((data, index) => {
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
              })
            : !loader.loaderPopup && (
                <div>
                  <Lottie
                    options={{ animationData: noData, loop: true }}
                    style={{ width: "10rem", height: "10rem" }}
                  />
                </div>
              )}
        </tbody>
      </table>
    </div>
  );
};

export default HostBlockTable;
