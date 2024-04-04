export interface SlotConfig {
    start: [number, number];
    end: [number, number];
    slotLength: number;
    thickness: number;
    amount: number;
    even: boolean;
}

type CreateSlotConfigParams = Partial<Pick<SlotConfig, "slotLength">> &
    Pick<SlotConfig, "start" | "end" | "thickness" | "even">;

export const createSlotConfig = (config: CreateSlotConfigParams): SlotConfig => {
    return {
        slotLength: 10,
        amount: 0,
        ...config,
    };
};
