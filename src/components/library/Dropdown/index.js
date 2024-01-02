import "./style.css";

const Dropdown = (props) => {
  return (
    <div style={props.dropdownStyle}>
      {props?.label ? <label style={props.style}>{props.label}</label> : null}
      <select
        className={`dropdown__input ${props.className}`}
        style={props.style}
        onChange={props.onChange}
        onClick={props.onClick}
      >
        {props.options.map((option) => {
          return (
            <option className="dropdown__content" value={option?.value}>
              {option?.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Dropdown;
