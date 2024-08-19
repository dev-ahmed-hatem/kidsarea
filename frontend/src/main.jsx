import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./css/index.css";
// import { browserRoutes } from "./constants/Routing.jsx";
// import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { Flowbite } from "flowbite-react";
// import theme from "./assets/FlowbiteTheme.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);

// ReactDOM.createRoot(document.getElementById("root")).render(
// <React.StrictMode>
// <Flowbite theme={{ theme: theme }}>
// <div className="font-bold text-2xl text-center">Main Content</div>
{
    /* <RouterProvider */
}
{
    /* // router={createBrowserRouter(browserRoutes)} */
}
{
    /* ></RouterProvider> */
}
// </Flowbite>
// </React.StrictMode>
// );
