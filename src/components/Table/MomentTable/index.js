import { BsFillEyeFill } from "react-icons/bs";
import "./style.css";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";

const MomentTable = () => {
  return (
    <table className="moment__table__container">
      <thead>
        <th className="moment__table__head">S.No</th>
        <th className="moment__table__head">Date</th>
        <th className="moment__table__head">Caption</th>
        <th className="moment__table__head">Likes</th>
        <th className="moment__table__head">Image/Video</th>
        <th className="moment__table__head">Action</th>
      </thead>
      <tbody>
        <td className="moment__table__body">1</td>
        <td className="moment__table__body">12/10/23</td>
        <td className="moment__table__body">Hey there!</td>
        <td className="moment__table__body">43</td>
        <td className="moment__table__body">
          <BsFillEyeFill className="moment__table__body__eye_icon" />
        </td>
        <td className="moment__table__body moment__table__body_icons">
          <AiFillEdit className="moment__table__edit_icon" />
          <AiTwotoneDelete className="moment__table__delete_icon" />
        </td>
      </tbody>
    </table>
  );
};

export default MomentTable;
