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
  const [uData, setUData] = useState([]);

  const handleEnddate = (e) => {
    setEndDate(e.target.value);
  };

  useEffect(() => {
    const sortedDates = earnings
      .map((item) => item.year + "-" + item.month + "-" + item.day)
      .sort();
    const dataa = earnings.map((item) => item.count);

    setUData(dataa);

    // Setting the sorted dates as labels
    setLabels(sortedDates);
  }, [earnings]);

  //const uData = [];
  const pData = [];

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
    const sortedDates = earnings
      .map((item) => item.year + "-" + item.month + "-" + item.day)
      .sort();

    // Setting the sorted dates as labels
    const dataa = earnings.map((item) => item.count);
    setLabels(sortedDates);
    setUData(dataa);
  };

  const handleWeekClick = () => {
    setWeek(true);
    setYear(false);
    setMonth(false);
  };

  console.log("earnings", earnings);
  console.log("labels", labels);
  console.log(uData, "iiiiiiiii");

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

//-----------------------------------------------------------------------//

// import {
//   //   ResponsiveContainer,
//   CartesianGrid,
//   Legend,
//   Line,
//   // LineChart,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// // import {
// //   APIUrl,
// //   NetworkConfiguration,
// // } from "../../Network/networkConfiguration";
// // import { callAPI } from "../../Network/networkConnection";
// import DashboardCard from "../../component/DashboardCard/DashboardCard";
// import { StorageConstant } from "../../constant/StorageConstant";
// import InputField from "../../library/TextField";
// import useUserStore from "../../store/userStore";
// import "./style.css";

// const Dashboard = () => {
//   const [getDetails, setGetDetails] = useState([]);
//   const [sales, setSales] = React.useState([]);
//   const [users, setUsers] = React.useState([]);
//   const [graphData, setGraphData] = useState([]);
//   const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
//   const [selectedCustomDateRange, setSelectedCustomDateRange] = useState({
//     fromDate: "",
//     toDate: "",
//   });
//   const [selectedDateFilter, setSelectedDateFilter] = useState("");

//   useEffect(() => {
//     fetch();
//     fetchSales();
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     fetchSales(selectedCustomDateRange);
//     fetchUsers(selectedCustomDateRange);
//   }, [selectedCustomDateRange]);

//   useEffect(() => {
//     if (selectedDateFilter) {
//       const fromDate = moment()
//         .startOf(selectedDateFilter)
//         .format("YYYY-MM-DD hh:mm");
//       const toDate = moment()
//         .endOf(selectedDateFilter)
//         .format("YYYY-MM-DD hh:mm");

//       setSelectedCustomDateRange({
//         fromDate,
//         toDate,
//       });
//       if (selectedDateFilter === "custom") {
//         setShowCustomDatePicker(true);
//         setSelectedCustomDateRange({
//           fromDate: "",
//           toDate: "",
//         });
//       } else {
//         setShowCustomDatePicker(false);
//       }
//     } else {
//       setShowCustomDatePicker(false);
//       setSelectedCustomDateRange({
//         fromDate: "",
//         toDate: "",
//       });
//     }
//   }, [selectedDateFilter]);

//   useEffect(() => {
//     let usersSalesGraphData = [];
//     sales.forEach((sale) => {
//       usersSalesGraphData.push({
//         date: `${sale.day}/${sale.month}/${sale.year}`,
//         User: 0,
//         Orders: sale.count,
//       });
//     });

//   users.forEach((user) => {
//     let graphDataIndex = usersSalesGraphData.findIndex(
//       (graphData) =>
//         graphData.date === `${user.day}/${user.month}/${user.year}`
//     );
//     if (graphDataIndex >= 0) {
//       usersSalesGraphData[graphDataIndex]["User"] = user.count;
//     } else {
//       usersSalesGraphData.push({
//         date: `${user.day}/${user.month}/${user.year}`,
//         User: user.count,
//         Orders: 0,
//       });
//     }
//   });

//   console.log(
//     "Graph data after sorting: ",
//     usersSalesGraphData.sort(
//       (a, b) => parseFloat(a.monthsYears) - parseFloat(b.monthsYears)
//     )
//   );

//   setGraphData(
//     usersSalesGraphData.sort(
//       (a, b) => parseFloat(a.monthsYears) - parseFloat(b.monthsYears)
//     )
//   );
// }, [users, sales]);

// // useEffect(() => {
// //   let salesGraphData = [];
// //   sales.forEach((sale) => {
// //     salesGraphData.push({
// //       monthsYears: `${sale._id.month}, ${sale._id.year}`,
// //       count: sale.count,
// //       totalSaleAmount: sale.totalSaleAmount,
// //     });
// //   });
// //   setGraphData(...graphData, [salesGraphData]);
// // }, [sales]);
// // const rearrangedDataHost = Array(12).fill(null);
// // for (let i = 0; i < traffic.length; i++) {
// //   rearrangedDataHost[traffic[i]._id.month - 1] = traffic[i];
// // }

// // const rearrangedDataUser = Array(12).fill(null);
// // for (let i = 0; i < traffic2.length; i++) {
// //   rearrangedDataUser[traffic2[i].month - 1] = traffic2[i];
// // }

// useEffect(() => {
//   console.log("Graph data: ", graphData);
// }, [graphData]);

