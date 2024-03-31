import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app.tsx";
import { queryClient } from "./lib/app/queryClient.ts";
import { theme } from "./lib/app/theme.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme} resetCSS={true}>
                <App />
            </ChakraProvider>
        </QueryClientProvider>
    </React.StrictMode>,
);
