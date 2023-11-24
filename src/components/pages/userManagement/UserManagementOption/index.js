import { useParams } from "react-router-dom";
import "./style.css";
import MomentTable from "../../../Table/MomentTable";
import PaymentHistoryTable from "../../../Table/PaymentHistoryTable";
import NotificationTable from "../../../Table/NotificationTable";
import GiftTable from "../../../Table/GiftTable";
import CallHistory from "../../../Table/CallHistoryTable";
import FollowerTable from "../../../Table/FollowersTable";
import FollowingTable from "../../../Table/FollowingTable";
import UserBlockedList from "../../../Table/UserBlockList";
import UserReportTable from "../../../Table/UserReportTable";
import RechargeTable from "../../../Table/RechargeTable";
import StickerTable from "../../../Table/StickerTable";
import FeedbackUserTable from "../../../Table/FeedbackTable";
import Bucket from "../../../../pages/Bucket";

const UserManagementOption = () => {
  const { selectedOption } = useParams();

  const getOptionView = () => {
    switch (selectedOption) {
      case "feedback": {
        return <FeedbackUserTable />;
      }

      case "moments": {
        return <MomentTable />;
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
        return <UserReportTable />;
      }

      case "payment history": {
        return <PaymentHistoryTable />;
      }

      case "call history": {
        return <CallHistory />;
      }

      case "interest": {
        return <CallHistory />;
      }

      case "followers": {
        return <FollowerTable />;
      }

      case "following": {
        return <FollowingTable />;
      }

      case "block": {
        return <UserBlockedList />;
      }

      default: {
        return null;
      }
    }
  };

  return <>{getOptionView()}</>;
};

export default UserManagementOption;
