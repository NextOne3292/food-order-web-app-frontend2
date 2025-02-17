
import { RouterProvider } from "react-router-dom";

import { router } from "./router/Router";

import { toast } from "react-hot-toast";



function App() {
    return (
        <>
            <RouterProvider router={router} />
            <toast />
        </>
    );
}

export default App;
