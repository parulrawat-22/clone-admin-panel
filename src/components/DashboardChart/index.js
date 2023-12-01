import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";
import "./style.css";
import moment from "moment/moment";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../network/NetworkConfiguration";

export default function DashboardChart() {
  ////////////////////////////////
  const [endDate, setEndDate] = useState(new Date());
  const [labels, setLabels] = useState([]);
  const [earnings, setEarnings] = useState([]);

  const handleEnddate = (e) => {
    setEndDate(e.target.value);
  };

  useEffect(() => {
    let data = getPreviousdateFromDate(endDate, 6);
    setLabels(data);
  }, [endDate]);

  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];

  //host Earnings
  const handleHostEarning = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.HOSTEARNING, "POST", {
      startDate: moment(endDate).subtract(6, "days"),
      endDate: endDate,
    })
      .then((res) => {
        setEarnings(res.result);
      })
      .catch((err) => {
        console.log(err, "err========");
      });
  };

  useEffect(() => {
    handleHostEarning();
  }, [endDate]);

  console.log("earnings", earnings);
  console.log("labels", labels);

  ////////////////////////////////////////////

  return (
    <div className="chart_box">
      <div className="dashboard_card_btn_row">
        <input type="date" value={endDate} onChange={handleEnddate} />
        <button>Year</button>
        <button>Month</button>
        <button>Week</button>
      </div>
      {labels.length ? (
        <LineChart
          width={600}
          height={400}
          series={[
            { data: pData, label: "Hosts" },
            { data: uData, label: "Users" },
          ]}
          xAxis={[{ scaleType: "point", data: labels }]}
        />
      ) : null}
    </div>
  );
}

export const getPreviousdateFromDate = (date, count) => {
  let dates = [];

  for (let i = count; i >= 0; i--) {
    dates.push(moment(new Date(date)).subtract(i, "days").format("YYYY-MM-DD"));
  }

  return dates;
};
