import "./style.css";

const SearchInput = (props) => {
  return (
    <div className="search__input__container">
      <input
        className="search__input"
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        type={props.type}
      ></input>
      <div className="search__icon">{props.icon}</div>
    </div>
  );
};

export default SearchInput;
