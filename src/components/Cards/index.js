import "./style.css";

const Cards = (props) => {
  return (
    <div className="main__card">
      <h3>{props.name}</h3>
      <i>{props.icon}</i>
      <p>{props.number}</p>
    </div>
  );
};

export default Cards;
