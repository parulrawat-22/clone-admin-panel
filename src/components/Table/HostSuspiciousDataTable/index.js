import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import "./style.css";
import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../../base/Context/apiProvider";
import Pagination from "../../Pagination";
import Lottie from "react-lottie";
import noData from "../../../base/Animation/No Data Found.json";
import { useLoader } from "../../../base/Context/loaderProvider";
import SearchInput from "../../SearchInput";
import { FiSearch } from "react-icons/fi";

const HostSuspiciousData = () => {
  const apiProvider = useApi();
  const [hostSuspiciousList, setHostSuspiciousList] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [count, setCount] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [value, setValue] = useState("");
  const loader = useLoader();

  useEffect(() => {
    fetchSuspiciousData();
  }, [apiProvider?.apiUrl, page, perPage, value]);
  const navigate = useNavigate();

  const fetchSuspiciousData = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.SUSPICIOUSDATA,
      "POST",
      {
        type: "host",
        page,
        perPage,
        key: value,
      }
    )
      .then((res) => {
        loader.showLoader(false);

        console.log(res, "!!!!!!!!!!!!!!!!!!");
        setHostSuspiciousList(res?.hosts);
        setCount(res?.count);
        setTotalPages(res?.totalPages);
      })
      .catch((err) => {
        console.log(err);
        loader.showLoader(false);
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
            {hostSuspiciousList &&
              hostSuspiciousList.length > 0 &&
              hostSuspiciousList.map((data, index) => {
                return (
                  <tr>
                    <td className="suspicious__data__data">{index + 1}</td>
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
                          navigate(`/hostmanagement/${data._id}`);
                        }}
                        className="suspicious__edit__icon"
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {hostSuspiciousList && hostSuspiciousList.length > 0 ? (
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

export default HostSuspiciousData;
