/**
 * @author: Parul Rawat
 * @since: 13th October 2023
 * @description:
 */

import Card from "../../components/Card";
import Layout from "../../components/Layout";
import Notification from "../../components/Notification";
import "./style.css";

const Dashboard = () => {
  return (
    <Layout>
      <div className="dashboard__container">
        <div>
          <div className="dashboard__cards_info">
            {[1, 2, 3, 4].map(() => {
              return <Cards />;
            })}
          </div>
          <div className="dashboard__graphs__loaders">
            <div className="dashboard__graph"></div>
            <div className="dashboard__loader">
              <h3 className="dashboard__loader__heading">Host Revenue</h3>
              <div class="progress-bar"></div>
            </div>
            <div className="dashboard__loader_2">
              <h3 className="dashboard__loader__heading">Host Revenue</h3>
              <div class="progress-bar"></div>
            </div>
          </div>
        </div>

        <div className="dashboard__notification">
          <Notification />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
