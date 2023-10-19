import Layout from "../../components/Layout";
import IconContainer from "../../components/pages/userManagement/IconComponent";
import SuspendUser from "../../components/pages/userManagement/SuspendUser";
import UserDetails from "../../components/pages/userManagement/UserDetails";
import WarnUser from "../../components/pages/userManagement/WarnUser";
import "./style.css";

const UserManagement = () => {
  return (
    <Layout>
      <div className="user__management__container">
        <div className="user__management__profile_details">
          <div className="user__management__profile">
            <img className="user__management__profile_pic" src="" alt="" />
          </div>
          <UserDetails />
        </div>

        <div className="user__management__icon_suspend_warn_user">
          <IconContainer />
          <SuspendUser />
          <WarnUser />
        </div>
      </div>
    </Layout>
  );
};

export default UserManagement;
