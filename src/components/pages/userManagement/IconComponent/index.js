import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import { UserManagementData } from "../../../../utils/UserManagementData";

const IconContainer = ({ id }) => {
  let navigate = useNavigate();
  let params = useParams();

  console.log(params, "1234567");

  return (
    <div className="user__management__icon__container">
      <div className="user__management__icon__row">
        {UserManagementData.map((data) => {
          return (
            <div
              className="icon__container"
              onClick={() => {
                navigate(
                  `/usermanagement/${data?.name}/${id}${
                    sessionStorage.getItem("selectedType") === "catchwoo"
                      ? "?appType=catchwoo"
                      : ""
                  }`
                );
              }}
            >
              <img className="icon" src={data?.icon} alt="" />
              <p className="icon__name">{data?.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IconContainer;
