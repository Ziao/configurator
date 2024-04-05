declare module "bin-pack-with-constraints" {
    export interface PackableItem<T> {
        width: number;
        height: number;
        x: number;
        y: number;
        item: T;
    }

    export interface PackOptions {
        inPlace: boolean;
        maxWidth?: number;
        maxHeight?: number;
    }

    export interface PackResult {
        width: number;
        height: number;
    }
    export default function pack(items: PackableItem[], options: PackOptions): PackResult;
}
