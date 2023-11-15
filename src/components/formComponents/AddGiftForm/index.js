import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";

const AddGiftForm = () => {
  return (
    <div>
      <InputField placeholder="Gift Name" />
      <br />
      <InputField placeholder="Gift Price" />
      <br />

      <InputField placeholder="Upload Image" />
      <br />
      <div className="add" style={{ display: "flex", gap: "20px" }}>
        <Button className="add__gift__form__btn" text="Save" />
        <Button className="add__gift__form__btn" text="Cancel" />
      </div>
    </div>
  );
};

export default AddGiftForm;
