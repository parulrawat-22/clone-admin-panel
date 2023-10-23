import { BsFillEyeFill } from "react-icons/bs";
import "./style.css";

const FeedbackTable = () => {
  return (
    <table className="feedback__table__container">
      <thead className="feedback__table__heading">
        <th className="feedback__table__heading">S.No.</th>
        <th className="feedback__table__heading">Title</th>
        <th className="feedback__table__heading">Description</th>
        <th className="feedback__table__heading">Image/Video</th>
        <th className="feedback__table__heading">Revert Back</th>
      </thead>
      <tbody>
        <td className="feedback__table__data"> 1</td>
        <td className="feedback__table__data">Hiii</td>
        <td className="feedback__table__data"> how are you</td>
        <td className="feedback__table__data">
          <BsFillEyeFill />
        </td>
        <td className="feedback__table__data">qwertyuiop</td>
      </tbody>
    </table>
  );
};

export default FeedbackTable;
