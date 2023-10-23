import { BsFillEyeFill } from "react-icons/bs";
import "./style.css";

const GiftTable = () => {
  return (
    <table className="gift__table__container">
      <thead>
        <th className="gift__table__heading">S.No</th>
        <th className="gift__table__heading">Host Name</th>
        <th className="gift__table__heading">Gifts</th>
      </thead>

      <tbody>
        <td className="gift__table__body">1</td>
        <td className="gift__table__body">Suman</td>
        <td className="gift__table__body">
          <BsFillEyeFill />
        </td>
      </tbody>
    </table>
  );
};

export default GiftTable;
