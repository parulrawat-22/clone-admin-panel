import { useParams } from "react-router-dom";
import NotificationTable from "../../../Table/NotificationTable";
import GiftTable from "../../../Table/GiftTable";
import StickerTable from "../../../Table/StickerTable";
import Bucket from "../../../../pages/Bucket";
import RechargeTable from "../../../Table/RechargeTable";
import PaymentHistoryTable from "../../../Table/PaymentHistoryTable";
import HostFeedbackTable from "../../../Table/HostFeedbackTable";
import HostReportTable from "../../../Table/HostReportTable";
import HostFollowerTable from "../../../Table/HostFollowerTable";
import HostFollowingTable from "../../../Table/HostFollowingTable";
import HostBlockTable from "../../../Table/HostBlockTable";
import HostCallHistoryTable from "../../../Table/HostCallHistoryTable";
import HostMomentTable from "../../../Table/HostMomentTable";
import "./style.css";

const HostManagementOption = () => {
  const { selectedOption } = useParams();

  const getOptionView = () => {
    console.log("selected option", selectedOption);
    switch (selectedOption) {
      case "feedback": {
        return <HostFeedbackTable />;
      }

      case "moments": {
        return <HostMomentTable />;
      }

      case "notification": {
        return <NotificationTable />;
      }

      case "gifts": {
        return <GiftTable />;
      }

      case "stickers": {
        return <StickerTable />;
      }

      case "bucket": {
        return <Bucket />;
      }

      case "recharge": {
        return <RechargeTable />;
      }

      case "report": {
        return <HostReportTable />;
      }

      case "payment history": {
        return <PaymentHistoryTable />;
      }

      case "call history": {
        return <HostCallHistoryTable />;
      }

      case "followers": {
        return <HostFollowerTable />;
      }

      case "following": {
        return <HostFollowingTable />;
      }

      case "block": {
        return <HostBlockTable />;
      }

      default: {
        return null;
      }
    }
  };

  return <>{getOptionView()}</>;
};

export default HostManagementOption;
