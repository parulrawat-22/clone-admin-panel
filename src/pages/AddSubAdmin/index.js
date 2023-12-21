import Button from "../../components/library/Button";
import InputField from "../../components/library/InputField";
import "./style.css";

const AddSubAdmin = () => {
  return (
    <div className="add__subadmin__container">
      {/* <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      > */}
      <InputField label="Name" />
      <br />
      <InputField label="Email" />
      <br />
      {/* </div> */}
      {/* <div style={{ display: "flex", justifyContent: "flex-start" }}> */}
      <InputField label="Password" />
      <br />

      <InputField label="Confirm Password" />
      <br />
      {/* </div> */}
      <Button text="Submit" style={{ margin: "auto", marginTop: "1rem" }} />
    </div>
  );
};

export default AddSubAdmin;
