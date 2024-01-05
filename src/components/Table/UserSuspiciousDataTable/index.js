import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../../base/Context/apiProvider";
import Pagination from "../../Pagination";
import noData from "../../../base/Animation/No Data Found.json";
import Lottie from "react-lottie";
import { useLoader } from "../../../base/Context/loaderProvider";
import SearchInput from "../../SearchInput";
import { FiSearch } from "react-icons/fi";

const UserSuspiciousData = () => {
  const apiProvider = useApi();
  const [suspiciousList, setSuspiciousList] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");
  const [count, setCount] = useState("");
  const [value, setValue] = useState("");
  let loader = useLoader();
  let navigate = useNavigate();

  useEffect(() => {
    fetchSuspiciousData();
  }, [apiProvider?.apiUrl, page, perPage]);
  const fetchSuspiciousData = () => {
    loader.showLoader(true);

    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.SUSPICIOUSDATA,
      "POST",
      {
        type: "user",
        page,
        perPage,
        key: value,
      }
    )
      .then((res) => {
        loader.showLoader(false);

        console.log(res, "!!!!!!!!!!!!!!!!!!");
        setSuspiciousList(res?.users);
        setCount(res?.count);
        setTotalPages(res?.totalPages);
      })
      .catch((err) => {
        loader.showLoader(false);

        console.log(err);
      });
  };

  const handleText = (e) => {
    setValue(e.target.value);
  };

  const searchIcon = () => {
    return <FiSearch />;
  };
  return (
    <>
      <SearchInput
        value={value}
        onChange={handleText}
        placeholder="Search"
        icon={searchIcon()}
      />
      <div className="suspicious__data__container">
        <table className="suspicious__data__table">
          <thead>
            <th className="suspicious__data__header">S.No</th>
            <th className="suspicious__data__header">Name</th>
            <th className="suspicious__data__header">Gender</th>
            <th className="suspicious__data__header">Ai Gender</th>
            <th className="suspicious__data__header">Age</th>
            <th className="suspicious__data__header">Ai Age</th>
            <th className="suspicious__data__header">Explicit</th>
            <th className="suspicious__data__header">Reason</th>
            <th className="suspicious__data__header">Action</th>
          </thead>
          <tbody>
            {suspiciousList &&
              suspiciousList.length > 0 &&
              suspiciousList.map((data, index) => {
                return (
                  <tr>
                    <td className="suspicious__data__data">
                      {(page - 1) * perPage + index + 1}
                    </td>
                    <td className="suspicious__data__data">{data?.name}</td>
                    <td className="suspicious__data__data">{data?.gender}</td>
                    <td className="suspicious__data__data">
                      {data?.attributes[0]?.gender.Value}
                    </td>
                    <td className="suspicious__data__data">{data?.age}</td>
                    <td className="suspicious__data__data">
                      {data?.attributes[0]?.ageRange?.Low}-
                      {data?.attributes[0]?.ageRange?.High}
                    </td>
                    <td className="suspicious__data__data">
                      {data?.isExplicit ? "TRUE" : "FALSE"}
                    </td>
                    <td className="suspicious__data__data">{data?.reason}</td>
                    <td className="suspicious__data__data">
                      <AiFillEdit
                        onClick={() => {
                          navigate(`/usermanagement/${data._id}`);
                        }}
                        className="suspicious__edit__icon"
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {suspiciousList && suspiciousList.length > 0 ? (
          <Pagination
            page={page}
            setPage={setPage}
            perPage={perPage}
            setPerPage={setPerPage}
            totalCount={count}
            totalPages={totalPages}
            options={[5, 10, 15, 20]}
          />
        ) : (
          <div className="host__no__data__found__icon">
            <Lottie
              options={{ animationData: noData, loop: true }}
              style={{ width: "20rem", height: "20rem" }}
            />
            <p className="no__data__found">No Data Found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default UserSuspiciousData;
