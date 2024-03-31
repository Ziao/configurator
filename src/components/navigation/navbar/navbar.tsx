import { Box, Button, Container, HStack, Icon, Spacer, Text } from "@chakra-ui/react";
import { InboxIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {}
export const Navbar: FC<NavbarProps> = ({}) => {
    return (
        <Box background={`rgba(255, 255, 255, 0.6)`} pos={"sticky"} top={0} zIndex={20} shadow={"sm"}>
            <Container>
                <HStack height={16}>
                    <Icon as={InboxIcon} boxSize={6} />
                    <Text fontWeight={"bold"} mr={4}>
                        Boxer
                    </Text>

                    {/*<Link to={"/"}>Home</Link>*/}

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
