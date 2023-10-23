import Feedback from "../../../../base/Assets/feedback.png";
import notification from "../../../../base/Assets/notification.png";
import gift from "../../../../base/Assets/gift-box (1).png";
import moment from "../../../../base/Assets/moments.png";
import sticker from "../../../../base/Assets/sticker.png";
import bucket from "../../../../base/Assets/Bucket.png";
import recharge from "../../../../base/Assets/recharge.png";
import report from "../../../../base/Assets/report.png";
import payment from "../../../../base/Assets/profile.png";
import callHistory from "../../../../base/Assets/call history.png";
import followers from "../../../../base/Assets/followers.png";
import following from "../../../../base/Assets/following.png";
import blockList from "../../../../base/Assets/blocked.png";
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
          <p>followers</p>
        </div>
        <div className="icon__container">
          <img className="icon" src={following} alt="" />
          <p>following</p>
        </div>
        <div className="icon__container">
          <img className="icon" src={blockList} alt="" />
          <p>Block</p>
        </div>
      </div>
    </div>
  );
};

export default IconContainer;
