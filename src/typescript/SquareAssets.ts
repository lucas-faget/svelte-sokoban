import { SquareType } from "./SquareType";

const AssetsDir = "/assets/sokoban/";

export const SquareImages: Map<SquareType, string[]> = new Map([
    [SquareType.Ground, [
        `${AssetsDir}Ground/ground_06.png`,
        `${AssetsDir}Ground/ground_01.png`,
        `${AssetsDir}Ground/ground_05.png`
    ]],
    [SquareType.Wall, [
        `${AssetsDir}Blocks/block_05.png`,
        `${AssetsDir}Blocks/block_06.png`,
        `${AssetsDir}Blocks/block_07.png`,
        `${AssetsDir}Blocks/block_04.png`
    ]],
    [SquareType.Target, [
        `${AssetsDir}Environment/environment_10.png`,
        `${AssetsDir}Environment/environment_02.png`,
        `${AssetsDir}Environment/environment_05.png`,
        `${AssetsDir}Environment/environment_08.png`,
        `${AssetsDir}Environment/environment_14.png`
    ]],
    [SquareType.Box, [
        `${AssetsDir}Crates/crate_42.png`,
        `${AssetsDir}Crates/crate_01.png`
    ]],
    [SquareType.BoxOnTarget, [
        `${AssetsDir}Crates/crate_45.png`,
        `${AssetsDir}Crates/crate_43.png`,
        `${AssetsDir}Crates/crate_44.png`
    ]]
]);
