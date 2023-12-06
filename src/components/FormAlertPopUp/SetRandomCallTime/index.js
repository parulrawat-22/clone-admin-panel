import { useState } from "react";
import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";

export const SetRandomCallTime = () => {
  const [randomVideoTime, setRandomVideoTime] = useState("");
  return (
    <div className="premium__coin__container">
      <h2 className="premium__coin__heading">Set Random Call Time</h2>
      <div className="premium__coin">
        <InputField
          placeholder="Set Random Call Time in sec"
          onChange={(e) => {
            setRandomVideoTime(e.target.value);
          }}
        />
        <br />
        <Button
          // onClick={handleSetPremiumCoin}
          text="Update"
          style={{ margin: "auto" }}
        />
      </div>
    </div>
  );
};
