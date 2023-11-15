import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../../baseUrl";

const WarnedHostTable = () => {
  const [warnedHostList, setWarnedHostList] = useState([]);

  useEffect(() => {
    getWarnedHost();
  }, []);

  const getWarnedHost = () => {
    axios
      .get(baseUrl + "admin/getWaringHostList", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setWarnedHostList(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="warned__host__container">
      <table className="warned__host__table">
        <thead>
          <th className="warned__host__header">S.No.</th>
          <th className="warned__host__header">Host ID</th>
          <th className="warned__host__header">Host Name</th>
          <th className="warned__host__header">Title</th>
          <th className="warned__host__header">Description</th>
          <th className="warned__host__header">Action</th>
        </thead>
        <tbody>
          {warnedHostList.map((data, index) => {
            return (
              <tr>
                <td className="warned__host__data">{index + 1}</td>
                <td className="warned__host__data">{data.hostId._id}</td>
                <td className="warned__host__data">{data.hostId.name}</td>
                <td className="warned__host__data">{data.title}</td>
                <td className="warned__host__data">{data.body}</td>
                <td className="warned__host__data warned__host__icon">
                  <AiFillEdit className="warned__host__edit__icon" />
                  <AiFillDelete className="warned__host__delete__icon" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default WarnedHostTable;
