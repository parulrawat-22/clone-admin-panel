import "./App.css";
import { LoaderProvider } from "./base/Context/loaderProvider";
import ModalProvider from "./base/Context/modalProvider";
import Router from "./base/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <LoaderProvider>
        <ModalProvider>
          <Router />

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
        </ModalProvider>
      </LoaderProvider>
    </div>
  );
}

export default App;
