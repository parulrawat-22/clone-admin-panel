import moment from "moment";
import { useApi } from "../../base/Context/apiProvider";
import { useLoader } from "../../base/Context/loaderProvider";
import Button from "../../components/library/Button";
import { NetworkConfiguration } from "../../network/NetworkConfiguration";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import "./style.css";
import { useEffect, useState } from "react";
import FormAlertPopUp from "../../components/FormAlertPopUp";
import InactiveUserForm from "../../components/formComponents/InactiveUserForm";
import Pagination from "../../components/Pagination";
import noData from "../../base/Animation/No Data Found.json";
import Lottie from "react-lottie";
import SearchInput from "../../components/SearchInput";
import { FiSearch } from "react-icons/fi";

const ActiveUser = () => {
  const apiProvider = useApi();
  const [activeUser, setActiveUser] = useState([]);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [checkHeaderClick, setCheckHeaderClick] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");
  const [totalCount, setTotalCount] = useState("");
  const [value, setValue] = useState("");

  const loader = useLoader();
  useEffect(() => {
    fetchActiveUser();
  }, [apiProvider?.apiUrl, page, perPage, value]);

  const fetchActiveUser = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.ONLINEUSER,
      "POST",
      {
        key: value,
        page,
        perPage,
      }
    )
      .then((res) => {
        loader.showLoader(false);
        setActiveUser(res?.data);
        setTotalCount(res?.totalCount);
        setTotalPages(res?.totalPages);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err, "err========");
      });
  };

  const handleActiveUser = () => {
    setShowNotificationPopup(true);
  };

  const handleActiveUserClose = () => {
    setShowNotificationPopup(false);
  };

  const handleChange = (e) => {
    setData([...data, e.target.value]);
  };

  const handleAllChecked = (e) => {
    if (e.target.checked) {
      let activeUserId = activeUser.map((id) => {
        return id?._id;
      });
      setAllData(activeUserId);
      setCheckHeaderClick(true);
      setData([]);
    } else {
      setCheckHeaderClick(false);
      setAllData([]);
    }
  };

  const handleText = (e) => {
    setValue(e.target.value);
  };

  const searchIcon = () => {
    return <FiSearch />;
  };

  return (
    <>
      <SearchInput
        onChange={handleText}
        placeholder="Search"
        icon={searchIcon()}
        value={value}
      />
      <div className="active__user__container">
        <div className="active__user" onClick={handleActiveUser}>
          <Button style={{ textAlign: "center" }} text="Send Notification" />
        </div>
        <div className="table_parent_box">
          <table className="active__user__table">
            <thead>
              <th className="active__user__header">
                {" "}
                <input
                  className="active__user__input"
                  type="checkbox"
                  onChange={handleAllChecked}
                />
              </th>
              <th className="active__user__header">S.No.</th>
              <th className="active__user__header">User ID</th>
              <th className="active__user__header">Name</th>
              <th className="active__user__header">Email</th>
              <th className="active__user__header">Mobile Number</th>
              <th className="active__user__header">Created At</th>
            </thead>
            <tbody>
              {activeUser && activeUser.length > 0 ? (
                activeUser.map((data, index) => {
                  return (
                    <tr>
                      <td className="active__user__data">
                        <input
                          onChange={handleChange}
                          value={data?._id}
                          className="active__user__input"
                          type="checkbox"
                          {...(checkHeaderClick ? { checked: true } : {})}
                        />
                      </td>
                      <td className="active__user__data">
                        {(page - 1) * perPage + index + 1}
                      </td>
                      <td className="active__user__data">{data?._id}</td>
                      <td className="active__user__data">{data?.name}</td>
                      <td className="active__user__data">{data?.email}</td>
                      <td className="active__user__data">
                        {data?.mobileNumber}
                      </td>
                      <td className="active__user__data">
                        {moment(data?.createdAt).format("DD/MM/YYYY , LT")}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <div></div>
              )}
            </tbody>
          </table>
        </div>

        {activeUser && activeUser.length > 0 ? (
          <Pagination
            page={page}
            setPage={setPage}
            perPage={perPage}
            setPerPage={setPerPage}
            totalCount={totalCount}
            totalPages={totalPages}
            options={[5, 10, 15, 20]}
          />
        ) : (
          !loader.loaderPopup && (
            <div className="host__no__data__found__icon">
              <Lottie
                options={{ animationData: noData, loop: true }}
                style={{ width: "20rem", height: "20rem" }}
              />
              <p className="no__data__found">No Data Found</p>
            </div>
          )
        )}

        <FormAlertPopUp
          open={showNotificationPopup}
          onRequestClose={handleActiveUserClose}
        >
          <InactiveUserForm
            allData={allData}
            data={data}
            user={true}
            setData={setData}
            setAllData={setAllData}
            setShowNotificationPopup={setShowNotificationPopup}
            checkHeaderClick={checkHeaderClick}
          />
        </FormAlertPopUp>
      </div>
    </>
  );
};

export default ActiveUser;
