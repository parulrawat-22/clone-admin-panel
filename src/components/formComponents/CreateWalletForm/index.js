import { useEffect, useState } from "react";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";

const CreateWalletForm = ({ onSubmit, id, onClickEdit, edit }) => {
  console.log(onClickEdit, "234567987654");
  const [coins, setCoins] = useState("");
  const [price, setPrice] = useState("");
  const [offer, setOffer] = useState("");
  //const [edit, setEdit] = useState("");
  const [error, setError] = useState({
    coinError: "",
    priceError: "",
    offerError: "",
  });

  const handleCreateCoin = () => {
    if (validate()) {
      fetchDataFromAPI(API_URL + NetworkConfiguration.ADDWALLET, "POST", {
        coins,
        price,
        offer,
      })
        .then((res) => {
          console.log(res);
          onSubmit();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getOneCoin();
  }, []);

  const handleEditCoin = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.UPDATEWALLET, "PUT", {
      id: id,
      coins: coins,
      price: price,
      offer: offer,
    })
      .then((res) => {
        console.log(res);
        onClickEdit();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getOneCoin = () => {
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.GETONECOIN + `/${id}`,
      "GET"
    )
      .then((res) => {
        console.log(res);
        setCoins(res.result.coins);
        setOffer(res.result.offer);
        setPrice(res.result.price);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCoin = (e) => {
    setError({ ...error, coinError: "" });
    setCoins(e.target.value);
  };

  const handlePrice = (e) => {
    setError({ ...error, priceError: "" });
    setPrice(e.target.value);
  };

  const validate = () => {
    let result = true;
    if (!coins) {
      setError({ ...error, coinError: "Number of coins is required" });
      result = false;
    } else if (!price) {
      setError({ ...error, priceError: "Price is required" });
      result = false;
    }
    return result;
  };

  return (
    <div style={{ padding: "2px 0" }}>
      <h2 className="create__wallet__header">Create Coins</h2>

      <div style={{ padding: "1rem 2rem" }}>
        <InputField
          type="number"
          onChange={handleCoin}
          placeholder="Coin"
          error={error.coinError}
          value={coins}
        />
        <br />
        <InputField
          type="number"
          onChange={handlePrice}
          placeholder="Price"
          error={error.priceError}
          value={price}
        />
        <br />
        <InputField
          type="number"
          onChange={(e) => {
            setOffer(e.target.value);
          }}
          placeholder="Offer Price"
          value={offer}
        />
        <br />
        <Button
          onClick={edit ? handleEditCoin : handleCreateCoin}
          className="create__wallet__btn"
          text={edit ? "Update" : "Done"}
        />
      </div>
    </div>
  );
};

export default CreateWalletForm;
