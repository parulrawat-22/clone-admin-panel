import "./style.css";
import profile from "../../../base/Assets/profile.png";

const NotificationCard = (props) => {
  return (
    <div className="notification__card__container">
      <div className="notification__profile__image">
        <img className="notification__img" src={profile} alt="profile" />
      </div>

      <div className="notification_message_box">
        <div className="notification_content">
          <div className="notification_content_row">
            <p className="notification_title">{props.name}</p>
            <p className="notification_for_btn">{props.statusType}</p>
            <p>{props.time}</p>
          </div>
          <p className="notification_message">{props.message}</p>
        </div>

        <div className="notification_feedback">{props.feedback}</div>
      </div>
    </div>
  );
};

export default NotificationCard;
