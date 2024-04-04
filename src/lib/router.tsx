import { createBrowserRouter } from "react-router-dom";
import { Designer } from "../pages/designer.tsx";
import { Project } from "../pages/project.tsx";
import { Projects } from "../pages/projects.tsx";
import { Viewer } from "../pages/viewer.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Projects />,
    },
    {
        path: "/projects/:id",
        element: <Project />,
    },
    {
        path: "/designer",
        element: <Designer />,
    },
    {
        path: "/viewer",
        element: <Viewer />,
    },
]);
