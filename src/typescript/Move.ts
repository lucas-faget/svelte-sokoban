import type { GameSquare } from "./GameSquare";
import type { SquareType } from "./SquareType";

export class Move
{
    fromSquare: GameSquare;
    toSquare: GameSquare;
    fromPreviousType: SquareType;
    toPreviousType: SquareType;
    fromNextType: SquareType;
    toNextType: SquareType;
    boxMove: Move|null;

    constructor(fromSquare: GameSquare, toSquare: GameSquare, fromPreviousType: SquareType, toPreviousType: SquareType, fromNextType: SquareType, toNextType: SquareType)
    {
        this.fromSquare = fromSquare;
        this.toSquare = toSquare;
        this.fromPreviousType = fromPreviousType;
        this.toPreviousType = toPreviousType;
        this.fromNextType = fromNextType;
        this.toNextType = toNextType;
        this.boxMove = null;
    }

    performMove(): void
    {
        if (this.boxMove) {
            this.boxMove.performMove();
        }
        this.fromSquare.type = this.fromNextType;
        this.toSquare.type = this.toNextType;
    }

    undoMove(): void
    {
        this.fromSquare.type = this.fromPreviousType;
        this.toSquare.type = this.toPreviousType;
        if (this.boxMove) {
            this.boxMove.undoMove();
        }
    }
}
