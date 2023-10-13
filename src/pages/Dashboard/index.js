/**
 * @author: Parul Rawat
 * @copyright: 13th October 2023
 * @description
 */

import Cards from "../../components/Cards";
import Layout from "../../components/Layout";
import "./style.css";

const Dashboard = ({}) => {
  return (
    <Layout>
      <div className="dashboard__container">
        <div className="dashboard__cards_info">
          <Cards />
          <Cards />
          <Cards />
          <Cards />
        </div>

        <div className="dashboard__notification"></div>
      </div>
    </Layout>
  );
};

export default Dashboard;
