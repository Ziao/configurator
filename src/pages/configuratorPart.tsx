import { Button, Container, Heading, HStack, Icon, Stack } from "@chakra-ui/react";
import { DocumentPlusIcon, PlusIcon, WrenchIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 } from "uuid";
import { DefaultLayout } from "../components/layouts/DefaultLayout.tsx";
import { diceAtom, DicePart, Part, SavedPart } from "../parts/dice/dicePart.ts";

export const savedPartsAtom = atomWithStorage<SavedPart[]>("savedParts", []);

interface Props {}
export const ConfiguratorPartPage: FC<Props> = () => {
    const [savedParts, setSavedParts] = useAtom(savedPartsAtom);
    const navigate = useNavigate();

    const createPart = (partClass: new () => Part) => {
        const part = new partClass();
        setSavedParts([...savedParts, part.save()]);
        navigate(`/configurator/${part.id}`);
    };

    return (
        <DefaultLayout>
            <Container>
                <Stack>
                    <Heading size={"md"}>Jouw opgeslagen onderdelen</Heading>
                    <HStack>
                        {savedParts.map((part) => (
                            <Button key={part.id} onClick={() => navigate(`/configurator/${part.id}`)}>
                                {part.name}
                            </Button>
                        ))}
                    </HStack>
                </Stack>

                <Stack>
                    <Heading size={"md"}>Nieuw onderdeel maken</Heading>
                    <HStack>
                        {availableParts.map((part, i) => (
                            <Button key={i} onClick={() => createPart(part)}>
                                {part.name}
                            </Button>
                        ))}
                    </HStack>
                </Stack>
                {/*<Stack gap={8}>*/}
                {/*    /!*Component selector*!/*/}
                {/*    <Select*/}
                {/*        w={"xs"}*/}
                {/*        variant={"filled"}*/}
                {/*        bg={"white"}*/}
                {/*        placeholder="Select component"*/}
                {/*        isDisabled={!project}*/}
                {/*        {...register("componentId")}*/}
                {/*    >*/}
                {/*        {project?.components.map((component) => (*/}
                {/*            <option key={component.id} value={component.id}>*/}
                {/*                {component.name}*/}
                {/*            </option>*/}
                {/*        ))}*/}
                {/*    </Select>*/}

                {/*    {project && (*/}
                {/*        <Card>*/}
                {/*            <CardHeader>*/}
                {/*                <Heading as={"h2"} size={"md"} fontWeight={"semibold"}>*/}
                {/*                    {project.name} {component && `/ ${component.name}`}*/}
                {/*                </Heading>*/}
                {/*                <Heading as={"h3"} size={"sm"} fontWeight={"normal"}>*/}
                {/*                    {project.description}*/}
                {/*                </Heading>*/}
                {/*            </CardHeader>*/}

                {/*            {!component && (*/}
                {/*                <CardBody>*/}
                {/*                    <Text>Please select a component</Text>*/}
                {/*                </CardBody>*/}
                {/*            )}*/}

                {/*            {component && (*/}
                {/*                <CardBody>*/}
                {/*                    <ErrorBoundary*/}
                {/*                        fallbackRender={({ error }) => <Text>{error.message}</Text>}*/}
                {/*                        resetKeys={[watch()]}*/}
                {/*                    >*/}
                {/*                        /!*<BoxRenderer definition={watch()} />*!/*/}
                {/*                        <ComponentRenderer project={project} component={component} />*/}
                {/*                    </ErrorBoundary>*/}
                {/*                </CardBody>*/}
                {/*            )}*/}
                {/*        </Card>*/}
                {/*    )}*/}
                {/*</Stack>*/}
            </Container>
        </DefaultLayout>
    );
};
