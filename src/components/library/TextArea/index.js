import "./style.css";

const TextArea = (props) => {
  return (
    <div>
      {props?.label ? <label>{props.label}</label> : null}
      <textarea
        value={props.value}
        className="text__area__styling"
        placeholder={props.placeholder}
        onChange={props.onChange}
        style={props.style}
        name={props.name}
      />
    </div>
  );
};

export default TextArea;
