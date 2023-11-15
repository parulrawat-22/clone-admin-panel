import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../../baseUrl";
import moment from "moment";

const SuspendedHostTable = () => {
  const [suspendedHostList, setSuspendedHostList] = useState([]);

  useEffect(() => {
    getSuspendedHost();
  }, []);

  const getSuspendedHost = () => {
    axios
      .get(baseUrl + "admin/getListHostSuspended", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setSuspendedHostList(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="suspended__host__table__container">
      <table className="suspended__table">
        <thead>
          <th className="suspended__host__table__header">S.no</th>
          <th className="suspended__host__table__header">Host ID</th>
          <th className="suspended__host__table__header">Host Name</th>
          <th className="suspended__host__table__header">Suspended From</th>
          <th className="suspended__host__table__header">Suspended To</th>
          <th className="suspended__host__table__header">Action</th>
        </thead>
        <tbody>
          {suspendedHostList.map((data, index) => {
            return (
              <tr>
                <td className="suspended__host__table__data">{index + 1}</td>
                <td className="suspended__host__table__data">{data._id}</td>
                <td className="suspended__host__table__data">{data.name}</td>

                <td className="suspended__host__table__data">
                  {moment(data.createdAt).format("DD/MM/YYYY , LT")}
                </td>
                <td className="suspended__host__table__data">
                  {moment(data.suspensionEndDate).format("DD/MM/YYYY , LT")}
                </td>
                <td className="suspended__host__table__data suspended__host__table__icons">
                  <AiFillEdit className="suspended__host__table__edit__icon" />
                  <AiFillDelete className="suspended__host__table__delete__icon" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SuspendedHostTable;
