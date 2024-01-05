import { useEffect, useState } from "react";
import Button from "../../components/library/Button";
import "./style.css";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import { useApi } from "../../base/Context/apiProvider";
import { NetworkConfiguration } from "../../network/NetworkConfiguration";
import moment from "moment";
import FormAlertPopUp from "../../components/FormAlertPopUp";
import InactiveUserForm from "../../components/formComponents/InactiveUserForm";
import Pagination from "../../components/Pagination";
import SearchInput from "../../components/SearchInput";
import { FiSearch } from "react-icons/fi";
import { useLoader } from "../../base/Context/loaderProvider";
import Lottie from "react-lottie";
import noData from "../../base/Animation/No Data Found.json";

const ActiveHost = () => {
  const [activeHost, setActiveHost] = useState([]);
  const [data, setData] = useState([]);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [allData, setAllData] = useState([]);
  const [checkHeaderClick, setCheckHeaderClick] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [value, setValue] = useState("");
  const apiProvider = useApi();
  const loader = useLoader();

  const handleChange = (e) => {
    setData([...data, e.target.value]);
  };

  const handleAllchecked = (e) => {
    if (e.target.checked) {
      let activeHostId = activeHost.map((id) => {
        return id?._id;
      });
      setAllData(activeHostId);
      setData([]);
      setCheckHeaderClick(true);
    } else {
      setAllData([]);
      setCheckHeaderClick(false);
    }
  };

  const handleFormClick = () => {
    setShowNotificationPopup(true);
  };

  const handleFormClickClose = () => {
    setShowNotificationPopup(false);
  };

  useEffect(() => {
    fetchActiveHosts();
  }, [apiProvider?.apiUrl, page, perPage, value]);

  const fetchActiveHosts = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.ONLINEHOST,
      "POST",
      {
        key: value,
        page,
        perPage,
      }
    )
      .then((res) => {
        console.log(res);
        setActiveHost(res?.data);
        setTotalCount(res?.totalCount);
        setTotalPages(res?.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
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
        <div className="active__user">
          <Button
            style={{ textAlign: "center" }}
            text="Send Notification"
            onClick={handleFormClick}
          />
        </div>
        <div className="table_parent_box">
          <table className="active__user__table">
            <thead>
              <th className="active__user__header">
                <input
                  onChange={handleAllchecked}
                  type="checkbox"
                  className="active__user__input"
                />
              </th>
              <th className="active__user__header">S.No.</th>
              <th className="active__user__header">Host Id</th>
              <th className="active__user__header">Name</th>
              <th className="active__user__header">Group Name</th>
              <th className="active__user__header">Leader ID</th>
              <th className="active__user__header">Joining Date</th>
              {/* <th className="active__user__header">Current Week Earning</th> */}
            </thead>
            <tbody>
              {activeHost && activeHost.length > 0
                ? activeHost.map((data, index) => {
                    return (
                      <tr>
                        <td className="active__user__data">
                          <input
                            className="active__user__input"
                            type="checkbox"
                            value={data?._id}
                            onChange={handleChange}
                            {...(checkHeaderClick ? { checked: true } : {})}
                          />
                        </td>
                        <td className="active__user__data">
                          {(page - 1) * perPage + index + 1}
                        </td>
                        <td className="active__user__data">{data?._id}</td>
                        <td className="active__user__data">{data?.name}</td>

                        <td className="active__user__data">
                          {data?.leader?.groupName}
                        </td>
                        <td className="active__user__data">
                          {data?.leader?._id}
                        </td>
                        <td className="active__user__data">
                          {moment(data?.createdAt).format("DD/MM/YYYY ,LT")}
                        </td>
                        {/* <td className="active__user__data">{data?.leaderId}</td> */}
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </table>
        </div>

        {activeHost && activeHost.length > 0 ? (
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
          onRequestClose={handleFormClickClose}
        >
          <InactiveUserForm
            data={data}
            setShowNotificationPopup={setShowNotificationPopup}
            allData={allData}
            checkHeaderClick={checkHeaderClick}
          />
        </FormAlertPopUp>
      </div>
    </>
  );
};

export default ActiveHost;
