import { Button, Center, Heading, Icon, Text } from "@chakra-ui/react";
import { CheckCircleIcon, DocumentPlusIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";

interface UploadBoxProps extends Partial<DropzoneOptions> {
    label?: string;
    currentFile?: File | null;
    isError?: boolean;
    onClear?: () => void;
}
export const UploadBox: FC<UploadBoxProps> = ({ currentFile, isError, label, onClear, ...options }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        maxFiles: 1,
        ...options,
    });

    return (
        <Center
            {...getRootProps()}
            bg={isDragActive ? "white" : "gray.100"}
            h={60}
            flexDir={"column"}
            gap={4}
            textColor={"gray.400"}
            borderRadius={"xl"}
            borderColor={"gray.300"}
            borderWidth={"2px"}
            borderStyle={"dashed"}
            cursor={"pointer"}
            _hover={{ bg: "gray.50" }}
            outline={isError ? "2px solid var(--chakra-colors-red-500)" : "none"}
            outlineOffset={-2}
            flexGrow={1}
        >
            {/*Hidden input, needed for opening file dialog*/}
            <input type={"file"} {...getInputProps()} />

            {!isDragActive && !currentFile && (
                <>
                    <Icon as={DocumentPlusIcon} boxSize={8} />
                    {label && <Text>{label}</Text>}
                    {!label && <Text>Drag your file here or click to select</Text>}
                </>
            )}
            {!isDragActive && currentFile && (
                <>
                    <Icon as={CheckCircleIcon} boxSize={8} />
                    <Text>{currentFile.name}</Text>
                    {onClear && (
                        <Button
                            variant={"ghost"}
                            onClick={(e) => {
                                e.stopPropagation();
                                onClear();
                            }}
                        >
                            Clear file
                        </Button>
                    )}
                </>
            )}
            {isDragActive && <Heading>Drop to upload</Heading>}
        </Center>
    );
};
