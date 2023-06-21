import type { Coordinates } from "./Coordinates";
import { SquareType } from "./SquareType";

export class GameSquare
{
    position: Coordinates;
    type: SquareType;

    constructor(x: number, y: number, type: SquareType)
    {
        this.position = {
            x,y
        };
        this.type = type;
    }

    static getSquareTypeByChar(char: string): SquareType
    {
        switch (char) {
            case ' ':
                return SquareType.Ground;
            case '#':
                return SquareType.Wall;
            case '$':
                return SquareType.Box;
            case '.':
                return SquareType.Target;
            case '*':
                return SquareType.BoxOnTarget;
            case '@':
                return SquareType.Player;
            case '+':
                return SquareType.PlayerOnTarget;
            default:
                return SquareType.Void;
        }
    }
}
