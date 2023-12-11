import "./style.css";

const SecondaryButton = ({ text, style, onClick }) => {
  return (
    <div onClick={onClick} className="secondary__btn__container" style={style}>
      <p className="secondary__btn__text">{text}</p>
    </div>
  );
};

export default SecondaryButton;
