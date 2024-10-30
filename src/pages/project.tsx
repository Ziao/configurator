import { Card, CardBody, CardHeader, Container, Heading, HStack, Select, Stack, Text } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { DefaultLayout } from "../components/layouts/DefaultLayout.tsx";
import { ComponentRenderer } from "../components/wyrm/componentRenderer.tsx";
import { useProjectQuery } from "../lib/queries/useProjectQuery.ts";
import { projects } from "../projects";

interface ProjectProps {}
export const Project: FC<ProjectProps> = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const { data: project } = useProjectQuery(projectId || "");

    const { watch, register, setValue } = useForm<{ componentId: string }>({});

    const component = project?.components.find((component) => component.id === watch("componentId"));

    useEffect(() => {
        setValue("componentId", projects[0]?.components[1]?.id);
    }, [setValue]);

    return (
        <DefaultLayout>
            <Container>
                <Stack gap={8}>
                    {/*Component selector*/}
                    <Select
                        w={"xs"}
                        variant={"filled"}
                        bg={"white"}
                        placeholder="Select component"
                        isDisabled={!project}
                        {...register("componentId")}
                    >
                        {project?.components.map((component) => (
                            <option key={component.id} value={component.id}>
                                {component.name}
                            </option>
                        ))}
                    </Select>

                    {project && (
                        <Card>
                            <CardHeader>
                                <Heading as={"h2"} size={"md"} fontWeight={"semibold"}>
                                    {project.name} {component && `/ ${component.name}`}
                                </Heading>
                                <Heading as={"h3"} size={"sm"} fontWeight={"normal"}>
                                    {project.description}
                                </Heading>
                            </CardHeader>

                            {!component && (
                                <CardBody>
                                    <Text>Please select a component</Text>
                                </CardBody>
                            )}

                            {component && (
                                <CardBody>
                                    <ErrorBoundary
                                        fallbackRender={({ error }) => <Text>{error.message}</Text>}
                                        resetKeys={[watch()]}
                                    >
                                        {/*<BoxRenderer definition={watch()} />*/}
                                        <ComponentRenderer project={project} component={component} />
                                    </ErrorBoundary>
                                </CardBody>
                            )}
                        </Card>
                    )}
                </Stack>
            </Container>
        </DefaultLayout>
    );
};
