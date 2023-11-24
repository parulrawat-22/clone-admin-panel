import TopTalentTable from "../../components/Table/TopTalentTable";
import Dropdown from "../../components/library/Dropdown";
import "./style.css";
import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../network/NetworkConfiguration";

const TopGrowing = () => {
  const [getSetValue, setGetSetValue] = useState();
  const [tableData, setTableData] = useState([]);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    switch (getSetValue) {
      case "Weekly Talent": {
        fetchDataFromAPI(API_URL + NetworkConfiguration.WEEKLYTALENT, "GET")
          .then((res) => {
            setTableData(res.result);
            setIsHost(false);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      }

      case "Top Star": {
        fetchDataFromAPI(API_URL + NetworkConfiguration.TOPSTAR, "GET")
          .then((res) => {
            setTableData(res.hostUsers);
            setIsHost(true);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      }

      case "Weekly Star": {
        fetchDataFromAPI(API_URL + NetworkConfiguration.WEEKLYTALENT, "GET")
          .then((res) => {
            setTableData(res.result);
            setIsHost(true);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      }

      case "New Star": {
        fetchDataFromAPI(API_URL + NetworkConfiguration.NEWSTAR, "GET")
          .then((res) => {
            setTableData(res.result);
            setIsHost(true);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      }

      default: {
        fetchDataFromAPI(API_URL + NetworkConfiguration.GETTOPTALENT, "GET")
          .then((res) => {
            setTableData(res.result);
            setIsHost(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [getSetValue]);

  const onChangeDropdown = (e) => {
    setGetSetValue(e.target.value);
    console.log("onChangeDropdown: ", e.target.value);
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
      <TopTalentTable isHost={isHost} tableData={tableData} />
    </div>
  );
};

export default TopGrowing;
