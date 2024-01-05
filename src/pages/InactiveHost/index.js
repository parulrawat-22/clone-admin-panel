import { useEffect, useState } from "react";
import { useApi } from "../../base/Context/apiProvider";
import Button from "../../components/library/Button";
import { NetworkConfiguration } from "../../network/NetworkConfiguration";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import moment from "moment";
import FormAlertPopUp from "../../components/FormAlertPopUp";
import InactiveUserForm from "../../components/formComponents/InactiveUserForm";
import "./style.css";
import Pagination from "../../components/Pagination";
import Lottie from "react-lottie";
import { useLoader } from "../../base/Context/loaderProvider";
import noData from "../../base/Animation/No Data Found.json";
import SearchInput from "../../components/SearchInput";
import { FiSearch } from "react-icons/fi";

const InactiveHost = () => {
  const apiProvider = useApi();
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [inactiveHost, setInactiveHost] = useState([]);
  const [checkHeaderClick, setCheckHeaderClick] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [value, setValue] = useState("");
  const loader = useLoader();

  const handleChange = (e) => {
    if (e.target.checked) {
      setData([...data, e.target.value]);
    } else {
      let newData = data.filter((hostId) => hostId !== e.target.value);
      console.log(newData);
      setData(newData);
    }
  };

  const handleAllChecked = (e) => {
    if (e.target.checked) {
      let allHostId = inactiveHost.map((id) => {
        return id._id;
      });
      setCheckHeaderClick(true);
      setAllData(allHostId);
      setData([]);
    } else {
      setCheckHeaderClick(false);
      setAllData([]);
    }
  };

  useEffect(() => {
    fetchInactiveHost();
  }, [value, page, perPage, apiProvider?.apiUrl]);

  const fetchInactiveHost = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.OFFLINEHOST,
      "POST",
      {
        key: value,
        page,
        perPage,
      }
    )
      .then((res) => {
        loader.showLoader(false);
        console.log(res);
        setInactiveHost(res?.data);
        setTotalCount(res?.totalCount);
        setTotalPages(res?.totalPages);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };

  const handleNotificationAlert = () => {
    setShowNotificationPopup(true);
  };

  const handleNotificationAlertClose = () => {
    setShowNotificationPopup(false);
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
                />
              </th>
              <th className="active__user__header">S.No.</th>
              <th className="active__user__header">Host ID</th>
              <th className="active__user__header">Host Name</th>
              <th className="active__user__header">Group Name</th>
              <th className="active__user__header">Leader Id</th>
              <th className="active__user__header">Joining Date</th>
              <th className="active__user__header">Current Week Earning</th>
            </thead>
            <tbody>
              {inactiveHost && inactiveHost.length > 0
                ? inactiveHost.map((data, index) => {
                    return (
                      <tr>
                        <td className="active__user__data">
                          <input
                            className="active__user__input"
                            type="checkbox"
                            onChange={handleChange}
                            value={data?._id}
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
                          {moment(data?.createdAt).format("DD/MM/YYYY , LT")}
                        </td>
                        <td className="active__user__data">{data?.name}</td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </table>
        </div>

        {inactiveHost && inactiveHost.length > 0 ? (
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
          onRequestClose={handleNotificationAlertClose}
        >
          <InactiveUserForm
            data={data}
            allData={allData}
            setShowNotificationPopup={setShowNotificationPopup}
            checkHeaderClick={checkHeaderClick}
          />
        </FormAlertPopUp>
      </div>
    </>
  );
};

export default InactiveHost;
