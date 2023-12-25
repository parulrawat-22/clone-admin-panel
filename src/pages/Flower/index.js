import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import "./style.css";
import { useState } from "react";

const Flower = () => {
  const [flowerData, setFlowerData] = useState([]);
  return (
    <div className="flower__container">
      <table className="flower__table">
        <thead>
          <th className="flower__header">S.No.</th>
          <th className="flower__header">Flower Name</th>
          <th className="flower__header">Flower Price</th>
          <th className="flower__header">Flower Image</th>
          <th className="flower__header">Action</th>
        </thead>
        <td className="flower__data">1</td>
        <td className="flower__data">name</td>
        <td className="flower__data">1200</td>
        <td className="flower__data">
          <AiFillEye className="flower__eye__icon" />
        </td>
        <td className="flower__data">
          <AiFillEdit className="flower__edit__icon" />
          <AiFillDelete className="flower__delete__icon" />
        </td>
      </table>
    </div>
  );
};

export default Flower;
