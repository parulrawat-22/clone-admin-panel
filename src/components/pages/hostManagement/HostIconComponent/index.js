import "./style.css";
import { useNavigate } from "react-router-dom";
import { HostManagementData } from "../../../../utils/hostManagementData";

const HostIconContainer = ({ id }) => {
  let navigate = useNavigate();
  return (
    <div className="user__management__icon__container">
      <div className="user__management__icon__row">
        {HostManagementData.map((data) => {
          return (
            <div
              className="icon__container"
              onClick={() => {
                navigate(`/hostmanagement/${data?.name}/${id}`);
              }}
            >
              <img className="icon" src={data?.icon} alt="" />
              <p style={{ textTransform: "capitalize" }}>{data?.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HostIconContainer;
