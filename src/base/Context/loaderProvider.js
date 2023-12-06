import { createContext, useContext, useRef, useState } from "react";
import AdminLoader from "../../components/library/AdminLoader";

const Loader = createContext();

export const LoaderProvider = ({ children }) => {
  const loaderRef = useRef();
  const [loaderPopup, setLoaderPopup] = useState(false);

  const showLoader = (loader) => {
    setLoaderPopup(loader);
  };

  return (
    <Loader.Provider value={{ showLoader }}>
      {children}
      <AdminLoader showLoader={loaderPopup} />
    </Loader.Provider>
  );
};

export const useLoader = () => useContext(Loader);
export default LoaderProvider;
