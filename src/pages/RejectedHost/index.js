import "./style.css";
import Layout from "../../components/Layout";
import RejectedHostTable from "../../components/Table/RejectedHostTable";

const RejectedHost = () => {
  return (
    <Layout>
      <RejectedHostTable />
    </Layout>
  );
};

export default RejectedHost;
