import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const UserSuspiciousData = () => {
  const [suspiciousList, setSuspiciousList] = useState([]);
  // const [type, setType] = useState("");
  const [id, setId] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    fetchSuspiciousData();
  }, []);
  const fetchSuspiciousData = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.SUSPICIOUSDATA, "POST", {
      type: "user",
    })
      .then((res) => {
        console.log(res, "!!!!!!!!!!!!!!!!!!");
        setSuspiciousList(res?.users);
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
          {suspiciousList &&
            suspiciousList.length > 0 &&
            suspiciousList.map((data, index) => {
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
                    <AiFillEdit
                      onClick={() => {
                        navigate(`/usermanagement/${id}`);
                      }}
                      className="suspicious__edit__icon"
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default UserSuspiciousData;
