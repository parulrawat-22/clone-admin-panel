import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";

const CreateWalletForm = () => {
  return (
    <div>
      <InputField placeholder="Coin" />
      <br />
      <InputField placeholder="Price" />
      <br />
      <InputField placeholder="Offer Price" />
      <br />
      <Button className="create__wallet__btn" text="Done" />
    </div>
  );
};

export default CreateWalletForm;
