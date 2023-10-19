import "./style.css";

const Button = (props) => {
  return (
    <div className={`button__style ${props.className}`} style={props.style}>
      <p
        className={`button__text ${props.className}`}
        style={props.style}
        onClick={props.onClick}
      >
        {props.text}
      </p>
    </div>
  );
};

export default Button;
