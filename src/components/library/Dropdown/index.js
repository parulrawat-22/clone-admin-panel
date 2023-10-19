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
        <option value={props.value}>{props.option1}</option>
        <option value={props.value}>{props.option2}</option>
        <option value={props.value}>{props.option3}</option>
        <option value={props.value}>{props.option4}</option>
        <option value={props.value}>{props.option5}</option>
      </select>
    </div>
  );
};

export default Dropdown;
