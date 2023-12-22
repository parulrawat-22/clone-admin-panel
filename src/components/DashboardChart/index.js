import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";
import "./style.css";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../network/NetworkConfiguration";
import SecondaryButton from "../library/SecondaryButton";
import moment from "moment";
import { useApi } from "../../base/Context/apiProvider";

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
  // const [graphData, setGraphData] = useState([]);
  // const [userGraphData, setUserGraphData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("Year");
  const [userData, setUserData] = useState([]);
  const [hostData, setHostData] = useState([]);
  const apiProvider = useApi();

  useEffect(() => {
    let graphData = earnings.map((item) => ({
      count: item?.count,
      date: `${item.day}/${item.month}/${item.year}`,
    }));
    let userGraphData = purchase.map((item) => ({
      count: item?.count,
      date: `${item.day}/${item.month}/${item.year}`,
    }));
    let newData = [
      ...graphData.map((item) => {
        return item?.date;
      }),
      ...userGraphData.map((item) => {
        return item?.date;
      }),
    ];
    let setData = [...new Set(newData)];
    // setUserGraphData(setData);
    console.log("setData", setData);
    const sortedDates = setData.sort((a, b) => {
      const firstDate = moment(a, "DD/MM/YYYY");
      const secondDate = moment(b, "DD/MM/YYYY");

      return firstDate - secondDate;
    });

    console.log("SortedDates", sortedDates);
    const mappedData = [];
    const userMappedData = [];
    sortedDates.forEach((date) => {
      const hostData = graphData.find((item) => {
        return date === item?.date;
      });

      mappedData.push(hostData ? hostData.count : 0);

      const userData = userGraphData.find((item) => {
        return date === item?.date;
      });

      userMappedData.push(userData ? userData.count : 0);
    });

    console.log("UserMappedData: " + userMappedData);
    console.log("HostMappedData: " + mappedData);
    setUserData(userMappedData);
    setHostData(mappedData);
    setLabels(sortedDates);
  }, [earnings, purchase]);

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
      startDate: moment(startDate).format("DD-MM-YYYY"),
      endDate: moment(endDate).format("DD-MM-YYYY"),
      month,
      year,
      week,
    };

    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.TOTALHOST,
      "POST",
      hostEarningPayload
    )
      .then((res) => {
        console.log("res123", res);
        setEarnings(res.result);
      })
      .catch((err) => {
        console.log(err, "err========");
        setEarnings([]);
      });
  };

  const handleAllUsers = () => {
    const graphPayload = {
      startDate: moment(startDate).format("DD-MM-YYYY"),
      endDate: moment(endDate).format("DD-MM-YYYY"),
      month,
      year,
      week,
    };
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.TOTALUSER,
      "POST",
      graphPayload
    )
      .then((res) => {
        console.log(res);
        setPurchase(res?.result);
      })
      .catch((err) => {
        console.log(err);
        setPurchase([]);
      });
  };

  useEffect(() => {
    handleHostEarning();
    handleAllUsers();
  }, []);

  useEffect(() => {
    if (endDate) {
      setMonth(false);
      setYear(false);
      setWeek(false);
    }
    handleHostEarning();
    handleAllUsers();
  }, [month, year, week, endDate]);

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
          let yearLabels = labels.map((label) => {
            return `${label.split("/")[1]}/${label.split("/")[2]}`;
          });
          console.log("yearLabels", yearLabels);
          setLabels(yearLabels);
          // let graphData = earnings.map((item) => ({
          //   count: item?.count,
          //   date: `${item.day}/${item.month}/${item.year}`,
          // }));
          // setGraphData(graphData);
          // let userGraphData = purchase.map((item) => ({
          //   count: item?.count,
          //   date: `${item.day}/${item.month}/${item.year}`,
          // }));
          // let newData = [
          //   ...graphData.map((item) => {
          //     return item?.date;
          //   }),
          //   ...userGraphData.map((item) => {
          //     return item?.date;
          //   }),
          // ];
          // let setData = [...new Set(newData)];
          // // setUserGraphData(setData);
          // console.log("setData", setData);
          // const sortedDates = setData.sort((a, b) => {
          //   const aDate = moment(a, "DD/MM/YYYY");
          //   const bDate = moment(b, "DD/MM/YYYY");
          //   return aDate - bDate;
          // });
          // console.log("SortedDates", sortedDates);
          // const mappedData = [];
          // const userMappedData = [];
          // sortedDates.forEach((date) => {
          //   const hostData = graphData.find((item) => {
          //     return date === item?.date;
          //   });
          //   mappedData.push(hostData ? hostData.count : 0);
          //   const userData = userGraphData.find((item) => {
          //     return date === item?.date;
          //   });
          //   userMappedData.push(userData ? userData.count : 0);
          // });
          // console.log("UserMappedData: " + userMappedData);
          // console.log("HostMappedData: " + mappedData);
          // setUserData(userMappedData);
          // setHostData(mappedData);
          // // setUserGraphData(adcg);
          // setLabels(sortedDates);
        }

        break;
      case "Month":
        {
          // let graphData = earnings.map((item) => ({
          //   count: item?.count,
          //   date: `${item.day}/${item.month}`,
          // }));
          // setGraphData(graphData);
          // let userGraphData = purchase.map((item) => ({
          //   count: item?.count,
          //   date: `${item.day}/${item.month}`,
          // }));
          // let newData = [
          //   ...graphData.map((item) => {
          //     return item?.date;
          //   }),
          //   ...userGraphData.map((item) => {
          //     return item?.date;
          //   }),
          // ];
          // let setData = [...new Set(newData)];
          // const dateObjects = setData.map((dateString) => {
          //   const [day, month, year] = dateString.split("/");
          //   console.log(month);
          //   return new Date(year, month - 1, day);
          // });
          // dateObjects.sort((a, b) => a - b);
          // const sortedDateStrings = dateObjects.map((date) => {
          //   const day = date.getDate();
          //   const month = date.getMonth() + 1;
          //   const year = date.getFullYear();
          //   return `${day}/${month}/${year}`;
          // });
          // const mappedData = [];
          // const userMappedData = [];
          // sortedDateStrings.forEach((date) => {
          //   const matchingItem = earnings.find((item) => {
          //     let date1 = `${item.day}/${item.month}/${item.year}`;
          //     return date1 === date;
          //   });
          //   mappedData.push(matchingItem ? matchingItem.count : 0);
          // });
          // sortedDateStrings.forEach((date) => {
          //   const matchingItem = purchase.find((item) => {
          //     let date1 = `${item.day}/${item.month}/${item.year}`;
          //     return date1 === date;
          //   });
          //   userMappedData.push(matchingItem ? matchingItem.count : 0);
          // });
          // setUserData(userMappedData);
          // setHostData(mappedData);
          // console.log("UserMappedData: " + userMappedData);
          // console.log("HostMappedData: " + mappedData);
          // // setUserGraphData(adcg);
          // setLabels(sortedDateStrings);
          // // setUserGraphData(setData);
          // setUserGraphData(userGraphData);
          // setLabels(setData);
        }
        break;
      case "Week":
        {
          // let graphData = earnings.map((item) => ({
          //   count: item?.count,
          //   date: `${item.day}/${item.month}/${item.year}`,
          // }));
          // setGraphData(graphData);
          // let userGraphData = purchase.map((item) => ({
          //   count: item?.count,
          //   date: `${item.day}/${item.month}/${item.year}`,
          // }));
          // setUserGraphData(userGraphData);
          // console.log("UserGraph: ", graphData, " ", userGraphData);
          // let newData = [
          //   ...graphData.map((item) => {
          //     return item?.date;
          //   }),
          //   ...userGraphData.map((item) => {
          //     return item?.date;
          //   }),
          // ];
          // let setData = [...new Set(newData)];
          // const dateObjects = setData.map((dateString) => {
          //   const [day, month, year] = dateString.split("/");
          //   console.log(month);
          //   return new Date(year, month - 1, day);
          // });
          // dateObjects.sort((a, b) => a - b);
          // const sortedDateStrings = dateObjects.map((date) => {
          //   const day = date.getDate();
          //   const month = date.getMonth() + 1;
          //   const year = date.getFullYear();
          //   return `${day}/${month}/${year}`;
          // });
          // console.log(sortedDateStrings);
          // const mappedData = [];
          // const userMappedData = [];
          // sortedDateStrings.forEach((date) => {
          //   const matchingItem = earnings.find((item) => {
          //     let date1 = `${item.day}/${item.month}/${item.year}`;
          //     return date1 === date;
          //   });
          //   mappedData.push(matchingItem ? matchingItem.count : 0);
          // });
          // sortedDateStrings.forEach((date) => {
          //   const matchingItem = purchase.find((item) => {
          //     let date1 = `${item.day}/${item.month}/${item.year}`;
          //     return date1 === date;
          //   });
          //   userMappedData.push(matchingItem ? matchingItem.count : 0);
          // });
          // setUserData(userMappedData);
          // setHostData(mappedData);
          // console.log("UserMappedData: " + userMappedData);
          // console.log("HostMappedData: " + mappedData);
          // // setUserGraphData(adcg);
          // setLabels(sortedDateStrings);
          // console.log("Set labels: ", setData);
          // // setUserGraphData(setData);
          // //setLabels(setData);
        }
        break;
      default: {
        // let graphData = earnings.map((item) => ({
        //   count: item?.count,
        //   date: `${item.day}/${item.month}/${item.year}`,
        // }));
        // setGraphData(graphData);
        // let userGraphData = purchase.map((item) => ({
        //   count: item?.count,
        //   date: `${item.day}/${item.month}/${item.year}`,
        // }));
        // let newData = [
        //   ...graphData.map((item) => {
        //     return item?.date;
        //   }),
        //   ...userGraphData.map((item) => {
        //     return item?.date;
        //   }),
        // ];
        // let setData = [new Set(newData)];
        // const dateObjects = setData.map((dateString) => {
        //   const [day, month, year] = dateString.split("/");
        //   console.log(month);
        //   return new Date(year, month - 1, day);
        // });
        // dateObjects.sort((a, b) => a - b);
        // const sortedDateStrings = dateObjects.map((date) => {
        //   const day = date.getDate();
        //   const month = date.getMonth() + 1;
        //   const year = date.getFullYear();
        //   return `${day}/${month}/${year}`;
        // });
        // const mappedData = [];
        // const userMappedData = [];
        // sortedDateStrings.forEach((date) => {
        //   const matchingItem = earnings.find((item) => {
        //     let date1 = `${item.day}/${item.month}/${item.year}`;
        //     return date1 === date;
        //   });
        //   mappedData.push(matchingItem ? matchingItem.count : 0);
        // });
        // sortedDateStrings.forEach((date) => {
        //   const matchingItem = purchase.find((item) => {
        //     let date1 = `${item.day}/${item.month}/${item.year}`;
        //     return date1 === date;
        //   });
        //   userMappedData.push(matchingItem ? matchingItem.count : 0);
        // });
        // setUserData(userMappedData);
        // setHostData(mappedData);
        // console.log("UserMappedData: " + userMappedData);
        // console.log("HostMappedData: " + mappedData);
        // // setUserGraphData(adcg);
        // setLabels(sortedDateStrings);
        // setUserGraphData(userGraphData);
        // // setLabels(setData);
      }
    }
  }, [selectedValue]);

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
      {hostData?.length > 0 && (
        <LineChart
          width={600}
          height={400}
          series={[
            {
              data: hostData.map((item) => {
                return item;
              }),
              label: "Hosts",
            },
            {
              data: userData.map((item) => {
                return item;
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
