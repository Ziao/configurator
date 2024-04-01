import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    chakra,
    Checkbox,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Select,
    Switch,
} from "@chakra-ui/react";
import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { BoxDefinition, Part } from "../../types/boxDefinition.ts";

interface PartConfigProps {
    part: Part;
    partIndex: number;
    register: UseFormRegister<BoxDefinition>;
}
export const PartConfig: FC<PartConfigProps> = ({ part, register, partIndex }) => {
    return (
        <AccordionItem>
            <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                    {part.type} {part.side && `(${part.side})`}
                </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
                <HStack>
                    <FormControl>
                        <FormLabel>Grid rows</FormLabel>
                        <Input type="number" step={1} {...register(`parts.${partIndex}.gridWidth`)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Grid columns</FormLabel>
                        <Input type="number" step={1} {...register(`parts.${partIndex}.gridHeight`)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Behavior</FormLabel>
                        <Select
                            {...register(`parts.${partIndex}.gridWallOffset`, {
                                setValueAs: (value) => value === "true",
                            })}
                        >
                            <option value={"false"}>Grid starts at part edge</option>
                            <option value={"true"}>Grid respects wall thickness</option>
                        </Select>
                    </FormControl>
                </HStack>
            </AccordionPanel>
        </AccordionItem>
    );
};
