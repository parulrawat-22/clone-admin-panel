import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubAdminTable from "../../../components/Table/SubAdminTable";
import "./style.css";



export default function SubAdminList() {
 
  // const [subAdmins, setSubAdmins] = useState([]);

  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  // const message = useMessage();
  // const app = useApp();

  // const handleAddSubAdmin = () => {

  //   console.log('addSubAdmin')

  //   navigate("/addSubAdmin");
  // };



  
  return (
    <div>
      <div className="sub_admin_header_btns">

      </div>
      <div>
        {/* <div className="category_table_box"> */}
         
            <SubAdminTable


              // subAdmins={subAdmins}
              // page={page}
              // perPage={perPage}
              // handleSubAdmins={handleSubAdmins}
              // setPage={setPage}
              // total={totalCount}
            />
          
          
            
        

        </div>
      </div>
    // </div>
  );
}
