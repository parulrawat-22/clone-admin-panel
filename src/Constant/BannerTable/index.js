import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../baseUrl";

const BannerTable = () => {
  const [showBannerData, setShowBannerData] = useState([]);

  useEffect(() => {
    fetchBannerList();
  }, []);

  const fetchBannerList = () => {
    axios
      .get(baseUrl + "banner/getAllBanner")
      .then((res) => {
        console.log("Banner List", res);
        setShowBannerData(res.result);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div>
      {showBannerData?.length > 0 &&
        showBannerData.map((index, data) => {
          return (
            <table style={{ border: "1px solid black" }}>
              <thead>
                <tr>
                  <th>Banner Name</th>
                  <th>Banner Image</th>
                  <th>action</th>
                </tr>
                <tbody>
                  <td>{data.result.name}</td>
                  <td>{data.result.imageUrl}</td>
                </tbody>
              </thead>
            </table>
          );
        })}
    </div>
  );
};

export default BannerTable;
