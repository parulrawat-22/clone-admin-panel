import "./style.css";

const AlertPopUp = (props) => {
  return (
    <div
      className="main_pop_container"
      style={{ display: props.show ? "flex" : "none" }}
    >
      <div className="content">
        <div className="para_styling">
          <h3>{props.header}</h3>
          <p>{props.description}</p>
        </div>
        <div className="button">
          <p onClick={props.onSubmitClick}>{props.submitText}</p>
          <p onClick={props.onCancelClick}>{props.cancelText}</p>
        </div>
      </div>
    </div>
  );
};

export default AlertPopUp;
