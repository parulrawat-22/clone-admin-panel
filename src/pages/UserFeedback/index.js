import { useEffect, useState } from "react";
import FeedbackUserTable from "../../components/Table/FeedbackTable";
import "./style.css";
import HostFeedbackTable from "../../components/Table/HostFeedbackTable";
import { useSearchParams } from "react-router-dom";

const UserFeedback = () => {
  const [isHost, setIsHost] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("appType") === "host") {
      setIsHost(true);
    } else {
      setIsHost(false);
    }
  });

  return <>{isHost ? <HostFeedbackTable /> : <FeedbackUserTable />}</>;
};

export default UserFeedback;
