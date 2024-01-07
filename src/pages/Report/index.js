import { useEffect, useState } from "react";
import UserReportTable from "../../components/Table/UserReportTable";
import "./style.css";
import HostReportTable from "../../components/Table/HostReportTable";
import { useSearchParams } from "react-router-dom";

const Report = () => {
  const [isHost, setIsHost] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("appType") === "host") {
      setIsHost(true);
    } else {
      setIsHost(false);
    }
  });

  return <>{isHost ? <HostReportTable /> : <UserReportTable />}</>;
};

export default Report;
