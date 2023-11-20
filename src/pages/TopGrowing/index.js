import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import TopTalentTable from "../../components/Table/TopTalentTable";
import Dropdown from "../../components/library/Dropdown";
import "./style.css";

const TopGrowing = () => {
  //   let navigate = useNavigate();
  return (
    <Layout>
      <div className="top__growing__dropdown">
        <Dropdown
          option1="Top Talent"
          option2="Weekly Talent"
          option3="Top Star"
          option4="Weekly Star"
          option5="New Star"
        />
      </div>
      <TopTalentTable />
    </Layout>
  );
};

export default TopGrowing;
