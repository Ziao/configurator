import { Container, Stack } from "@chakra-ui/react";
import { FC } from "react";
import { DefaultLayout } from "../components/layouts/DefaultLayout.tsx";

interface ViewerProps {}
export const Viewer: FC<ViewerProps> = ({}) => {
    return (
        <DefaultLayout>
            <Container>
                <Stack gap={4}></Stack>
            </Container>
        </DefaultLayout>
    );
};
