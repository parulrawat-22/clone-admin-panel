import BannerTable from "../../../Constant/BannerTable";
import Layout from "../../../components/Layout";
import "./style.css";

const BannerList = () => {
  return (
    <Layout>
      <div className="banner__list__container">
        <BannerTable />
      </div>
    </Layout>
  );
};

export default BannerList;
