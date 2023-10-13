import "./style.css";

const InputField = (props) => {
  return (
    <div
      style={{
        position: "relative",
        height: "35px",
      }}
    >
      <input
        className="input__styling"
        placeholder={props.placeholder}
        type={props.type}
        onChange={props.onChange}
        value={props.value}
      ></input>
      <div
        onClick={props.onEyeClick}
        style={{
          position: "absolute",
          right: 7,
          bottom: 5,
          cursor: "pointer",
        }}
      >
        {props.icon}
      </div>
      {props?.error ? <p className="input__error">{props.error}</p> : null}
    </div>
  );
};

export default InputField;
