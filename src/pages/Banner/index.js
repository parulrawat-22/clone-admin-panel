import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Button from "../../components/library/Button";
import BannerTable from "../../Constant/BannerTable";
import FormAlertPopUp from "../../components/FormAlertPopUp";
import "./style.css";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../network/NetworkConfiguration";
import BannerForm from "../../components/formComponents/BannerForm";
import AlertPopUp from "../../components/AlertPopUp";
import { errorToast, successToast } from "../../utils/toast";
import SearchInput from "../../components/SearchInput";
import { FiSearch } from "react-icons/fi";
import Pagination from "../../components/Pagination";
import Lottie from "react-lottie";
import { useLoader } from "../../base/Context/loaderProvider";
import noData from "../../base/Animation/No Data Found.json";
import { useApi } from "../../base/Context/apiProvider";

const Banner = () => {
  const [showBannerForm, setShowBannerForm] = useState(false);
  const [showBannerData, setShowBannerData] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState();
  const [bannerId, setBannerId] = useState("");
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");

  const loader = useLoader("");
  const apiProvider = useApi();

  const handleShowDeleteAlert = () => {
    setShowDeleteAlert(true);
  };

  const handleShowDeleteAlerClose = () => {
    setShowDeleteAlert(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteAlert(false);
  };

  useEffect(() => {
    fetchBannerList();
  }, [value, page, perPage, apiProvider?.apiUrl]);

  const fetchBannerList = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.GETBANNER,
      "POST",
      {
        key: value,
        page,
        perPage,
      }
    )
      .then((res) => {
        loader.showLoader(false);
        setShowBannerData(res?.result);
        setTotalCount(res?.totalCount);
        setTotalPages(res?.totalPages);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log("err", err);
      });
  };

  const handleAddBanner = () => {
    setShowBannerForm(true);
  };

  const handleAddBannerClose = () => {
    setShowBannerForm(false);
  };

  const onSubmit = () => {
    setShowBannerForm(false);
    fetchBannerList();
  };

  const handleDelete = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.DELETEBANNER + `/${bannerId}`,
      "DELETE"
    )
      .then((res) => {
        console.log(res);
        setShowDeleteAlert(false);
        successToast(res.message);
        fetchBannerList();
      })
      .catch((err) => {
        console.log(err, "err==========");
        errorToast(err.message);
      });
  };

  const handleText = (e) => {
    setValue(e.target.value);
  };

  const searchIcon = () => {
    return <FiSearch />;
  };
  console.log(value);

  return (
    <Layout>
      <div className="banner__search__btn">
        <SearchInput
          onChange={handleText}
          placeholder="Search"
          icon={searchIcon()}
          value={value}
        />
      </div>
      <div className="add__banner__styling">
        <Button text="Add Banner" onClick={handleAddBanner} />
      </div>

      <BannerTable
        showBannerData={showBannerData}
        setBannerId={setBannerId}
        setShowDeleteAlert={setShowDeleteAlert}
        fetchBannerList={fetchBannerList}
        value={value}
        page={page}
        perPage={perPage}
      />
      <FormAlertPopUp
        open={showBannerForm}
        onRequestClose={handleAddBannerClose}
      >
        <BannerForm
          onSubmit={onSubmit}
          handleClose={handleAddBannerClose}
          fetchBannerList={fetchBannerList}
        />
      </FormAlertPopUp>

      {showBannerData && showBannerData.length > 0 ? (
        <Pagination
          page={page}
          setPage={setPage}
          perPage={perPage}
          setPerPage={setPerPage}
          totalCount={totalCount}
          totalPages={totalPages}
          options={[5, 10, 15, 20]}
        />
      ) : (
        !loader.loaderPopup && (
          <div className="host__no__data__found__icon">
            <Lottie
              options={{ animationData: noData, loop: true }}
              style={{ width: "20rem", height: "20rem" }}
            />
            <p className="no__data__found"> No Data Found</p>
          </div>
        )
      )}

      <AlertPopUp
        open={showDeleteAlert}
        handleOpen={handleShowDeleteAlert}
        handleClose={handleShowDeleteAlerClose}
        header="Delete Alert"
        description="Are you sure you want to delete this banner?"
        submitText="Yes"
        cancelText="No"
        onCancelClick={handleCancelDelete}
        onSubmitClick={handleDelete}
      />
    </Layout>
  );
};

export default Banner;
