import type { SquareType } from "./SquareType";

export type Asset = {
    type: SquareType;
    src: string;
    alt: string;
    index: number;
};
