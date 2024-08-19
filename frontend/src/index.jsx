import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import { browserRoutes } from "./constants/Routing.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Flowbite } from "flowbite-react";
import theme from "./assets/FlowbiteTheme.jsx";

createRoot(document.getElementById("root")).render(
    <div className="font-bold text-center text-3xl">Test Content</div>
);

// <StrictMode>
//     {/* <Flowbite theme={{ theme: theme }}>
//         <RouterProvider
//             router={createBrowserRouter(browserRoutes)}
//         ></RouterProvider>
//     </Flowbite> */}
// </StrictMode>