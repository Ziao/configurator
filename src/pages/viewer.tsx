import { Card, CardBody, CardHeader, Container, Heading, HStack, Select, Stack, Text } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { DefaultLayout } from "../components/layouts/DefaultLayout.tsx";
import { ComponentRenderer } from "../components/wyrm/componentRenderer.tsx";
import { projects } from "../projects";

interface ViewerProps {}
export const Viewer: FC<ViewerProps> = ({}) => {
    const { watch, register, resetField, setValue } = useForm<{ projectId: string; componentId: string }>({});

    const project = projects.find((project) => project.id === watch("projectId"));
    const component = project?.components.find((component) => component.id === watch("componentId"));

    useEffect(() => {
        setValue("projectId", projects[0]?.id);
        setValue("componentId", projects[0]?.components[0]?.id);
    }, [setValue]);

    return (
        <DefaultLayout>
            <Container>
                <Stack gap={8}>
                    <HStack>
                        {/*Project selector*/}
                        <Select
                            w={"xs"}
                            variant={"filled"}
                            bg={"white"}
                            placeholder="Select project"
                            {...register("projectId", {
                                onChange: () => resetField("componentId"),
                            })}
                        >
                            {projects.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </Select>
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
                    </HStack>

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
                                    <Text>Please select a project and component</Text>
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
