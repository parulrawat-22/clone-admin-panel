import InputField from "../../library/InputField";
import "./style.css";

const AddLeaderForm = () => {
  return (
    <div>
      <InputField label="Leader Name" />
      <InputField label="Mobile Number" />
      <InputField label="Email" />
      <InputField label="Gender" />
      <InputField label="Group Name" />
      <InputField label="Pin Code" />
      <InputField label="Country" />
      <InputField label="State" />
      <InputField label="City" />
      <InputField label="ID Proof" />
    </div>
  );
};

export default AddLeaderForm;
