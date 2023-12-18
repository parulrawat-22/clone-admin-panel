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
  const [labels, setLabels] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [purchase, setPurchase] = useState([]);
  const [month, setMonth] = useState(false);
  const [week, setWeek] = useState(false);
  const [year, setYear] = useState(true);
  const [uData, setUData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [checkStartDate, setCheckStartDate] = useState(true);
  const [graphData, setGraphData] = useState([]);
  const [userGraphData, setUserGraphData] = useState([]);

  const [selectedValue, setSelectedValue] = useState("Year");

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  };

  const handleStartDate = (e) => {
    setCheckStartDate(false);
    setStartDate(e.target.value);
  };

  // useEffect(() => {
  //   // const sortedDates = earnings
  //   //   .map((item) => item.year + "-" + item.month + "-" + item.day)
  //   //   .sort();
  //   // const dataa = earnings.map((item) => item.count);
  //   // setUData(dataa);

  //   // // Setting the sorted dates as labels
  //   // setLabels(sortedDates);
  // }, [earnings]);

  //const uData = [];
  const pData = [];

  //host Earnings
  const handleHostEarning = () => {
    let hostEarningPayload = {
      startDate,
      endDate,
      month,
      year,
      week,
    };

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

  const handleAllUsers = () => {
    const graphPayload = {
      startDate,
      endDate,
      month,
      year,
      week,
    };
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.TOTALUSER,
      "POST",
      graphPayload
    )
      .then((res) => {
        console.log(res);
        setPurchase(res?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleHostEarning();
    handleAllUsers();
  }, []);

  useEffect(() => {
    handleHostEarning();
    handleAllUsers();
  }, [month, year, week, startDate, endDate]);

  const handleMonthClick = () => {
    console.log("hereeee");
    setMonth(true);
    setYear(false);
    setWeek(false);
  };

  const handleYearClick = () => {
    console.log("heree");
    setSelectedValue("Year");
    setYear(true);
    setWeek(false);
    setMonth(false);
  };
  const handleWeekClick = () => {
    setSelectedValue("Week");
    setWeek(true);
    setYear(false);
    setMonth(false);
  };

  useEffect(() => {
    switch (selectedValue) {
      case "Year":
        {
          let graphData = earnings.map((item) => ({
            count: item?.count,
            date: `${item.year}`,
          }));
          setGraphData(graphData);
          let userGraphData = purchase.map((item) => ({
            count: item?.count,
            date: `${item.year}`,
          }));
          setUserGraphData(userGraphData);
          setLabels(
            graphData.map((item) => {
              return item?.date;
            })
          );
          console.log(
            "Graph data: " +
              graphData.map((item) => {
                return item?.date;
              })
          );
        }

        break;
      case "Month":
        {
          let graphData = earnings.map((item) => ({
            count: item?.count,
            date: `${item.day}/${item.month}`,
          }));
          setGraphData(graphData);
          let userGraphData = purchase.map((item) => ({
            count: item?.count,
            date: `${item.year}`,
          }));
          setUserGraphData(userGraphData);
          setLabels(
            graphData.map((item) => {
              return item?.date;
            })
          );
          console.log(
            "Graph data: " +
              graphData.map((item) => {
                return item?.date;
              })
          );
        }
        break;
      case "Week":
        {
          let graphData = earnings.map((item) => ({
            count: item?.count,
            date: `${item.day}/${item.month}/${item.year}`,
          }));
          setGraphData(graphData);
          let userGraphData = purchase.map((item) => ({
            count: item?.count,
            date: `${item.day}/${item.month}/${item.year}`,
          }));
          setUserGraphData(userGraphData);
          setLabels(
            graphData.map((item) => {
              return item?.date;
            })
          );
          console.log(
            "Graph data: " +
              graphData.map((item) => {
                return item?.date;
              })
          );
        }
        break;
      default: {
        let graphData = earnings.map((item) => ({
          count: item?.count,
          date: `${item.day}/${item.month}/${item.year}`,
        }));
        setGraphData(graphData);
        let userGraphData = purchase.map((item) => ({
          count: item?.count,
          date: `${item.day}/${item.month}/${item.year}`,
        }));
        setUserGraphData(userGraphData);
        setLabels(
          graphData.map((item) => {
            return item?.date;
          })
        );
        console.log(
          "Graph data: " +
            graphData.map((item) => {
              return item?.date;
            })
        );
      }
    }
  }, [earnings, purchase, selectedValue]);

  console.log("earnings", earnings);
  console.log("labels", labels);
  console.log(uData, "iiiiiiiii");

  return (
    <div className="chart_box">
      <div className="dashboard_card_btn_row">
        <input type="date" value={startDate} onChange={handleStartDate} />
        <input
          type="date"
          value={endDate}
          onChange={handleEndDate}
          min={startDate}
          disabled={checkStartDate}
        />

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
      {graphData?.length > 0 && (
        <LineChart
          width={600}
          height={400}
          series={[
            {
              data: graphData.map((item) => {
                return item?.count;
              }),
              label: "Hosts",
            },
            {
              data: userGraphData.map((item) => {
                return item?.count;
              }),
              label: "Users",
            },
          ]}
          xAxis={[
            {
              scaleType: "point",
              data: labels,
            },
          ]}
        />
      )}
    </div>
  );
}

// export const getPreviousdateFromDate = (date, count) => {
//   let dates = [];

//   for (let i = count; i >= 0; i--) {
//     dates.push(moment(new Date(date)).subtract(i, "days").format("YYYY-MM-DD"));
//   }

//   return dates;
// };
