import Layout from "../../components/Layout";
import RechargeTable from "../../components/Table/RechargeTable";
import "./style.css";

const Recharge = () => {
  return (
    <Layout>
      <div className="recharge__container">
        <RechargeTable />
      </div>
    </Layout>
  );
};

export default Recharge;
