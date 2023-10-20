import Button from "../../../library/Button";
import InputField from "../../../library/InputField";
import TextArea from "../../../library/TextArea";
import "./style.css";

const EditCoins = () => {
  return (
    <div>
      <h3>Edit Coins</h3>
      <br /> <br />
      <InputField label="Reason for coin deduction" />
      <br />
      <TextArea placeholder="Number of Coins" />
      <br />
      <Button text="Submit" />
    </div>
  );
};

export default EditCoins;
