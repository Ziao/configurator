export const copyAndAlterObject = <T extends object>(original: T, alterations: Partial<T>): T => {
    const clone = structuredClone(original);
    return Object.assign(clone, alterations);
};
