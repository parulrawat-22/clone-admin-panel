import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API_URL, CATCHWOO_URL } from "../../network/NetworkConfiguration";

export const APIContext = createContext();

const APIProvider = ({ children }) => {
  const [apiUrl, setApiUrl] = useState(API_URL);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams && searchParams.get("appType") === "catchwoo") {
      setApiUrl(CATCHWOO_URL);
    } else {
      setApiUrl(API_URL);
    }
  }, [searchParams]);
  return (
    <APIContext.Provider value={{ apiUrl }}>{children}</APIContext.Provider>
  );
};

export const useApi = () => useContext(APIContext);
export default APIProvider;
