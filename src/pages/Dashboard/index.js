/**
 * @author: Parul Rawat
 * @copyright: 13th October 2023
 * @description
 */

import Card from "../../components/Card";
import Layout from "../../components/Layout";
import "./style.css";

const Dashboard = () => {
  return (
    <Layout>
      <div className="dashboard__container">
        <div className="dashboard__cards_info">
          {[1, 2, 3, 4].map(() => {
            return <Card />;
          })}
        </div>

        <div className="dashboard__notification"></div>
      </div>
    </Layout>
  );
};

export default Dashboard;
