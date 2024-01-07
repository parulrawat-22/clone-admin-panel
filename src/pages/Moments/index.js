import { useEffect, useState } from "react";
import MomentTable from "../../components/Table/MomentTable";
import HostMomentTable from "../../components/Table/HostMomentTable";
import { useSearchParams } from "react-router-dom";
import "./style.css";

const Moments = () => {
  const [isHost, setIsHost] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("appType") === "host") {
      setIsHost(true);
    } else {
      setIsHost(false);
    }
  });

  return <>{isHost ? <HostMomentTable /> : <MomentTable />}</>;
};

export default Moments;
