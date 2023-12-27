import { AiFillEdit, AiFillEye } from "react-icons/ai";
import "./style.css";
import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../network/NetworkConfiguration";
import moment from "moment";
import ImagePopUpModal from "../../components/ImagePopUpModal";
import FormAlertPopUp from "../../components/FormAlertPopUp";
import FlowerForm from "../../components/formComponents/FlowerForm";

const Flower = () => {
  const [flowerData, setFlowerData] = useState();
  const [img, setImg] = useState("");
  const [showFlowerImage, setShowFlowerImage] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    fetchFlowerData();
  }, []);

  const fetchFlowerData = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.GETFLOWER, "GET")
      .then((res) => {
        setFlowerData(res?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFlower = (id) => {
    setShowEdit(true);
    setId(id);
  };

  const handleFlowerClose = () => {
    setShowEdit(false);
  };

  const handleFlowerImage = (img) => {
    setImg(img);
    setShowFlowerImage(true);
  };

  const handleFlowerImageClose = () => {
    setShowFlowerImage(false);
  };

  const onSubmit = () => {
    setShowEdit(false);
    fetchFlowerData();
  };

  return (
    <div className="flower__container">
      <table className="flower__table">
        <thead>
          <th className="flower__header">Flower Name</th>
          <th className="flower__header">Flower Price</th>
          <th className="flower__header">Flower Image</th>
          <th className="flower__header">Created At</th>
          <th className="flower__header">Updated At</th>
          <th className="flower__header">Action</th>
        </thead>

        <tbody>
          <td className="flower__data">{flowerData?.name}</td>
          <td className="flower__data">{flowerData?.price}</td>
          <td className="flower__data">
            <AiFillEye
              className="flower__eye__icon"
              onClick={() => handleFlowerImage(flowerData?.giftUrl)}
            />
          </td>
          <td className="flower__data">
            {moment(flowerData?.createdAt).format("DD/MM/YYYY , LT")}
          </td>
          <td className="flower__data">
            {moment(flowerData?.updatedAt).format("DD/MM/YYYY , LT")}
          </td>

          <td className="flower__data">
            <AiFillEdit
              className="flower__edit__icon"
              onClick={() => handleFlower(flowerData?._id)}
            />
          </td>
        </tbody>
      </table>
      <ImagePopUpModal
        open={showFlowerImage}
        handleClose={handleFlowerImageClose}
        img={img}
      />

      <FormAlertPopUp
        open={showEdit}
        handleOpen={handleFlower}
        onRequestClose={handleFlowerClose}
      >
        <FlowerForm id={id} onSubmit={onSubmit} flowerData={flowerData} />
      </FormAlertPopUp>
    </div>
  );
};

export default Flower;
