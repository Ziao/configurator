import { useQuery } from "@tanstack/react-query";

// We normally wouldn't keep this here but you're probably going to delete this file anyway
export interface Todo {
    id: string;
    task: string;
    completed: boolean;
}

export const useTodosQuery = () => {
    return useQuery<Todo[]>({
        queryKey: ["todos"],
        queryFn: async () => {
            return JSON.parse(localStorage.getItem("todos") ?? "[]") as Todo[];
        },
    });
};
