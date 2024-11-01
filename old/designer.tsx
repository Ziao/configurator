import {
    Accordion,
    Card,
    CardBody,
    CardHeader,
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
import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { cheetahSvg, dragonSvg, owlSvg, patternSvg } from "../assets/images/cheetah.ts";
import { BoxRenderer } from "../components/engine/boxRenderer.tsx";
import { createPartDefinition } from "../lib/engine/parts/createPartDefinition.ts";
import { PartConfig } from "../components/engine/partConfig.tsx";
import { DefaultLayout } from "../components/layouts/DefaultLayout.tsx";
import { BoxDefinition, BoxShape, GridFeatureType, PartType, WallSide } from "../types/boxDefinition.ts";

interface DesignerProps {}
export const Designer: FC<DesignerProps> = () => {
    const { register, watch } = useForm<BoxDefinition>({
        defaultValues: {
            shape: BoxShape.rectangle,
            materialThickness: 3.4,
            width: 57 + 3.4 * 2 + 4,
            depth: 57 + 3.4 * 2 + 4,
            height: 40,
            maxPackWidth: 300,
            innerWalls: [],
            slotLength: 8,
            hasLid: false,
            hasLidInset: false,
            hasOuterWall: false,
            hasCardAssist: false,
            hasStackableBottom: false,
            parts: [
                createPartDefinition(PartType.wall, {
                    side: WallSide.front,
                    gridFeatures: [
                        {
                            enabled: false,
                            type: GridFeatureType.graphic,
                            x: 1,
                            y: 1,
                            graphic: {
                                fit: "contain",
                                padding: 10,
                                type: "vector",
                                operation: "subtract",
                                svgContent: dragonSvg,
                            },
                        },
                    ],
                }),
                createPartDefinition(PartType.wall, {
                    side: WallSide.back,
                    gridFeatures: [
                        {
                            enabled: false,
                            type: GridFeatureType.graphic,
                            x: 1,
                            y: 1,
                            graphic: {
                                fit: "contain",
                                padding: 10,
                                type: "vector",
                                operation: "outline",
                                svgContent: owlSvg,
                            },
                        },
                    ],
                }),
                createPartDefinition(PartType.wall, {
                    side: WallSide.left,
                    gridFeatures: [
                        {
                            enabled: false,
                            type: GridFeatureType.graphic,
                            x: 1,
                            y: 1,
                            graphic: {
                                fit: "contain",
                                padding: 10,
                                type: "vector",
                                operation: "engrave",
                                svgContent: cheetahSvg,
                            },
                        },
                        {
                            enabled: true,
                            type: GridFeatureType.drawSlot,
                        },
                        // {
                        //     enabled: true,
                        //     type: GridFeatureType.graphic,
                        //     graphic: {
                        //         operation: "subtract",
                        //         fit: "cover",
                        //         svgContent: patternSvg,
                        //         padding: 10,
                        //         scale: 10,
                        //     },
                        // },
                    ],
                }),
                createPartDefinition(PartType.wall, {
                    side: WallSide.right,
                    gridFeatures: [
                        {
                            enabled: true,
                            type: GridFeatureType.drawSlot,
                        },
                    ],
                }),
                createPartDefinition(PartType.bottom),
                createPartDefinition(PartType.lidTop, {
                    gridFeatures: [
                        {
                            enabled: true,
                            type: GridFeatureType.graphic,
                            graphic: {
                                operation: "subtract",
                                fit: "cover",
                                svgContent: patternSvg,
                                padding: 10,
                                scale: 4,
                            },
                        },
                    ],
                }),
                createPartDefinition(PartType.lidBottom),
                createPartDefinition(PartType.bottomStackable),
                createPartDefinition(PartType.cardAssist, {
                    gridFeatures: [
                        {
                            enabled: true,
                            type: GridFeatureType.graphic,
                            x: 1,
                            y: 1,
                            graphic: {
                                fit: "contain",
                                padding: 5,
                                type: "vector",
                                operation: "engrave",
                                svgContent: owlSvg,
                            },
                        },
                    ],
                }),
            ],
        },
    });

    return (
        <DefaultLayout>
            <Container>
                <Stack gap={4}>
                    <Card>
                        <CardHeader>
                            <Heading size={"md"}>Definition</Heading>
                        </CardHeader>
                        <CardBody>
                            <form>
                                <Stack>
                                    <HStack>
                                        <FormControl>
                                            <FormLabel>Width (mm)</FormLabel>
                                            <Input
                                                type="number"
                                                step={1}
                                                {...register("width", { valueAsNumber: true })}
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Depth (mm)</FormLabel>
                                            <Input
                                                type="number"
                                                step={1}
                                                {...register("depth", { valueAsNumber: true })}
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Height (mm)</FormLabel>
                                            <Input
                                                type="number"
                                                step={1}
                                                {...register("height", { valueAsNumber: true })}
                                            />
                                        </FormControl>
                                    </HStack>
                                    <HStack>
                                        <FormControl>
                                            <FormLabel>Material thickness (mm)</FormLabel>
                                            <Input
                                                type="number"
                                                step={0.1}
                                                {...register("materialThickness", { valueAsNumber: true })}
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Sheet width (mm)</FormLabel>
                                            <Input
                                                type="number"
                                                step={1}
                                                {...register("maxPackWidth", { valueAsNumber: true })}
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Slot length (mm)</FormLabel>
                                            <Input
                                                type="number"
                                                step={1}
                                                {...register("slotLength", { valueAsNumber: true })}
                                            />
                                        </FormControl>
                                    </HStack>

                                    <FormControl>
                                        <FormLabel>Features</FormLabel>
                                        <Wrap spacing={10}>
                                            <HStack as={"label"} cursor={"pointer"}>
                                                <Switch {...register("hasLid")} />
                                                <Text>Lid</Text>
                                            </HStack>
                                            <HStack as={"label"} cursor={"pointer"}>
                                                <Switch {...register("hasLidInset")} />
                                                <Text>Lid inset</Text>
                                            </HStack>
                                            <HStack as={"label"} cursor={"pointer"}>
                                                <Switch {...register("hasOuterWall")} />
                                                <Text>Outer wall</Text>
                                            </HStack>
                                            <HStack as={"label"} cursor={"pointer"}>
                                                <Switch {...register("hasCardAssist")} />
                                                <Text>Card assist</Text>
                                            </HStack>
                                            <HStack as={"label"} cursor={"pointer"}>
                                                <Switch {...register("hasStackableBottom")} />
                                                <Text>Stackable bottom</Text>
                                            </HStack>
                                        </Wrap>
                                    </FormControl>
                                </Stack>
                            </form>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Heading size={"md"}>Part config</Heading>
                        </CardHeader>
                        <CardBody>
                            <Accordion allowToggle>
                                {watch("parts").map((part, index) => (
                                    <PartConfig partIndex={index} part={part} key={index} register={register} />
                                ))}
                            </Accordion>
                        </CardBody>
                    </Card>

                    {/*<Card>*/}
                    {/*    <CardHeader>*/}
                    {/*        <Heading size={"md"}>Graphics</Heading>*/}
                    {/*    </CardHeader>*/}
                    {/*    <CardBody>*/}
                    {/*        <HStack>*/}
                    {/*            <UploadBox*/}
                    {/*                label={"Lid"}*/}
                    {/*                accept={{*/}
                    {/*                    "image/svg+xml": [".svg"],*/}
                    {/*                }}*/}
                    {/*            />*/}
                    {/*            <UploadBox label={"Front"} />*/}
                    {/*            <UploadBox label={"Back"} />*/}
                    {/*            <UploadBox label={"Left"} />*/}
                    {/*            <UploadBox label={"Right"} />*/}
                    {/*            <UploadBox label={"Bottom"} />*/}
                    {/*        </HStack>*/}
                    {/*    </CardBody>*/}
                    {/*</Card>*/}

                    <Card>
                        <CardHeader>
                            <Heading size={"md"}>SVG</Heading>
                        </CardHeader>
                        <CardBody>
                            {/*<Box ref={svgContainer} />*/}
                            <ErrorBoundary
                                fallbackRender={({ error }) => <Text>{error.message}</Text>}
                                resetKeys={[watch()]}
                            >
                                <BoxRenderer definition={watch()} />
                            </ErrorBoundary>
                        </CardBody>
                    </Card>
                </Stack>
            </Container>
        </DefaultLayout>
    );
};
