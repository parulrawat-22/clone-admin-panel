import { useState } from "react";
import "./style.css";

const InputField = (props) => {
  const [inputActive, setInputactive] = useState(false);

  const handleLabel = () => {
    setInputactive(true);
  };
  return (
    <div className="input__field__container">
      {/* {props?.label ? ( */}
      <label
        className="input__field__label"
        onClick={handleLabel}
        style={{ transform: inputActive ? `translate(0,-1.5rem)` : null }}
      >
        {props?.label}
      </label>
      {/* // ) : null} */}
      <input
        style={props.style}
        className={`input__styling ${props.className}`}
        placeholder={props.placeholder}
        type={props.type}
        onChange={props.onChange}
        value={props.value}
        min={props.min}
        accept={props.accept}
        // max={props.max}
        name={props.name}
        maxLength={props.maxlength}
        minLength={props.minlength}
        autoFocus={props.autoFocus}
        onKeyDown={props.onKeyDown}
      />
      <div onClick={props.onEyeClick} className="input__eye__icon">
        {props.icon}
      </div>
      {props?.error ? <p className="input__error">{props.error}</p> : null}
    </div>
  );
};

export default InputField;
