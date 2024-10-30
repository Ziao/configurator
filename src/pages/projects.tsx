import { Card, CardBody, CardHeader, Container, Heading, LinkBox, LinkOverlay, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";
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
                        <LinkBox key={project.id}>
                            <Card>
                                <CardHeader>
                                    <LinkOverlay href={`/projects/${project.id}`}>
                                        {/*<Link to={`/projects/${project.id}`}>*/}
                                        <Heading size={"md"}>{project.name}</Heading>
                                        {/*</Link>*/}
                                    </LinkOverlay>
                                </CardHeader>
                                <CardBody>
                                    <Text>{project.description}</Text>
                                </CardBody>
                            </Card>
                        </LinkBox>
                    ))}
                </Stack>
            </Container>
        </DefaultLayout>
    );
};
