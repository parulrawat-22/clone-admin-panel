import { useEffect, useState } from "react";
import SuspendedUserTable from "../../components/Table/SuspendedUserTable";
import SuspendedHostTable from "../../components/Table/SuspendedHostTable";
import { useSearchParams } from "react-router-dom";
import "./style.css";

const SuspendedUsers = () => {
  const [isHost, setIsHost] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams?.get("appType") === "host") {
      setIsHost(true);
    } else {
      setIsHost(false);
    }
  }, [searchParams]);

  return <>{isHost ? <SuspendedHostTable /> : <SuspendedUserTable />}</>;
};

export default SuspendedUsers;
