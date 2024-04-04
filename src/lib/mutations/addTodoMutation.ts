import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../app/queryClient.ts";
import { Todo } from "../queries/useProjectsQuery.ts";

export const useAddTodoMutation = () => {
    return useMutation({
        mutationKey: ["createTodo"],
        mutationFn: async (task: string) => {
            const todos = JSON.parse(localStorage.getItem("todos") ?? "[]") as Todo[];
            const newTodo = {
                id: Math.random().toString(36).substr(2, 9),
                task,
                completed: false,
            };
            todos.push(newTodo);
            localStorage.setItem("todos", JSON.stringify(todos));
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });
};
