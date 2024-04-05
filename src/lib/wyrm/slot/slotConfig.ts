export interface SlotConfig {
    start: [number, number];
    end: [number, number];
    length: number;
    thickness: number;
    amount: number;
    even: boolean;
}

type CreateSlotConfigParams = Partial<Pick<SlotConfig, "length">> &
    Pick<SlotConfig, "start" | "end" | "thickness" | "even">;

export const createSlotConfig = (config: CreateSlotConfigParams): SlotConfig => {
    return {
        length: 10,
        amount: 0,
        ...config,
    };
};
