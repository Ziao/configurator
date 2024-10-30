import { atomWithStorage } from "jotai/utils";
import { v4 } from "uuid";

export abstract class Part {
    id = v4();
    abstract type: string;
    abstract name: string;
    abstract config: unknown;
    abstract readonly formFields: FormField[];
    abstract draw(): void;

    save(): SavedPart {
        return {
            id: this.id,
            key: this.type,
            name: this.name,
            config: this.config,
        };
    }
}

export class DicePart extends Part {
    name = "Dice";
    type = "dice";
    config = DicePart.getDefaultConfig();
    readonly formFields: FormField[] = [
        { label: "Inner radius", forConfig: "innerRadius", type: "integer" },
        { label: "Outer radius", forConfig: "outerRadius", type: "integer" },
    ];

    static getDefaultConfig(): DiceConfig {
        // Everything in mm
        return {
            innerRadius: 20,
            outerRadius: 100,
        };
    }

    draw(): void {}
}

interface DiceConfig {
    innerRadius: number;
    outerRadius: number;
}

interface FormField {
    label: string;
    forConfig: string;
    type: "integer" | "float" | "text" | "boolean";
}

export interface SavedPart {
    id: string;
    key: string;
    name: string;
    config: unknown;
}
