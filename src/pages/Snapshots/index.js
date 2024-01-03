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

const Snapshots = () => {
  const navigate = useNavigate();
  const apiProvider = useApi();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [snapshot, setSnapshot] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const [img, setImg] = useState("");

  useEffect(() => {
    fetchSnapshots();
  }, [page, perPage, apiProvider?.apiUrl]);

  const fetchSnapshots = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.SNAPSHOTS,
      "POST",
      {
        page,
        perPage,
      }
    )
      .then((res) => {
        console.log(res);
        setSnapshot(res?.allSnapshots);
        setTotalCount(res?.totalCount);
        setTotalPages(res?.totalPages);
      })
      .catch((err) => {
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
  return (
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

      <Pagination
        page={page}
        setPage={setPage}
        perPage={perPage}
        setPerPage={setPerPage}
        totalCount={totalCount}
        totalPages={totalPages}
        options={[5, 10, 15, 20]}
      />

      <ImagePopUpModal
        open={showImage}
        handleClose={handleEyeClickClose}
        img={img}
      />
    </div>
  );
};

export default Snapshots;
