import { FiSearch } from "react-icons/fi";
import NotificationCard from "./NotificationCard";
import "./style.css";

const Notification = () => {
  return (
    <div>
      <h2 className="notification__heading">Recent Notifications</h2>
      <input
        className="notification__search"
        placeholder="search connections"
        // icon={<FiSearch />}
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
      <NotificationCard
        name="Sammy"
        message="I have a query regarding an issue i am facing in your "
        feedback="App Error"
      />
    </div>
  );
};

export default Notification;
