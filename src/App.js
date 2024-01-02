import { BrowserRouter } from "react-router-dom";
import "./App.css";
import APIProvider from "./base/Context/apiProvider";
import { LoaderProvider } from "./base/Context/loaderProvider";
import ModalProvider from "./base/Context/modalProvider";
import Router from "./base/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarProvider from "./base/Context/sidebarProvider";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <ToastContainer />
      <BrowserRouter>
        <LoaderProvider>
          {/* <APIProvider> */}
          <ModalProvider>
            <SidebarProvider>
              <APIProvider>
                <Router></Router>
              </APIProvider>
            </SidebarProvider>
          </ModalProvider>
          {/* </APIProvider> */}
        </LoaderProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
