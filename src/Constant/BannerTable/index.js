import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../baseUrl";
import { AiFillEye } from "react-icons/ai";

const BannerTable = () => {
  const [showBannerData, setShowBannerData] = useState([]);

  useEffect(() => {
    fetchBannerList();
  }, []);

  const fetchBannerList = () => {
    axios
      .get(baseUrl + "banner/getAllBanner", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log("Banner List", res.data.result);
        setShowBannerData(res.data.result);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div>
      <table className="banner__list__table">
        <thead>
          <tr>
            <th>Banner Name</th>
            <th>Banner Image</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody className="banner__list__body">
          {showBannerData?.map((banner, index) => {
            console.log(banner);
            return (
              <tr className="banner__list__row" key={index}>
                <td className="banner__list__data">{banner.name}</td>
                <td className="banner__list__data">
                  <AiFillEye className="banner__list__eye__icon" />
                </td>
                <td className="banner__list__actions banner__list__data">
                  <AiFillEdit className="banner__list__edit__action" />
                  <AiTwotoneDelete className="banner__list__delete__action" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BannerTable;
