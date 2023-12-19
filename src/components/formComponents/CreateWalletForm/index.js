import { useEffect, useState } from "react";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";
import { errorToast, successToast } from "../../../utils/toast";
import { useLoader } from "../../../base/Context/loaderProvider";

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

  const loader = useLoader();

  const handleCreateCoin = () => {
    if (validate()) {
      loader.showLoader(true);

      fetchDataFromAPI(API_URL + NetworkConfiguration.ADDWALLET, "POST", {
        coins,
        price,
        offer,
      })
        .then((res) => {
          loader.showLoader(false);

          console.log(res);
          successToast(res.message);
          onSubmit();
        })
        .catch((err) => {
          loader.showLoader(false);

          errorToast(err.message);
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getOneCoin();
  }, []);

  const handleEditCoin = () => {
    loader.showLoader(true);

    fetchDataFromAPI(API_URL + NetworkConfiguration.UPDATEWALLET, "PUT", {
      id: id,
      coins: coins,
      price: price,
      offer: offer,
    })
      .then((res) => {
        console.log(res);
        onClickEdit();
        loader.showLoader(false);
        successToast(res.message);
      })
      .catch((err) => {
        console.log(err);
        loader.showLoader(false);

        errorToast(err.message);
      });
  };

  const getOneCoin = () => {
    loader.showLoader(true);

    fetchDataFromAPI(
      API_URL + NetworkConfiguration.GETONECOIN + `/${id}`,
      "GET"
    )
      .then((res) => {
        console.log(res);
        loader.showLoader(false);

        setCoins(res.result.coins);
        setOffer(res.result.offer);
        setPrice(res.result.price);
      })
      .catch((err) => {
        loader.showLoader(false);

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
      {edit ? (
        <h2 className="create__wallet__header">Update Coins</h2>
      ) : (
        <h2 className="create__wallet__header">Create Coins</h2>
      )}

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
