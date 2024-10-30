/// <reference types="vitest" />
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
    base: command === "build" ? "/configurator/" : "/",
    build: {
        outDir: "docs",
    },
    plugins: [
        react(),
        // TanStackRouterVite()
    ],
    server: {
        host: "0.0.0.0",
        port: 3000,
    },
    resolve: {
        alias: {
            // No worky :D
            // "@": "./src",
        },
    },
    test: {
        environment: "happy-dom",
    },
}));
