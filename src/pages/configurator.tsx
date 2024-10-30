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
export const availableParts = [DicePart];

interface Props {}
export const ConfiguratorPage: FC<Props> = () => {
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
            </Container>
        </DefaultLayout>
    );
};
