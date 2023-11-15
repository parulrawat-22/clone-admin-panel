import InputField from "../../components/library/InputField";
import TextArea from "../../components/library/TextArea";
import "./style.css";

const EditUser = () => {
  return (
    <div className="edit__user__inputs">
      <InputField placeholder="Name" />
      <InputField placeholder="Gender" />
      <InputField placeholder="Date Of Birth" />
      <InputField placeholder="Mobile Number" />
      <InputField placeholder="Email" />
      <InputField placeholder="Pin Code" />
      <InputField placeholder="Country" />
      <InputField placeholder="State" />
      <InputField placeholder="City" />
      <InputField placeholder="Profession" />
      <TextArea placeholder="Bio" />
    </div>
  );
};

export default EditUser;
