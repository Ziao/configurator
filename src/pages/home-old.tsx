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
    Stack,
    Switch,
    Text,
    Wrap,
} from "@chakra-ui/react";
import { FC, useEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { BoxRenderer } from "../components/engine/boxRenderer.tsx";
import { DefaultLayout } from "../components/layouts/DefaultLayout.tsx";
import { createBox } from "../lib/engine/createBox.ts";
import { BoxDefinition, BoxShape } from "../types/boxDefinition.ts";
import paper, { Path } from "paper";

interface HomeProps {}
export const Home: FC<HomeProps> = () => {
    const canvas = useRef<HTMLCanvasElement>(null);

    const { register, watch } = useForm<{ w: number }>({
        defaultValues: {
            w: 100,
        },
    });

    useEffect(() => {
        if (!canvas.current) return;

        paper.setup(canvas.current);
    }, []);

    const w = parseInt(watch("w"));

    useEffect(() => {
        // if (!canvas.current) return;
        paper.project.activeLayer.removeChildren();
        new Path.Rectangle({
            width: w,
            height: w,
            fillColor: new paper.Color("red"),
        });
    }, [w]);

    return (
        <DefaultLayout>
            <Container>
                <Stack gap={4}>
                    <Card>
                        <CardHeader>
                            <Heading size={"md"}>Box creator</Heading>
                        </CardHeader>
                        <CardBody>
                            <form>
                                <Stack>
                                    <HStack>
                                        <FormControl>
                                            <FormLabel>Width (mm)</FormLabel>
                                            <Input type="number" step={1} {...register("w")} />
                                        </FormControl>
                                    </HStack>
                                </Stack>
                            </form>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Heading size={"md"}>SVG</Heading>
                        </CardHeader>
                        <CardBody>
                            <chakra.canvas w={"full"} h={"500px"} ref={canvas} />
                        </CardBody>
                    </Card>
                </Stack>
            </Container>
        </DefaultLayout>
    );
};
