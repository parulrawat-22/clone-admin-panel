import Layout from "../../components/Layout";
import MomentTable from "../../components/Table/MomentTable";
import "./style.css";

const Moments = () => {
  return (
    <Layout>
      <div className="moment__container">
        <MomentTable />
      </div>
    </Layout>
  );
};

export default Moments;
