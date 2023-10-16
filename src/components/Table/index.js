import "./style.css";

const Table = () => {
  return (
    <table>
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
          <td className="table__body">View</td>
          <td></td>
        </tr>
      </thead>
    </table>
  );
};

export default Table;
