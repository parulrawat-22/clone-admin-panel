import { useApi } from "../../base/Context/apiProvider";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import "./style.css";
import { NetworkConfiguration } from "../../network/NetworkConfiguration";
import { useEffect, useState } from "react";
import { AiFillEdit, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ImagePopUpModal from "../../components/ImagePopUpModal";
import Pagination from "../../components/Pagination";
import moment from "moment";
import Lottie from "react-lottie";
import noData from "../../base/Animation/No Data Found.json";
import { useLoader } from "../../base/Context/loaderProvider";
import SearchInput from "../../components/SearchInput";
import { FiSearch } from "react-icons/fi";

const Snapshots = () => {
  const navigate = useNavigate();
  const apiProvider = useApi();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [count, setCount] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [snapshot, setSnapshot] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const [img, setImg] = useState("");
  const [value, setValue] = useState("");
  const loader = useLoader();

  useEffect(() => {
    fetchSnapshots();
  }, [page, perPage, apiProvider?.apiUrl, value]);

  const fetchSnapshots = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.SNAPSHOTS,
      "POST",
      {
        page,
        perPage,
        key: value,
      }
    )
      .then((res) => {
        loader.showLoader(false);
        console.log(res);
        setSnapshot(res?.allSnapshots);
        setCount(res?.count);
        setTotalPages(res?.totalPages);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };

  const handleEyeClick = (img) => {
    setShowImage(true);
    setImg(img);
  };

  const handleEyeClickClose = () => {
    setShowImage(false);
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
      <div className="snapshots__container">
        <table className="snapshots__table">
          <thead>
            <th className="snapshots__header">S.No.</th>
            <th className="snapshots__header">user Name</th>
            <th className="snapshots__header">Host Name</th>
            <th className="snapshots__header">Snapshots</th>
            <th className="snapshots__header">Created At</th>
          </thead>
          <tbody>
            {snapshot.map((data, index) => {
              return (
                <tr>
                  <td className="snapshots__data">{index + 1}</td>
                  <td className="snapshots__data">
                    {data?.userId?.name}
                    <AiFillEdit
                      onClick={() => {
                        navigate(`/usermanagement/${data?.userId?._id}`);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                  <td className="snapshots__data">
                    {data?.hostId?.name}
                    <AiFillEdit
                      onClick={() => {
                        navigate(`/hostmanagement/${data?.hostId?._id}`);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </td>

                  <td className="snapshots__data">
                    <AiFillEye
                      style={{ fontSize: "18px", cursor: "pointer" }}
                      onClick={() => handleEyeClick(data?.snapshot)}
                    />{" "}
                    {data?.name}
                  </td>
                  <td className="snapshots__data">
                    {moment(data?.createdAt).format("DD/MM/YYYY , LT")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {snapshot && snapshot.length > 0 ? (
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

        <ImagePopUpModal
          open={showImage}
          handleClose={handleEyeClickClose}
          img={img}
        />
      </div>
    </>
  );
};

export default Snapshots;
