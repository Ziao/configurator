import { createBrowserRouter } from "react-router-dom";
import { Designer } from "../pages/designer.tsx";
import { Home } from "../pages/home.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/designer",
        element: <Designer />,
    },
]);
