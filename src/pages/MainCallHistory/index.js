import { useState } from "react";
// import Pagination from "../../components/Pagination";
import SearchInput from "../../components/SearchInput";
import Dropdown from "../../components/library/Dropdown";
import "./style.css";
import { FiSearch } from "react-icons/fi";
import AllCallHistoryTable from "../../components/Table/AllCallHistoryTable";

const MainCallHistory = () => {
  const [getSetValue, setGetSetValue] = useState();

  const onChangeDropdown = (e) => {
    setGetSetValue(e.target.value);
    console.log("onChangeDropdown: ", e.target.value);
  };

  const searchIcon = () => {
    return <FiSearch />;
  };
  return (
    <div>
      <div className="top__growing__dropdown">
        <Dropdown
          onChange={onChangeDropdown}
          options={[
            { name: "Dropped Calls", value: "Dropped Calls" },
            { name: "Small Calls", value: "Small Calls" },
            { name: "Long Calls", value: "Long Calls" },
            { name: "Most Loved", value: "Most Loved" },
          ]}
        ></Dropdown>
      </div>

      <AllCallHistoryTable />

      {/* <TopTalentTable
        isHost={isHost}
        tableData={tableData}
        page={page}
        perPage={perPage}
      /> */}
      <div className="banner__search__btn">
        <SearchInput placeholder="Search" icon={searchIcon()} />
      </div>

      {/* {tableData && tableData.length > 0 ? (
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
            <p className="no__data__found">No Data Found</p>
          </div>
        )
      )} */}
    </div>
  );
};

export default MainCallHistory;
