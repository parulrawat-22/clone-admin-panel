import "./style.css";

const NotificationCard = (props) => {
  return (
    <div>
      <div className="notification__card__container">
        <div className="notification__profile__image">
          <img src="" alt="" />
        </div>

        <div className="notification__card__content">
          <h4>{props.name}</h4>
          <p>{props.message}</p>
        </div>
      </div>
      <div>
        <span className="notification__card_feedback">{props.feedback}</span>
      </div>
    </div>
  );
};

export default NotificationCard;
