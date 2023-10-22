import Feedback from "../../../../base/assets/feedback.png";
import notification from "../../../../base/assets/notification.png";
import gift from "../../../../base/assets/gift-box (1).png";
import moment from "../../../../base/assets/moments.png";
import sticker from "../../../../base/assets/sticker.png";
import bucket from "../../../../base/assets/Bucket.png";
import recharge from "../../../../base/assets/recharge.png";
import report from "../../../../base/assets/report.png";
import payment from "../../../../base/assets/payment history.png";
import callHistory from "../../../../base/assets/call history.png";
import followers from "../../../../base/assets/followers.png";
import following from "../../../../base/assets/following.png";
import blockList from "../../../../base/assets/blocked.png";
import "./style.css";

const IconContainer = () => {
  return (
    <div className="user__management__icon__container">
      <div className="user__management__icon__row">
        <div className="icon__container">
          <img className="icon" src={Feedback} alt="" />
          <p>Feedback</p>
        </div>
        <div className="icon__container">
          <img className="icon" src={notification} alt="" />
          <p>Notification</p>
        </div>
        <div className="icon__container">
          <img className="icon" src={gift} alt="" />
          <p>Gifts</p>
        </div>
        <div className="icon__container">
          <img className="icon" src={moment} alt="" />
          <p>Moments</p>
        </div>
        <div className="icon__container">
          <img className="icon" src={sticker} alt="" />
          <p>Stickers</p>
        </div>
        <div className="icon__container">
          <img className="icon" src={bucket} alt="" />
          <p>Bucket</p>
        </div>
        <div className="icon__container">
          <img className="icon" src={recharge} alt="" />
          <p>Recharge</p>
        </div>
        <div className="icon__container">
          <img className="icon" src={report} alt="" />
          <p>Report</p>
        </div>
        <div className="icon__container">
          <img className="icon" src={payment} alt="" />
          <p>Payment History</p>
        </div>
        <div className="icon__container">
          <img className="icon" src={callHistory} alt="" />
          <p>Call History</p>
        </div>
        <div className="icon__container">
          <img className="icon" src={followers} alt="" />
          <p>Report</p>
        </div>
        <div className="icon__container">
          <img className="icon" src={following} alt="" />
          <p>Report</p>
        </div>
        <div className="icon__container">
          <img className="icon" src={blockList} alt="" />
          <p>Report</p>
        </div>
      </div>
    </div>
  );
};

export default IconContainer;
