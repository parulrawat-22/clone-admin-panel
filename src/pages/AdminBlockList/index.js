import { useEffect, useState } from "react";
import "./style.css";
import AdminBlockUser from "../../components/Table/AdminBlockUser";
import AdminBlockHost from "../../components/Table/AdminBlockHost";
import { useSearchParams } from "react-router-dom";

const AdminBlockList = () => {
  const [isHost, setIsHost] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("appType") === "host") {
      setIsHost(true);
    } else {
      setIsHost(false);
    }
  });

  return <>{isHost ? <AdminBlockHost /> : <AdminBlockUser />}</>;
};

export default AdminBlockList;
