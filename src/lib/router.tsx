import { createBrowserRouter, createHashRouter } from "react-router-dom";
import { Dice } from "../pages/dice.tsx";
import { Project } from "../pages/project.tsx";
import { Projects } from "../pages/projects.tsx";

export const router = createHashRouter([
    {
        path: "/",
        element: <Dice />,
    },
    // {
    //     path: "/projects",
    //     element: <Projects />,
    // },
    // {
    //     path: "/projects/:projectId",
    //     element: <Project />,
    // },
    // {
    //     path: "/configurator/:partId",
    //     element: <ConfiguratorPartPage />,
    // },
    // {
    //     path: "/configurator",
    //     element: <ConfiguratorPage />,
    // },
    // {
    //     path: "/designer",
    //     element: <Designer />,
    // },
    // {
    //     path: "/viewer",
    //     element: <Viewer />,
    // },
]);
