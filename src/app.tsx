import { FC } from "react";
import { RouterProvider } from "react-router-dom";
// import { RouterProvider } from "@tanstack/react-router";
// import { router } from "./lib/app/router.ts";
import { router } from "./lib/router.tsx";

interface AppProps {}
export const App: FC<AppProps> = ({}) => {
    return <RouterProvider router={router} />;
};
