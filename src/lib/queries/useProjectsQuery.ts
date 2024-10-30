import { useQuery } from "@tanstack/react-query";
import { projects } from "../../projects";

export const useProjectsQuery = () => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: async () => {
            return projects;
        },
    });
};
