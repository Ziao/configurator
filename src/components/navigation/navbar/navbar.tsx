import { Box, Container, HStack, Icon, Spacer, Text } from "@chakra-ui/react";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

interface NavbarProps {}
export const Navbar: FC<NavbarProps> = ({}) => {
    return (
        <Box background={"white"} pos={"sticky"} top={0} zIndex={20} shadow={"sm"}>
            <Container>
                <HStack height={16}>
                    <Icon as={WrenchScrewdriverIcon} boxSize={6} />
                    <Text fontWeight={"bold"} mr={4}>
                        3D Lab Configurator
                    </Text>

                    {/*<Link to={"/"}>Projects</Link>*/}
                    {/*<Link to={"/"}>Creator</Link>*/}
                    {/*<Link to={"/designer"}>Designer</Link>*/}
                    {/*<Link to={"/viewer"}>Viewer</Link>*/}

                    <Spacer />

                    {/*<Button size={"md"}>Log in</Button>*/}

                    {/*<HStack gap={1}>*/}
                    {/*    <Icon as={UserCircleIcon} boxSize={6} />*/}
                    {/*    <strong>John Doe</strong>*/}
                    {/*</HStack>*/}
                </HStack>
            </Container>
        </Box>
    );
};
