import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { router } from "./routes/router";

function App() {
    return (
        <div className="w-full min-h-screen bg-white">
            <ToastContainer /> {/* ToastContainer should be placed here */}
            <RouterProvider router={router} />
        </div>
    );
}

export default App;

