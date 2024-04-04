// import { Container, Heading, Stack } from "@chakra-ui/react";
// import { FC } from "react";
// import { DefaultLayout } from "../components/layouts/DefaultLayout.tsx";
// import { useProjectQuery } from "../lib/queries/useProjectQuery.ts";
//
// interface ProjectProps {}
// export const Project: FC<ProjectProps> = () => {
//     const { data: project } = useProjectQuery(1);
//
//     if (!project) {
//         return "Loading..";
//     }
//
//     return (
//         <DefaultLayout>
//             <Container>
//                 <Stack gap={8}>
//                     <Heading size={"lg"}>{project.name}</Heading>
//                 </Stack>
//             </Container>
//         </DefaultLayout>
//     );
// };
