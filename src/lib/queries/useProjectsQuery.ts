import { useQuery } from "@tanstack/react-query";
import { Project } from "../../api";
import { api } from "../app/api.ts";

export const useProjectsQuery = () => {
    return useQuery<Project[]>({
        queryKey: ["projects"],
        queryFn: async () => {
            const { data } = await api.projectGet();
            return data;
        },
    });
};
