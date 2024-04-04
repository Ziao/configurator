import { Card, CardBody, CardHeader, Container, Heading, HStack, Select, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { DefaultLayout } from "../components/layouts/DefaultLayout.tsx";
import { ComponentRenderer } from "../components/wyrm/componentRenderer.tsx";
import { projects } from "../projects";

interface ViewerProps {}
export const Viewer: FC<ViewerProps> = ({}) => {
    const { watch, register, resetField } = useForm<{ projectId: string; componentId: string }>({
        defaultValues: {
            projectId: projects[0]?.id,
            componentId: projects[0]?.components[0]?.id,
        },
    });

    const project = projects.find((project) => project.id === watch("projectId"));
    const component = project?.components.find((component) => component.id === watch("componentId"));

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
                            {/*<option value="option1">Option 1</option>*/}
                            {/*<option value="option2">Option 2</option>*/}
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

                            {project && component && (
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
