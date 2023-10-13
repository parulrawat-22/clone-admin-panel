import "./style.css";

const SeachInput = (props) => {
  return (
    <div className="search__input__container">
      <input
        className="search__input"
        placeholder={props.placeholder}
        type={props.type}
      ></input>
      <div className="search__icon">{props.icon}</div>
    </div>
  );
};

export default SeachInput;
