import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import "./style.css";
import { useEffect, useState } from "react";
import baseUrl from "../../../baseUrl";
import axios from "axios";
import moment from "moment";

const SuspendedUserTable = () => {
  const [suspendedUserList, setSuspendedUserList] = useState([]);

  useEffect(() => {
    getSuspendedUserList();
  }, []);

  const getSuspendedUserList = () => {
    axios
      .get(baseUrl + "admin/getListUserSuspended", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setSuspendedUserList(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="suspended__table__container">
      <table className="suspended__table">
        <thead>
          <th className="suspended__table__header">S.no</th>
          <th className="suspended__table__header">User ID</th>
          <th className="suspended__table__header">User Name</th>
          <th className="suspended__table__header">Suspended From</th>
          <th className="suspended__table__header">Suspended To</th>
          <th className="suspended__table__header">Action</th>
        </thead>
        <tbody>
          {suspendedUserList.map((data, index) => {
            return (
              <tr>
                <td className="suspended__table__data">{index + 1}</td>
                <td className="suspended__table__data">{data._id}</td>
                <td className="suspended__table__data">{data.name}</td>
                <td className="suspended__table__data">
                  {moment(data.createdAt).format("DD/MM/YYYY, LT")}
                </td>
                <td className="suspended__table__data">
                  {moment(data.suspensionEndDate).format("DD/MM/YYYY, LT")}
                </td>
                <td className="suspended__table__data suspended__user__icons">
                  <AiFillEdit className="suspended__table__edit__icon" />
                  <AiFillDelete className="suspended__table__delete__icon" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SuspendedUserTable;
