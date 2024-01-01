import { useEffect, useState } from "react";
// import Pagination from "../../components/Pagination";
import SearchInput from "../../components/SearchInput";
import Dropdown from "../../components/library/Dropdown";
import "./style.css";
import { FiSearch } from "react-icons/fi";
import AllCallHistoryTable from "../../components/Table/AllCallHistoryTable";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import { useApi } from "../../base/Context/apiProvider";
import { NetworkConfiguration } from "../../network/NetworkConfiguration";

const MainCallHistory = () => {
  const [getSetValue, setGetSetValue] = useState();
  const [callHistory, setCallHistory] = useState([]);
  const apiProvider = useApi();

  const onChangeDropdown = (e) => {
    setGetSetValue(e.target.value);
    console.log("onChangeDropdown: ", e.target.value);
  };

  useEffect(() => {
    switch (getSetValue) {
      case "Drop Call": {
        fetchDataFromAPI(
          apiProvider?.apiUrl + NetworkConfiguration.DROPPEDCALL,
          "POST",
          {
            key: "Drop Call",
          }
        )
          .then((res) => {
            setCallHistory(res?.result);
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      }

      case "Small Call": {
        fetchDataFromAPI(
          apiProvider?.apiUrl + NetworkConfiguration.DROPPEDCALL,
          "POST",
          {
            key: "Small Call",
          }
        )
          .then((res) => {
            setCallHistory(res?.result);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      }

      case "Long Call": {
        fetchDataFromAPI(
          apiProvider?.apiUrl + NetworkConfiguration.DROPPEDCALL,
          "POST",
          {
            key: "Long Call",
          }
        )
          .then((res) => {
            setCallHistory(res?.result);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      }
      default: {
        fetchDataFromAPI(
          apiProvider?.apiUrl + NetworkConfiguration.DROPPEDCALL,
          "POST",
          {
            key: "Small Call",
          }
        )
          .then((res) => {
            setCallHistory(res?.result);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      }
    }
  }, [getSetValue]);

  const searchIcon = () => {
    return <FiSearch />;
  };
  return (
    <div>
      <div className="top__growing__dropdown">
        <Dropdown
          onChange={onChangeDropdown}
          options={[
            { name: "Dropped Calls", value: "Dropped Calls" },
            { name: "Small Calls", value: "Small Calls" },
            { name: "Long Calls", value: "Long Calls" },
            { name: "Most Loved", value: "Most Loved" },
          ]}
        ></Dropdown>
      </div>

      <AllCallHistoryTable
        callHistory={callHistory}
        // tableData={tableData}
        // page={page}
        // perPage={perPage}
      />
      <div className="banner__search__btn">
        <SearchInput placeholder="Search" icon={searchIcon()} />
      </div>

      {/* {tableData && tableData.length > 0 ? (
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
      )} */}
    </div>
  );
};

export default MainCallHistory;
