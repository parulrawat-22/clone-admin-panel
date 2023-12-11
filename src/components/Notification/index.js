import { FiSearch } from "react-icons/fi";
import NotificationCard from "./NotificationCard";
import "./style.css";

const Notification = () => {
  const notificationSearchIcon = () => {
    return <FiSearch />;
  };
  return (
    <div>
      <h2 className="notification__heading">Recent Notifications</h2>
      <div className="notification__search_icon_bar">
        <i>{notificationSearchIcon()}</i>
        <input
          className="notification__search"
          placeholder="search connections"
        ></input>
      </div>
      <NotificationCard
        name="Sammy"
        message="I have a query regarding an issue i am facing in your "
        feedback="App Error"
      />
      <NotificationCard
        name="Sammy"
        message="I have a query regarding an issue i am facing in your "
        feedback="App Error"
      />
      <NotificationCard
        name="Sammy"
        message="I have a query regarding an issue i am facing in your "
        feedback="App Error"
      />
      <NotificationCard
        name="Sammy"
        message="I have a query regarding an issue i am facing in your "
        feedback="App Error"
      />
      <NotificationCard
        name="Sammy"
        message="I have a query regarding an issue i am facing in your "
        feedback="App Error"
      />
      <NotificationCard
        name="Sammy"
        message="I have a query regarding an issue i am facing in your "
        feedback="App Error"
      />
      <NotificationCard
        name="Sammy"
        message="I have a query regarding an issue i am facing in your "
        feedback="App Error"
      />
    </div>
  );
};

export default Notification;
