import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../../baseUrl";

const WarnedUserTable = () => {
  const [warnedUserList, setWarnedUserList] = useState([]);

  useEffect(() => {
    getWarnedUser();
  }, []);

  const getWarnedUser = () => {
    axios
      .get(baseUrl + "admin/getWaringUserList", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setWarnedUserList(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="warned__user__container">
      <table className="warned__user__table">
        <thead>
          <th className="warned__user__header">S.No.</th>
          <th className="warned__user__header">User ID</th>
          <th className="warned__user__header">User Name</th>
          <th className="warned__user__header">Title</th>
          <th className="warned__user__header">Description</th>
          <th className="warned__user__header">Action</th>
        </thead>
        <tbody>
          {warnedUserList.map((data, index) => {
            return (
              <tr>
                <td className="warned__user__data">{index + 1}</td>
                <td className="warned__user__data">{data.userId._id}</td>
                <td className="warned__user__data">{data.userId.name}</td>
                <td className="warned__user__data">{data.title}</td>
                <td className="warned__user__data">{data.body}</td>
                <td className="warned__user__data warned__user__icon">
                  <AiFillEdit className="warned__user__edit__icon" />
                  <AiFillDelete className="warned__user__delete__icon" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default WarnedUserTable;
