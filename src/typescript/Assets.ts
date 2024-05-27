import type { Asset } from "./Asset";
import { AssetDirection } from "./AssetDirection";
import { SquareImages } from "./SquareAssets";
import { SquareType } from "./SquareType";

export class Assets {
    ground: Asset;
    wall: Asset;
    target: Asset;
    box: Asset;
    boxOnTarget: Asset;

    constructor() {
        this.ground = {
            type: SquareType.Ground,
            src: SquareImages.get(SquareType.Ground)[0],
            alt: "Ground",
            index: 0,
        };
        this.wall = {
            type: SquareType.Wall,
            src: SquareImages.get(SquareType.Wall)[0],
            alt: "Wall",
            index: 0,
        };
        this.target = {
            type: SquareType.Target,
            src: SquareImages.get(SquareType.Target)[0],
            alt: "Target",
            index: 0,
        };
        this.box = {
            type: SquareType.Box,
            src: SquareImages.get(SquareType.Box)[0],
            alt: "Wall",
            index: 0,
        };
        this.boxOnTarget = {
            type: SquareType.BoxOnTarget,
            src: SquareImages.get(SquareType.BoxOnTarget)[0],
            alt: "Box on target",
            index: 0,
        };
    }

    static setAsset(asset: Asset, direction: AssetDirection): Asset {
        asset.index =
            direction === AssetDirection.Previous
                ? Assets.getPreviousArrayIndex(asset.index, SquareImages.get(asset.type))
                : Assets.getNextArrayIndex(asset.index, SquareImages.get(asset.type));
        asset.src = SquareImages.get(asset.type)[asset.index];

        return asset;
    }

    static getPreviousArrayIndex(index: number, array: string[]): number {
        return index === 0 ? array.length - 1 : index - 1;
    }

    static getNextArrayIndex(index: number, array: string[]): number {
        return index === array.length - 1 ? 0 : index + 1;
    }
}
