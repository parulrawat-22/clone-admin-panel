import { useEffect, useState } from "react";
import "./style.css";
import UserSuspiciousData from "../../components/Table/UserSuspiciousDataTable";
import HostSuspiciousData from "../../components/Table/HostSuspiciousDataTable";
import { useSearchParams } from "react-router-dom";

const SuspiciousData = () => {
  const [isHost, setIsHost] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("appType") === "host") {
      setIsHost(true);
    } else {
      setIsHost(false);
    }
  });

  return <>{isHost ? <HostSuspiciousData /> : <UserSuspiciousData />}</>;
};

export default SuspiciousData;
