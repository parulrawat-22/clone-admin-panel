import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import "./style.css";
import { BsFillEyeFill } from "react-icons/bs";

const UserTable = () => {
  return (
    <div className="user__request__table__container">
      <table className="user__request__table">
        <thead className="user__request__headers">
          <th className="user__request__headers">S.No.</th>
          <th className="user__request__headers">User ID</th>
          <th className="user__request__headers">Name</th>
          <th className="user__request__headers">Gender</th>
          <th className="user__request__headers">Date Of Birth</th>
          <th className="user__request__headers">Age</th>
          <th className="user__request__headers">Country</th>
          <th className="user__request__headers">State</th>
          <th className="user__request__headers">City</th>
          <th className="user__request__headers">Mobile Number</th>
          <th className="user__request__headers">Profession</th>
          <th className="user__request__headers">Bio</th>
          <th className="user__request__headers">Image/Video</th>
          <th className="user__request__headers">Action</th>
        </thead>
        <tbody>
          <tr className="user__request__row">
            <td className="user__request__row">1</td>
            <td className="user__request__row">1</td>
            <td className="user__request__row">1</td>
            <td className="user__request__row">1</td>
            <td className="user__request__row">1</td>
            <td className="user__request__row">1</td>
            <td className="user__request__row">1</td>
            <td className="user__request__row">1</td>
            <td className="user__request__row">1</td>
            <td className="user__request__row">1</td>
            <td className="user__request__row">1</td>
            <td className="user__request__row">1</td>
            <td className="user__request__row user__request__eye__icon">
              <BsFillEyeFill />
            </td>
            <td className="user__request__row user__request__action">
              <TiTick className="table__accept__icon" />
              <RxCross2 className="table__reject__icon" />
            </td>
          </tr>
          <tr className="user__request__row">
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td className="user__request__eye__icon">
              <BsFillEyeFill />
            </td>
            <td className="user__request__action">
              <TiTick className="table__accept__icon" />
              <RxCross2 className="table__reject__icon" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
