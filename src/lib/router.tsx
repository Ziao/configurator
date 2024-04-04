import { createBrowserRouter } from "react-router-dom";
import { Viewer } from "../pages/viewer.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Viewer />,
    },
    {
        // path: "/projects/:id",
        // element: <Project />,
    },
    // {
    //     path: "/designer",
    //     element: <Designer />,
    // },
    // {
    //     path: "/viewer",
    //     element: <Viewer />,
    // },
]);
