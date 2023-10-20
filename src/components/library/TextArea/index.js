import "./style.css";

const TextArea = (props) => {
  return (
    <div>
      {props?.label ? <label>{props.label}</label> : null}
      <textarea
        className="text__area__styling"
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default TextArea;
