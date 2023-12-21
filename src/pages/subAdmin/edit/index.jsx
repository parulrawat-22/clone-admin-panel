import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "./style.css";
import sidebarData from "../../../Constant/DataComponent";
import Button from "../../../components/library/Button";
import InputField from "../../../components/library/InputField";
import ResponsibilitiesDropdown from "../../../components/library/ResponsibilitiesDropdown";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import { API_URL, NetworkConfiguration } from "../../../network/NetworkConfiguration";


export default function EditSubAdmin() {
  const [options, setOptions] = useState([]);
  const [responsibilities, setResponsibilities] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [passInput, setPassInput] = useState(true);
  const [passInputTwo, setPassInputTwo] = useState(true);

  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleSubAdmin = () => {
    fetchDataFromAPI(API_URL+ NetworkConfiguration.GETONESUBADMIN + `/${searchParams.get('id')}`, "GET" )
      .then((res) => {

        console.log('res',res)
        setResponsibilities(res.result.responsibility);
      })
      .catch((err) => {
        console.log('err',err)
      });
  };

  useEffect(() => {
    handleSubAdmin();
  }, [searchParams]);

  //set side bar menu options for sub admin responsibilities
  useEffect(() => {
    setOptions(
      sidebarData.map((item) => ({ name: item.label, accessType: [] }))
    );
  }, [sidebarData]);


  console.log('options',options)

  const handleAccess = (name, accessType) => {
    let updatedData = [];
    updatedData = responsibilities?.map((item, index) => {
      if (item?.name === name) {
        return {
          name: item.name,
          accessType: item?.accessType
            ? item?.accessType.includes(accessType)
              ? item?.accessType.filter((accessVal) => accessVal != accessType)
              : [...item?.accessType, accessType]
            : [accessType],
        };
      } else {
        return item;
      }
    });
    setResponsibilities(updatedData);
  };

  const handleRemove = (e) => {
    let newArray = responsibilities.filter((item) => {
      return item.name !== e.name;
    });

    setResponsibilities(newArray);
  };

  //handle Edit
  const handleEdit = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.EDITSUBADMIN , "PUT" , {
      id: searchParams.get('id'),
      responsibility: responsibilities,
    }).then((res)=>{
      navigate("/subAdmin");
    }).catch((err)=>{
      console.log(err);
    })


    // const data = {
    //   id: searchParams.get("id"),
    // };
    // app.showLoader(true, "wait for a minute");
    // SubAdminApiService.editSubAdmin(data)
    //   .then((res) => {
    //     app.showLoader(false, "wait over");
    //     message.showToast(res.message, ToastTypes.SUCCESS);
    //     navigate("/subAdminList");
    //   })
    //   .catch((err) => {
    //     app.showLoader(false, "wait over");
    //     message.showToast(err.response.data.message, ToastTypes.ERROR);
    //     CheckAuthentication(err.response.status, navigate, message);
    //   });




  };

  //password edit

  const handlePassword = (e) => {
    setData({ ...data, password: e.target.value });
    setError({ ...error, password: "" });
  };
  const handleConfirmPassword = (e) => {
    setData({ ...data, confirmPassword: e.target.value });
    setError({ ...error, confirmPassword: "" });
  };

  const handleEye = () => {
    if (passInput) {
      return <FaEyeSlash />;
    } else {
      return <FaEye />;
    }
  };
  const handleType = () => {
    setPassInput(!passInput);
  };

  const handleEyeTwo = () => {
    if (passInputTwo) {
      return <FaEyeSlash />;
    } else {
      return <FaEye />;
    }
  };
  const handleTypeTwo = () => {
    setPassInputTwo(!passInputTwo);
  };

  const validate = () => {
    let result = true;
    if (!data.password) {
      setError({ ...error, password: "Invalid Password" });
      result = false;
    } else if (!data.confirmPassword) {
      setError({ ...error, confirmPassword: "Invalid Password" });
      result = false;
    }
    return result;
  };

  const handleEditPassword = () => {
    // if (validate()) {
    //   const dataPayload = {
    //     id: searchParams.get("id"),
    //     password: data.password,
    //     confirmPassword: data.confirmPassword,
    //   };

    //   app.showLoader(true, "wait for a minute");
    //   SubAdminApiService.editSubAdminPassword(dataPayload)
    //     .then((res) => {
    //       app.showLoader(false, "wait over");
    //       message.showToast(res.message, ToastTypes.SUCCESS);
    //       navigate("/subAdminList");
    //     })
    //     .catch((err) => {
    //       app.showLoader(false, "wait over");
    //       message.showToast(err.response.data.message, ToastTypes.ERROR);
    //       CheckAuthentication(err.response.status, navigate, message);
    //     });
    // }
  };

  return (
    <div className="edit_subadmin_bg">
      <div className="edit_subadmin_col">
        <ResponsibilitiesDropdown
          options={options}
          responsibilities={responsibilities}
          setResponsibilities={setResponsibilities}
          error={null}
        />

        {responsibilities?.length ? (
          <>
            <label className="label_style" style={{ display: "block" }}>
              Allowance
            </label>
            <div className="assign_responsibilities_box">
              {responsibilities?.map((item, index) => {
                return (
                  <AllowedItem
                    item={item}
                    key={index}
                    handleAccess={handleAccess}
                    handleRemove={handleRemove}
                  />
                );
              })}
            </div>
          </>
        ) : null}

        <Button
          onClick={handleEdit}
          text="Edit Sub Admin"
          style={{
            marginTop: "20px",
           
            border: "none",
          }}
          className="web_button"
        />
      </div>

      <div className="edit_subadmin_col">
        <InputField
          label="Password"
          placeholder=""
          type={passInput ? "password" : "text"}
          onChange={handlePassword}
          error={error.password}
          value={data.password}
          eye={handleEye()}
          handleType={handleType}
        />
        <InputField
          label="Confirm Password"
          placeholder=""
          type={passInputTwo ? "password" : "text"}
          onChange={handleConfirmPassword}
          error={error.confirmPassword}
          value={data.confirmPassword}
          eye={handleEyeTwo()}
          handleType={handleTypeTwo}
        />

        <Button
          onClickEvent={handleEditPassword}
          text="Edit Password"
          style={{
            marginTop: "20px",
            
            border: "none",
          }}
          className="web_button"
          type="button"
        />
      </div>
    </div>
  );
}

export const AllowedItem = ({ item, key, handleAccess, handleRemove }) => {
  const handleAssignAccess = (accessType) => {
    handleAccess(item?.name, accessType);
  };

  return (
    <div className="Allowance_div" key={key}>
      {item?.name}
      <div className="allowance_edit_delete_btns">
        <span
          onClick={() => handleAssignAccess("view")}
          className={item.accessType.includes("view") ? "active_allow_btn" : null}
        >
          View
        </span>
        <span
          onClick={() => handleAssignAccess("edit")}
          className={item.accessType.includes("edit") ? "active_allow_btn" : null}
        >
          Edit
        </span>
        <button onClick={() => handleRemove(item)} className="remove_res_btn">
          <IoClose size={18} />
        </button>
      </div>
    </div>
  );
};
