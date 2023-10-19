import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Table = () => {
  let navigate = useNavigate();
  return (
    <table className="table__container">
      <thead>
        <tr>
          <th className="table__head">S.No.</th>
          <th className="table__head">User ID</th>
          <th className="table__head">First Name</th>
          <th className="table__head">Last Name</th>
          <th className="table__head">Email ID</th>
          <th className="table__head">Mobile Number</th>
          <th className="table__head">Login Status</th>
          <th className="table__head">View Profile</th>
          <th className="table__head">Action</th>
        </tr>
        <tr>
          <td className="table__body">1</td>
          <td className="table__body">12345</td>
          <td className="table__body">Suman</td>
          <td className="table__body">Kumari</td>
          <td className="table__body">suman.123@gmail.com</td>
          <td className="table__body">9876465431</td>
          <td className="table__body">suman.123@gmail.com</td>
          <td
            onClick={() => {
              navigate("/usermanagement");
            }}
            className="table__body__clickable"
          >
            View more...{" "}
          </td>
          <td className="table__body__icon">
            <AiFillEdit className="table__edit__icon" />
            <AiTwotoneDelete className="table__delete__icon" />
          </td>
        </tr>
        <tr>
          <td className="table__body">2</td>
          <td className="table__body">12345</td>
          <td className="table__body">Suman</td>
          <td className="table__body">Kumari</td>
          <td className="table__body">suman.123@gmail.com</td>
          <td className="table__body">9876465431</td>
          <td className="table__body">suman.123@gmail.com</td>
          <td className="table__body__clickable">View more... </td>
          <td className="table__body__icon">
            <AiFillEdit className="table__edit__icon" />
            <AiTwotoneDelete className="table__delete__icon" />
          </td>
        </tr>
        <tr>
          <td className="table__body">3</td>
          <td className="table__body">12345</td>
          <td className="table__body">Suman</td>
          <td className="table__body">Kumari</td>
          <td className="table__body">suman.123@gmail.com</td>
          <td className="table__body">9876465431</td>
          <td className="table__body">suman.123@gmail.com</td>
          <td className="table__body__clickable">View more... </td>
          <td className="table__body__icon">
            <AiFillEdit className="table__edit__icon" />
            <AiTwotoneDelete className="table__delete__icon" />
          </td>
        </tr>
        <tr>
          <td className="table__body">4</td>
          <td className="table__body">12345</td>
          <td className="table__body">Suman</td>
          <td className="table__body">Kumari</td>
          <td className="table__body">suman.123@gmail.com</td>
          <td className="table__body">9876465431</td>
          <td className="table__body">suman.123@gmail.com</td>
          <td className="table__body__clickable">View more... </td>
          <td className="table__body__icon">
            <AiFillEdit className="table__edit__icon" />
            <AiTwotoneDelete className="table__delete__icon" />
          </td>
        </tr>
        <tr>
          <td className="table__body">5</td>
          <td className="table__body">12345</td>
          <td className="table__body">Suman</td>
          <td className="table__body">Kumari</td>
          <td className="table__body">suman.123@gmail.com</td>
          <td className="table__body">9876465431</td>
          <td className="table__body">suman.123@gmail.com</td>
          <td className="table__body__clickable">View more... </td>
          <td className="table__body__icon">
            <AiFillEdit className="table__edit__icon" />
            <AiTwotoneDelete className="table__delete__icon" />
          </td>
        </tr>
        <tr>
          <td className="table__body">6</td>
          <td className="table__body">12345</td>
          <td className="table__body">Suman</td>
          <td className="table__body">Kumari</td>
          <td className="table__body">suman.123@gmail.com</td>
          <td className="table__body">9876465431</td>
          <td className="table__body">suman.123@gmail.com</td>
          <td className="table__body__clickable">View more... </td>
          <td className="table__body__icon">
            <AiFillEdit className="table__edit__icon" />
            <AiTwotoneDelete className="table__delete__icon" />
          </td>
        </tr>
        <tr>
          <td className="table__body">7</td>
          <td className="table__body">12345</td>
          <td className="table__body">Suman</td>
          <td className="table__body">Kumari</td>
          <td className="table__body">suman.123@gmail.com</td>
          <td className="table__body">9876465431</td>
          <td className="table__body">suman.123@gmail.com</td>
          <td className="table__body__clickable">View more... </td>
          <td className="table__body__icon">
            <AiFillEdit className="table__edit__icon" />
            <AiTwotoneDelete className="table__delete__icon" />
          </td>
        </tr>
      </thead>
    </table>
  );
};

export default Table;
