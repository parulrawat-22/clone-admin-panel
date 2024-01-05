import "./style.css";

const SearchInput = (props) => {
  return (
    // <div className="search__input__bg">
    <div className="search__input__container">
      <div className="search__icon">{props.icon}</div>
      <input
        className="search__input"
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        type={props.type}
      ></input>
    </div>
    // </div>
  );
};

export default SearchInput;
