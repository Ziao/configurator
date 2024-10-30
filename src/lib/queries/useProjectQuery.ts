import { useQuery } from "@tanstack/react-query";
import { projects } from "../../projects";

export const useProjectQuery = (id: string) => {
    return useQuery({
        queryKey: ["project", id],
        queryFn: async () => {
            const project = projects.find((project) => project.id === id);
            if (!project) throw new Error("Project not found");
            return project;
        },
    });
};
