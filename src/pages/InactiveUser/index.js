import { useContext, useEffect, useState } from "react";
import { useApi } from "../../base/Context/apiProvider";
import Button from "../../components/library/Button";
import { NetworkConfiguration } from "../../network/NetworkConfiguration";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import "./style.css";
import moment from "moment";
import { Modal } from "../../base/Context/modalProvider";
import FormAlertPopUp from "../../components/FormAlertPopUp";
import InactiveUserForm from "../../components/formComponents/InactiveUserForm";

const InactiveUser = () => {
  const apiProvider = useApi();
  const [inactiveHost, setInactiveHost] = useState([]);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const modalProvider = useContext(Modal);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [checkHeaderClick, setCheckHeaderClick] = useState(false);

  const handleAllChecked = (e) => {
    if (e.target.checked) {
      let userId = inactiveHost.map((id) => {
        return id?._id;
      });
      setAllData(userId);
      setData([]);
      setCheckHeaderClick(true);
    } else {
      setAllData([]);
      setCheckHeaderClick(false);
    }
  };

  useEffect(() => {
    fetchInactiveUser();
  }, []);

  const fetchInactiveUser = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.OFFLINEUSER,
      "GET"
    )
      .then((res) => {
        console.log(res);
        setInactiveHost(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNotificationAlert = () => {
    setShowNotificationPopup(true);
  };

  const handleNotificationAlertClose = () => {
    setShowNotificationPopup(false);
  };
  //const abcd = [];

  const handleChange = (e) => {
    //abcd.push(e.target.value);
    setData([...data, e.target.value]);
    console.log(e.target.value);
  };

  return (
    <div className="active__user__container">
      <div className="active__user">
        <Button
          style={{ textAlign: "center" }}
          text="Send Notification"
          onClick={handleNotificationAlert}
        />
      </div>
      <div className="table_parent_box">
        <table className="active__user__table">
          <thead>
            <th className="active__user__header">
              <input
                className="active__user__input"
                type="checkbox"
                onChange={handleAllChecked}
              />{" "}
            </th>
            <th className="active__user__header">S.No.</th>
            <th className="active__user__header">User ID</th>
            <th className="active__user__header">Name</th>
            {/* <th className="active__user__header">Username</th> */}
            <th className="active__user__header">Email</th>
            <th className="active__user__header">Mobile Number</th>
            <th className="active__user__header">Created At</th>
            {/* <th className="active__user__header">Status</th> */}
          </thead>
          <tbody>
            {inactiveHost.map((data, index) => {
              return (
                <tr>
                  <td className="active__user__data">
                    <input
                      className="active__user__input"
                      type="checkbox"
                      onChange={handleChange}
                      value={data?._id}
                      {...(checkHeaderClick ? { checked: true } : {})}
                    />{" "}
                  </td>
                  <td className="active__user__data">{index + 1}</td>
                  <td className="active__user__data">{data?._id}</td>
                  <td className="active__user__data">
                    <div
                      className="feedback__table__comment"
                      onClick={
                        data?.name.length > 10
                          ? () =>
                              modalProvider.handleCommentClick(
                                data?.name,
                                "Name"
                              )
                          : () => {}
                      }
                    >
                      {data?.name}
                    </div>
                  </td>
                  {/* <td className="active__user__data">{data?.username}</td> */}
                  <td className="active__user__data">{data?.email}</td>
                  <td className="active__user__data">{data?.mobileNumber}</td>
                  <td className="active__user__data">
                    {moment(data?.createdAt).format("DD/MM/YYYY ,LT")}
                  </td>
                  {/* <td className="active__user__data">{data?.acctiveStatus}</td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <FormAlertPopUp
        open={showNotificationPopup}
        onRequestClose={handleNotificationAlertClose}
      >
        <InactiveUserForm
          user={true}
          data={data}
          setShowNotificationPopup={setShowNotificationPopup}
          allData={allData}
        />
      </FormAlertPopUp>
    </div>
  );
};

export default InactiveUser;
