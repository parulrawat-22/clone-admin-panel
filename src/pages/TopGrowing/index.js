import TopTalentTable from "../../components/Table/TopTalentTable";
import Dropdown from "../../components/library/Dropdown";
import "./style.css";
import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../network/NetworkConfiguration";
import { FiSearch } from "react-icons/fi";
import SearchInput from "../../components/SearchInput";
import Pagination from "../../components/Pagination";

const TopGrowing = () => {
  const [getSetValue, setGetSetValue] = useState();
  const [tableData, setTableData] = useState([]);
  const [isHost, setIsHost] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");

  useEffect(() => {
    switch (getSetValue) {
      case "Weekly Talent": {
        fetchDataFromAPI(API_URL + NetworkConfiguration.WEEKLYTALENT, "POST", {
          page,
          perPage,
        })
          .then((res) => {
            setTableData(res.result);
            setTotalCount(res?.totalCount);
            setTotalPages(res?.totalPages);
            setIsHost(false);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      }

      case "Top Star": {
        fetchDataFromAPI(API_URL + NetworkConfiguration.TOPSTAR, "POST", {
          page,
          perPage,
        })
          .then((res) => {
            setTableData(res.hostUsers);
            setTotalCount(res.totalCount);
            setTotalPages(res.totalPages);
            setIsHost(true);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      }

      case "Weekly Star": {
        fetchDataFromAPI(API_URL + NetworkConfiguration.WEEKLYSTAR, "POST", {
          page,
          perPage,
        })
          .then((res) => {
            setTableData(res.hostUsers);
            setTotalCount(res.totalCount);
            setTotalPages(res.totalPages);
            setIsHost(true);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      }

      case "New Star": {
        fetchDataFromAPI(API_URL + NetworkConfiguration.NEWSTAR, "POST", {
          page,
          perPage,
        })
          .then((res) => {
            setTableData(res.result);
            setTotalCount(res.totalCount);
            setTotalPages(res.totalPages);
            setIsHost(true);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      }

      default: {
        fetchDataFromAPI(API_URL + NetworkConfiguration.GETTOPTALENT, "POST", {
          page,
          perPage,
        })
          .then((res) => {
            setTableData(res.result);
            setIsHost(false);
            setTotalCount(res?.totalCount);
            setTotalPages(res?.totalPages);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [getSetValue, page, perPage]);

  const onChangeDropdown = (e) => {
    setGetSetValue(e.target.value);
    console.log("onChangeDropdown: ", e.target.value);
  };

  const searchIcon = () => {
    return <FiSearch />;
  };

  return (
    <div>
      <div className="top__growing__dropdown">
        <Dropdown
          onChange={onChangeDropdown}
          options={[
            { name: "Top Talent", value: "Top Talent" },
            { name: "Weekly Talent", value: "Weekly Talent" },
            { name: "Top Star", value: "Top Star" },
            { name: "Weekly Star", value: "Weekly Star" },
            { name: "New Star", value: "New Star" },
          ]}
        ></Dropdown>
      </div>
      <TopTalentTable
        page={page}
        perPage={perPage}
        isHost={isHost}
        tableData={tableData}
      />
      <div className="banner__search__btn">
        <SearchInput placeholder="Search" icon={searchIcon()} />
      </div>

      <Pagination
        page={page}
        setPage={setPage}
        perPage={perPage}
        setPerPage={setPerPage}
        totalCount={totalCount}
        totalPages={totalPages}
        options={[5, 10, 15, 20]}
      />
    </div>
  );
};

export default TopGrowing;
