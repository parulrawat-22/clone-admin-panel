import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import "./style.css";
import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";

const HostSuspiciousData = () => {
  const [hostSuspiciousList, setHostSuspiciousList] = useState([]);

  useEffect(() => {
    fetchSuspiciousData();
  }, []);

  const fetchSuspiciousData = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.SUSPICIOUSDATA, "POST", {
      type: "host",
    })
      .then((res) => {
        console.log(res, "!!!!!!!!!!!!!!!!!!");
        setHostSuspiciousList(res?.hosts);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="suspicious__data__container">
      <table className="suspicious__data__table">
        <thead>
          <th className="suspicious__data__header">S.No</th>
          <th className="suspicious__data__header">Name</th>
          <th className="suspicious__data__header">Gender</th>
          <th className="suspicious__data__header">Ai Gender</th>
          <th className="suspicious__data__header">Age</th>
          <th className="suspicious__data__header">Ai Age</th>
          <th className="suspicious__data__header">Explicit</th>

          <th className="suspicious__data__header">Action</th>
        </thead>
        <tbody>
          {hostSuspiciousList &&
            hostSuspiciousList.length > 0 &&
            hostSuspiciousList.map((data, index) => {
              return (
                <tr>
                  <td className="suspicious__data__data">{index + 1}</td>
                  <td className="suspicious__data__data">{data?.name}</td>
                  <td className="suspicious__data__data">{data?.gender}</td>
                  <td className="suspicious__data__data">
                    {data?.attributes[0]?.gender.Value}
                  </td>
                  <td className="suspicious__data__data">{data?.age}</td>
                  <td className="suspicious__data__data">
                    {data?.attributes[0]?.ageRange?.Low}-
                    {data?.attributes[0]?.ageRange?.High}
                  </td>
                  <td className="suspicious__data__data">
                    {data?.isExplicit ? "TRUE" : "FALSE"}
                  </td>
                  <td className="suspicious__data__data">
                    <AiFillEdit className="suspicious__edit__icon" />
                    <AiFillDelete className="suspicious__delete__icon" />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default HostSuspiciousData;