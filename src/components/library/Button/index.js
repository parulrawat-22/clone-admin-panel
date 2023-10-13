import "./style.css";

const Button = (props) => {
  return (
    <div className="button__style">
      <p className="button__text" onClick={props.onClick}>
        {" "}
        {props.text}
      </p>
    </div>
  );
};

export default Button;
