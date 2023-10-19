import "./style.css";

const Cards = (props) => {
  return (
    <div className="main__card" onClick={props.onClick}>
      <h3 className="card__heading">{props.name}</h3>
      <div className="card__icon__number">
        <i className="card__icon">{props.icon}</i>
        <p className="card__number">{props.number}</p>
      </div>
      <div className="light-grey">
        <div className="container w3-green" style={{ width: "50%" }}>
          50%
        </div>
      </div>
    </div>
  );
};

export default Cards;
