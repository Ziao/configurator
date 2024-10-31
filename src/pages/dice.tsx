import {
    chakra,
    Container,
    HStack,
    Input,
    Stack,
    FormLabel,
    FormControl,
    Button,
    Divider,
    useToast,
} from "@chakra-ui/react";
import { FC, useEffect, useLayoutEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useEffectOnce } from "react-use";
import { DefaultLayout } from "../components/layouts/DefaultLayout.tsx";
import { downloadSvg } from "../lib/engine/util/downloadSvg.ts";
import { setupPaper, usePaper } from "../lib/util/usePaper.ts";
import { FormShape } from "../parts/dice/formShape.ts";
import { drawDice } from "./drawDice.ts";

interface Props {}
export const Dice: FC<Props> = () => {
    const { watch, register, setValue, getValues } = useForm<FormShape>({
        defaultValues: {
            font: "courier",
            fontSize: 5,
            innerRadius: 12,
            outerRadius: 50,
            row1Count: 10,
            row2Count: 12,
            row3Count: 20,
            outerPadding: 2,
            innerPadding: 8,
            rowMarginAngle: 4,
            rowMargin: 2,
        },
    });

    // const canvas = useRef<HTMLCanvasElement>(null);

    // usePaper(canvas.current);

    const errorToast = useToast({});

    useEffect(() => {
        try {
            drawDice(watch());
        } catch (e) {
            errorToast({
                title: "Er is een fout opgetreden",
                description: (e as Error).message,
                status: "error",
            });
        }
    }, [watch()]);

    return (
        <DefaultLayout>
            <Container>
                <Stack gap={4}>
                    <HStack>
                        <FormControl>
                            {/*Inner radius*/}
                            <FormLabel>Radius midden</FormLabel>
                            <Input
                                variant={"filled"}
                                bg={"white"}
                                placeholder="In millimeter"
                                type={"number"}
                                step={1}
                                {...register("innerRadius", {
                                    valueAsNumber: true,
                                })}
                            />
                        </FormControl>
                        <FormControl>
                            {/*Outer radius*/}
                            <FormLabel>Radius buiten</FormLabel>
                            <Input
                                variant={"filled"}
                                bg={"white"}
                                placeholder="In millimeter"
                                type={"number"}
                                step={1}
                                {...register("outerRadius", {
                                    valueAsNumber: true,
                                })}
                            />
                        </FormControl>
                        <FormControl>
                            {/*Inner padding*/}
                            <FormLabel>Padding binnen</FormLabel>
                            <Input
                                variant={"filled"}
                                bg={"white"}
                                placeholder="In millimeter"
                                type={"number"}
                                step={1}
                                {...register("innerPadding", {
                                    valueAsNumber: true,
                                })}
                            />
                        </FormControl>
                        <FormControl>
                            {/*Outer padding*/}
                            <FormLabel>Padding buiten</FormLabel>
                            <Input
                                variant={"filled"}
                                bg={"white"}
                                placeholder="In millimeter"
                                type={"number"}
                                step={1}
                                {...register("outerPadding", {
                                    valueAsNumber: true,
                                })}
                            />
                        </FormControl>
                    </HStack>
                    <HStack>
                        <FormControl>
                            {/*Row padding angle*/}
                            <FormLabel>Padding hoek</FormLabel>
                            <Input
                                variant={"filled"}
                                bg={"white"}
                                placeholder="In graden"
                                type={"number"}
                                step={1}
                                {...register("rowMarginAngle", {
                                    valueAsNumber: true,
                                })}
                            />
                        </FormControl>
                        <FormControl>
                            {/*Row padding*/}
                            <FormLabel>Rij padding</FormLabel>
                            <Input
                                variant={"filled"}
                                bg={"white"}
                                placeholder="In millimeter"
                                type={"number"}
                                step={1}
                                {...register("rowMargin", {
                                    valueAsNumber: true,
                                })}
                            />
                        </FormControl>
                        <FormControl>
                            {/*Row 1 count*/}
                            <FormLabel>Rij 1</FormLabel>
                            <Input
                                variant={"filled"}
                                bg={"white"}
                                placeholder="Aantal"
                                type={"number"}
                                step={1}
                                {...register("row1Count", {
                                    valueAsNumber: true,
                                })}
                            />
                        </FormControl>
                        <FormControl>
                            {/*Row 2 count*/}
                            <FormLabel>Rij 2</FormLabel>
                            <Input
                                variant={"filled"}
                                bg={"white"}
                                placeholder="Aantal"
                                type={"number"}
                                step={1}
                                {...register("row2Count", {
                                    valueAsNumber: true,
                                })}
                            />
                        </FormControl>
                        <FormControl>
                            {/*Row 3 count*/}
                            <FormLabel>Rij 3</FormLabel>
                            <Input
                                variant={"filled"}
                                bg={"white"}
                                placeholder="Aantal"
                                type={"number"}
                                step={1}
                                {...register("row3Count", {
                                    valueAsNumber: true,
                                })}
                            />
                        </FormControl>
                    </HStack>
                    <HStack>
                        <FormControl>
                            {/*Font*/}
                            <FormLabel>Lettertype</FormLabel>
                            <Input variant={"filled"} bg={"white"} placeholder="In millimeter" {...register("font")} />
                        </FormControl>
                        <FormControl>
                            {/*Font*/}
                            <FormLabel>Letter formaat</FormLabel>
                            <Input
                                variant={"filled"}
                                type={"number"}
                                step={1}
                                bg={"white"}
                                placeholder="In millimeter"
                                {...register("fontSize", {
                                    valueAsNumber: true,
                                })}
                            />
                        </FormControl>
                        <Button
                            flexShrink={0}
                            alignSelf={"end"}
                            colorScheme={"teal"}
                            onClick={() => downloadSvg("dice.svg")}
                        >
                            Download svg
                        </Button>
                    </HStack>

                    <Divider />

                    {/*<chakra.canvas ref={canvas} />*/}
                    <chakra.canvas ref={setupPaper} />
                </Stack>
            </Container>
        </DefaultLayout>
    );
};