// useEffect(() => {
//   async function getLoginHeader() {
//     const loginHeader = await localStorage.getItem(
//       StorageConstant.LOGIN_HEADER
//     );
//     if (!loginHeader) {
//       navigate("/", { replace: true });
//     }
//   }
//   getLoginHeader();
// }, []);

// const fetch = () => {
//   callAPI(APIUrl + NetworkConfiguration.DASHBOARD, "GET")
//     .then((res) => {
//       setGetDetails(res);
//     })
//     .catch((err) => console.log("error", err));
// };

// const fetchSales = (selectedCustomDateRange) => {
//   callAPI(
//     APIUrl + NetworkConfiguration.MONTHLYSALES,
//     "POST",
//     JSON.stringify(selectedCustomDateRange),
//     {
//       "Content-Type": "application/json",
//     }
//   )
//     .then((res) => {
//       setSales(res.data);
//       console.log("Sales", res.data);
//     })
//     .catch((err) => console.log("error", err));
// };

// const fetchUsers = (selectedCustomDateRange) => {
//   callAPI(
//     APIUrl + NetworkConfiguration.MONTHLYUSER,
//     "POST",
//     JSON.stringify(selectedCustomDateRange),
//     {
//       "Content-Type": "application/json",
//     }
//   )
//     .then((res) => {
//       setUsers(res.data);
//       console.log("Users ", res.data);
//     })
//     .catch((err) => console.log("error", err));
// };
// return (
//   <div>
//     {/* <Layout> */}
//     <div className="middle_container_top_alignment">
//       <div className="breadcrumb__styling">
//         <div className="path_styling">
//           <h3 className="path__header">Dashboard</h3>
//           {/* <Breadcrumbs /> */}
//         </div>
//       </div>
//     </div>
//     <div
//       style={{
//         padding: "1rem 2rem",
//         width: "100%",
//         display: "flex",
//         rowGap: "0.5rem",
//         columnGap: "0.5rem",
//         flexWrap: "wrap",
//       }}
//     >
//       <div
//         style={{
//           flexGrow: 1,
//           flexShrink: 0,
//           justifyContent: "center",
//           display: "flex",
//         }}
//       >
//         <DashboardCard
//           onClick={() => {
//             navigate("/productList");
//           }}
//           c="d-1"
//           nonEditable={true}
//           title={"Total Products"}
//           icon={
//             <p style={{ fontSize: "2rem", fontWeight: "700" }}>
//               {getDetails.totalProducts}
//             </p>
//           }
//         />
//       </div>

//       <div
//         style={{
//           flexGrow: 1,
//           flexShrink: 0,
//           justifyContent: "center",
//           display: "flex",
//         }}
//       >
//         <DashboardCard
//           onClick={() => {
//             navigate("/Users");
//           }}
//           c="d-2"
//           nonEditable={true}
//           title={"Total Users"}
//           icon={
//             <p style={{ fontSize: "2rem", fontWeight: "700" }}>
//               {getDetails.totalUsers}
//             </p>
//           }
//         />
//       </div>
//       <div
//         style={{
//           flexGrow: 1,
//           flexShrink: 0,
//           justifyContent: "center",
//           display: "flex",
//         }}
//       >
//         <DashboardCard
//           onClick={() => {
//             navigate("/clients");
//           }}
//           c="d-3"
//           nonEditable={true}
//           title={"Total Clients"}
//           icon={
//             <p style={{ fontSize: "2rem", fontWeight: "700" }}>
//               {getDetails.totalClient}
//             </p>
//           }
//         />
//       </div>
//       <div
//         style={{
//           flexGrow: 1,
//           flexShrink: 0,
//           justifyContent: "center",
//           display: "flex",
//         }}
//       >
//         <DashboardCard
//           onClick={() => {
//             navigate("/orderhistory");
//           }}
//           c="d-4"
//           nonEditable={true}
//           title={"Total Completed Orders"}
//           icon={
//             <p style={{ fontSize: "2rem", fontWeight: "700" }}>
//               {getDetails.totalOrders}
//             </p>
//           }
//         />
//       </div>
//     </div>
//     <div className="back">
//       <div className="chart-heading">
//         <h1> Users and Montly Sales </h1>
//         <select
//           onChange={(e) => {
//             setSelectedDateFilter(e.target.value);
//           }}
//           style={{ padding: "10px", borderRadius: "none" }}
//           className="suspend_warning_action"
//         >
//           <option value="" selected default>
//             Select
//           </option>
//           <option className="suspend_warning_action" value="week">
//             This week
//           </option>
//           <option className="suspend_warning_action" value="month">
//             This month
//           </option>
//           <option className="suspend_warning_action" value="custom">
//             Custom date
//           </option>
//         </select>
//         {/* <p> Of The Year {traffic[0]?._id?.year}</p> */}
//       </div>

//       <div
//         className="dateRangeWrapper"
//         style={{ display: showCustomDatePicker ? "flex" : "none" }}
//       >
//         <InputField
//           onChange={(e) => {
//             console.log(
//               "From date value: ",
//               moment(e.target.value).format("YYYY-MM-DD hh:mm")
//             );
//             setSelectedCustomDateRange({
//               ...selectedCustomDateRange,
//               fromDate: moment(e.target.value).format("MM-DD-YYYY"),
//             });
//           }}
//           type="date"
//           label="From Date"
//         />
//       </div>
