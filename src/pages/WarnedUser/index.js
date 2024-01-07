import { useEffect, useState } from "react";
import "./style.css";
import WarnedUserTable from "../../components/Table/WarnedUserTable";
import WarnedHostTable from "../../components/Table/WarnedHostTable";
import { useSearchParams } from "react-router-dom";

const WarnedUsers = () => {
  const [isHost, setIsHost] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("appType") === "host") {
      setIsHost(true);
    } else {
      setIsHost(false);
    }
  }, [searchParams]);

  return <>{isHost ? <WarnedHostTable /> : <WarnedUserTable />}</>;
};

export default WarnedUsers;
