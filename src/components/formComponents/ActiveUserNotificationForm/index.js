import { useState } from "react";
import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";

const ActiveUserForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");

  const [error, setError] = useState({
    titleError: "",
    bodyError: "",
    imageError: "",
  });
  return (
    <div style={{ padding: "2px 0" }}>
      {/* {edit ? (
        <h2 className="create__wallet__header">Update Coins</h2>
      ) : (
        <h2 className="create__wallet__header">Create Coins</h2>
      )} */}

      <div style={{ padding: "1rem 2rem" }}>
        <InputField
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Coin"
          //   error={error.coinError}
          value={title}
        />
        <br />
        <InputField
          type="text"
          onChange={(e) => setBody(e.target.value)}
          placeholder="Price"
          //   error={error.priceError}
          value={body}
        />
        <br />
        <InputField
          type="file"
          onChange={(e) => {
            setImage(e.target.value);
          }}
          //   placeholder="Offer "
          value={image}
        />
        <br />
        <InputField
          type="file"
          onChange={(e) => {
            console.log("image :");
            setImage(e.target.files[0]);
          }}
          // value={image}
          error={error.imageError}
        />
        <br />
        <Button
        //   onClick={edit ? handleEditCoin : handleCreateCoin}
        //   className="create__wallet__btn"
        //   text={edit ? "Update" : "Done"}
        />
      </div>
    </div>
  );
};

export default ActiveUserForm;
