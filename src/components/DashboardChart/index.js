import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";
import "./style.css";
import moment from "moment/moment";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../network/NetworkConfiguration";
import SecondaryButton from "../library/SecondaryButton";

export default function DashboardChart() {
  ////////////////////////////////
  const [endDate, setEndDate] = useState(new Date());
  const [labels, setLabels] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [month, setMonth] = useState(false);
  const [week, setWeek] = useState(false);
  const [year, setYear] = useState(false);

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
    let hostEarningPayload = {
      // startDate: moment(endDate).subtract(6, "days"),
      // endDate: endDate,
      month,
      year,
      week,
    };

    // if (year) hostEarningPayload = { year };
    // if (month) hostEarningPayload = { month };
    // if (week) hostEarningPayload = { week };

    // console.log("hostEarningPayload: ", JSON.stringify(hostEarningPayload));

    fetchDataFromAPI(
      API_URL + NetworkConfiguration.TOTALHOST,
      "POST",
      hostEarningPayload
    )
      .then((res) => {
        console.log("res123", res);
        setEarnings(res.result);
      })
      .catch((err) => {
        console.log(err, "err========");
      });
  };

  useEffect(() => {
    handleHostEarning();
  }, [endDate, month, week, year]);

  const handleMonthClick = () => {
    console.log("hereeee");
    setMonth(true);
    setYear(false);
    setWeek(false);
    //handleHostEarning();
  };

  const handleYearClick = () => {
    console.log("heree");
    setYear(true);
    setWeek(false);
    setMonth(false);
    let data = ["01/23", "02/23", "03/23", "01/23", "02/23", "03/23", "01/23"];
    setLabels(data);
  };

  const handleWeekClick = () => {
    setWeek(true);
    setYear(false);
    setMonth(false);
  };

  console.log("earnings", earnings);
  console.log("labels", labels);

  ////////////////////////////////////////////

  return (
    <div className="chart_box">
      <div className="dashboard_card_btn_row">
        <input type="date" value={endDate} onChange={handleEnddate} />
        <SecondaryButton
          style={{ cursor: "pointer" }}
          onClick={handleYearClick}
          text="Year"
        />
        <SecondaryButton
          style={{ cursor: "pointer" }}
          onClick={handleMonthClick}
          text="Month"
        />
        <SecondaryButton
          style={{ cursor: "pointer" }}
          onClick={handleWeekClick}
          text="Week"
        />
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
