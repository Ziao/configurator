// // import {
// //     Box,
// //     Card,
// //     CardBody,
// //     CardHeader,
// //     chakra,
// //     Container,
// //     FormControl,
// //     FormLabel,
// //     Heading,
// //     HStack,
// //     Input,
// //     Stack,
// //     Switch,
// //     Text,
// //     Wrap,
// // } from "@chakra-ui/react";
// // import { FC, useEffect, useRef } from "react";
// // import { ErrorBoundary } from "react-error-boundary";
// // import { useForm } from "react-hook-form";
// // import { BoxRenderer } from "../components/engine/boxRenderer.tsx";
// // import { UploadBox } from "../components/files/UploadBox.tsx";
// // import { DefaultLayout } from "../components/layouts/DefaultLayout.tsx";
// // import { createBox } from "../lib/engine/createBox.ts";
// // import { BoxDefinition, BoxShape } from "../types/boxDefinition.ts";
// //
// // interface HomeProps {}
// export const Home: FC<HomeProps> = () => {
//     //     const { register, watch } = useForm<BoxDefinition>({
//     //         defaultValues: {
//     //             shape: BoxShape.rectangle,
//     //             materialThickness: 3.4,
//     //             width: 60,
//     //             depth: 90,
//     //             height: 40,
//     //             maxPackWidth: 4000,
//     //             innerWalls: [],
//     //             slotLength: 8,
//     //             hasLid: false,
//     //             hasLidInset: false,
//     //             hasOuterWall: false,
//     //             hasCardAssist: false,
//     //             hasStackableBottom: false,
//     //         },
//     //     });
//     //
//     return <DefaultLayout>Home</DefaultLayout>;
//     //             <Container>
//     //                 <Stack gap={4}>
//     //                     <Card>
//     //                         <CardHeader>
//     //                             <Heading size={"md"}>Box creator</Heading>
//     //                         </CardHeader>
//     //                         <CardBody>
//     //                             <form>
//     //                                 <Stack>
//     //                                     <HStack>
//     //                                         <FormControl>
//     //                                             <FormLabel>Width (mm)</FormLabel>
//     //                                             <Input
//     //                                                 type="number"
//     //                                                 step={1}
//     //                                                 {...register("width", { valueAsNumber: true })}
//     //                                             />
//     //                                         </FormControl>
//     //                                         <FormControl>
//     //                                             <FormLabel>Depth (mm)</FormLabel>
//     //                                             <Input
//     //                                                 type="number"
//     //                                                 step={1}
//     //                                                 {...register("depth", { valueAsNumber: true })}
//     //                                             />
//     //                                         </FormControl>
//     //                                         <FormControl>
//     //                                             <FormLabel>Height (mm)</FormLabel>
//     //                                             <Input
//     //                                                 type="number"
//     //                                                 step={1}
//     //                                                 {...register("height", { valueAsNumber: true })}
//     //                                             />
//     //                                         </FormControl>
//     //                                     </HStack>
//     //                                     <HStack>
//     //                                         <FormControl>
//     //                                             <FormLabel>Material thickness (mm)</FormLabel>
//     //                                             <Input
//     //                                                 type="number"
//     //                                                 step={0.1}
//     //                                                 {...register("materialThickness", { valueAsNumber: true })}
//     //                                             />
//     //                                         </FormControl>
//     //                                         <FormControl>
//     //                                             <FormLabel>Sheet width (mm)</FormLabel>
//     //                                             <Input
//     //                                                 type="number"
//     //                                                 step={1}
//     //                                                 {...register("maxPackWidth", { valueAsNumber: true })}
//     //                                             />
//     //                                         </FormControl>
//     //                                         <FormControl>
//     //                                             <FormLabel>Slot length (mm)</FormLabel>
//     //                                             <Input
//     //                                                 type="number"
//     //                                                 step={1}
//     //                                                 {...register("slotLength", { valueAsNumber: true })}
//     //                                             />
//     //                                         </FormControl>
//     //                                     </HStack>
//     //                                     <FormControl>
//     //                                         <FormLabel>Features</FormLabel>
//     //                                         <Wrap spacing={10}>
//     //                                             <HStack as={"label"} cursor={"pointer"}>
//     //                                                 <Switch {...register("hasLid")} />
//     //                                                 <Text>Lid</Text>
//     //                                             </HStack>
//     //                                             <HStack as={"label"} cursor={"pointer"}>
//     //                                                 <Switch {...register("hasLidInset")} />
//     //                                                 <Text>Lid inset</Text>
//     //                                             </HStack>
//     //                                             <HStack as={"label"} cursor={"pointer"}>
//     //                                                 <Switch {...register("hasOuterWall")} />
//     //                                                 <Text>Outer wall</Text>
//     //                                             </HStack>
//     //                                             <HStack as={"label"} cursor={"pointer"}>
//     //                                                 <Switch {...register("hasCardAssist")} />
//     //                                                 <Text>Card assist</Text>
//     //                                             </HStack>
//     //                                             <HStack as={"label"} cursor={"pointer"}>
//     //                                                 <Switch {...register("hasStackableBottom")} />
//     //                                                 <Text>Stackable bottom</Text>
//     //                                             </HStack>
//     //                                         </Wrap>
//     //                                     </FormControl>
//     //                                 </Stack>
//     //                             </form>
//     //                         </CardBody>
//     //                     </Card>
//     //
//     //                     <Card>
//     //                         <CardHeader>
//     //                             <Heading size={"md"}>Graphics</Heading>
//     //                         </CardHeader>
//     //                         <CardBody>
//     //                             <HStack>
//     //                                 <UploadBox
//     //                                     label={"Lid"}
//     //                                     accept={{
//     //                                         "image/svg+xml": [".svg"],
//     //                                     }}
//     //                                 />
//     //                                 <UploadBox label={"Front"} />
//     //                                 <UploadBox label={"Back"} />
//     //                                 <UploadBox label={"Left"} />
//     //                                 <UploadBox label={"Right"} />
//     //                                 <UploadBox label={"Bottom"} />
//     //                             </HStack>
//     //                         </CardBody>
//     //                     </Card>
//     //
//     //                     <Card>
//     //                         <CardHeader>
//     //                             <Heading size={"md"}>SVG</Heading>
//     //                         </CardHeader>
//     //                         <CardBody>
//     //                             {/*<Box ref={svgContainer} />*/}
//     //                             <ErrorBoundary
//     //                                 fallbackRender={({ error }) => <Text>{error.message}</Text>}
//     //                                 resetKeys={[watch()]}
//     //                             >
//     //                                 <BoxRenderer definition={watch()} />
//     //                             </ErrorBoundary>
//     //                         </CardBody>
//     //                     </Card>
//     //                 </Stack>
//     //             </Container>
//     //         </DefaultLayout>
//     //     );
// };
