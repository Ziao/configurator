// import { useQuery } from "@tanstack/react-query";
// import { Project } from "../../api";
// import { api } from "../app/api.ts";
//
// export const useProjectQuery = (id: number) => {
//     return useQuery<Project>({
//         queryKey: ["project", id],
//         queryFn: async () => {
//             const { data } = await api.projectGet(`eq.${id}`);
//             if (!data.length) throw new Error("Project not found");
//
//             return data[0];
//         },
//     });
// };
