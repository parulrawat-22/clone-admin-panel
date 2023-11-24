import "./style.css";

const Dropdown = (props) => {
  return (
    <div>
      {props?.label ? <label style={props.style}>{props.label}</label> : null}
      <select
        className={`dropdown__input ${props.className}`}
        style={props.style}
        onChange={props.onChange}
        onClick={props.onClick}
      >
        <option value={""}>--Select--</option>;
        {props.options.map((option) => {
          return <option value={option?.value}>{option?.name}</option>;
        })}
      </select>
    </div>
  );
};

export default Dropdown;
