import { createBrowserRouter } from "react-router-dom";
import { ConfiguratorPage } from "../pages/configurator.tsx";
import { ConfiguratorPartPage } from "../pages/configuratorPart.tsx";
import { Dice } from "../pages/dice.tsx";
import { Project } from "../pages/project.tsx";
import { Projects } from "../pages/projects.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Dice />,
    },
    {
        path: "/projects",
        element: <Projects />,
    },
    {
        path: "/projects/:projectId",
        element: <Project />,
    },
    {
        path: "/configurator/:partId",
        element: <ConfiguratorPartPage />,
    },
    {
        path: "/configurator",
        element: <ConfiguratorPage />,
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
