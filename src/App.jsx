import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { router } from "./routes/router";

function App() {
    return (
        <div className="w-full min-h-screen bg-white">
           <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
            <RouterProvider router={router} />
        </div>
    );
}

export default App;