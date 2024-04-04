import {
    Box,
    Card,
    CardBody,
    CardHeader,
    chakra,
    Container,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    LinkBox,
    LinkOverlay,
    Stack,
    Switch,
    Text,
    Wrap,
} from "@chakra-ui/react";
import { FC, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { DefaultLayout } from "../components/layouts/DefaultLayout.tsx";
import { useProjectsQuery } from "../lib/queries/useProjectsQuery.ts";

interface ProjectsProps {}
export const Projects: FC<ProjectsProps> = () => {
    const { data: projects } = useProjectsQuery();

    return (
        <DefaultLayout>
            <Container>
                <Stack gap={8}>
                    <Heading size={"lg"}>Projects</Heading>
                    {projects?.map((project) => (
                        <Card key={project.id}>
                            <CardHeader>
                                <Link to={`/projects/${project.id}`}>
                                    <Heading size={"md"} color={"teal"}>
                                        {project.name}
                                    </Heading>
                                </Link>
                            </CardHeader>
                            <CardBody>
                                <Text>{project.description}</Text>
                            </CardBody>
                        </Card>
                    ))}
                </Stack>
            </Container>
        </DefaultLayout>
    );
};
