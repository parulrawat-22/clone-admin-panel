import Layout from "../../components/Layout";
import EditCoins from "../../components/pages/bucket/EditCoins";
import "./style.css";

const Bucket = () => {
  return (
    <Layout>
      <div className="bucket__container">
        <div className="bucket__coin__amount">
          <div className="bucket__coin">
            <h4>Coins</h4>
            <br />
            <p>₹ 250</p>
          </div>
          <div className="bucket__coin">
            <h4>Amount</h4>
            <br />

            <p>₹ 250</p>
          </div>
        </div>
        <EditCoins />
      </div>
    </Layout>
  );
};

export default Bucket;
