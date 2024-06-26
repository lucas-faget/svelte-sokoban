import { GameBoard } from "./GameBoard";
import type { Coordinates } from "./Coordinates";
import { SquareType } from "./SquareType";
import { Directions } from "./Directions";
import { Move } from "./Move";
import type { GameSquare } from "./GameSquare";
import { Assets } from "./Assets";

export class SokobanGame {
    playerPosition: Coordinates;
    playerDirection: Coordinates;
    board: GameBoard;
    moves: Move[];
    assets: Assets;

    constructor(json: string[][]) {
        this.board = GameBoard.fromJSON(json);
        this.playerPosition = this.board.findPlayerPosition();
        this.playerDirection = Directions.Down;
        this.moves = [];
        this.assets = new Assets();
    }

    moveBox(boxSquare: GameSquare): Move | null {
        let boxMove: Move | null = null;

        let nextBoxSquare: GameSquare | null = this.board.getNextSquare(
            boxSquare.position,
            this.playerDirection
        );
        if (
            nextBoxSquare &&
            (nextBoxSquare.type === SquareType.Ground || nextBoxSquare.type === SquareType.Target)
        ) {
            boxMove = new Move(
                boxSquare,
                nextBoxSquare,
                boxSquare.type,
                nextBoxSquare.type,
                boxSquare.type === SquareType.BoxOnTarget ? SquareType.Target : SquareType.Ground,
                nextBoxSquare.type === SquareType.Target ? SquareType.BoxOnTarget : SquareType.Box
            );
        }

        return boxMove;
    }

    movePlayer(direction: Coordinates): Move | null {
        let move: Move | null = null;

        this.playerDirection = direction;

        let playerSquare: GameSquare | null = this.board.getSquare(this.playerPosition);
        let nextSquare: GameSquare | null = this.board.getNextSquare(
            this.playerPosition,
            this.playerDirection
        );
        if (
            nextSquare &&
            (nextSquare.type === SquareType.Ground ||
                nextSquare.type === SquareType.Target ||
                nextSquare.type === SquareType.Box ||
                nextSquare.type === SquareType.BoxOnTarget)
        ) {
            switch (nextSquare.type) {
                case SquareType.Ground:
                case SquareType.Target:
                    move = new Move(
                        playerSquare,
                        nextSquare,
                        playerSquare.type,
                        nextSquare.type,
                        playerSquare.type === SquareType.PlayerOnTarget
                            ? SquareType.Target
                            : SquareType.Ground,
                        nextSquare.type === SquareType.Target
                            ? SquareType.PlayerOnTarget
                            : SquareType.Player
                    );
                    break;
                case SquareType.Box:
                case SquareType.BoxOnTarget:
                    let boxMove: Move | null = this.moveBox(nextSquare);
                    if (boxMove) {
                        move = new Move(
                            playerSquare,
                            nextSquare,
                            playerSquare.type,
                            boxMove.fromNextType,
                            playerSquare.type === SquareType.PlayerOnTarget
                                ? SquareType.Target
                                : SquareType.Ground,
                            boxMove.fromNextType === SquareType.Target
                                ? SquareType.PlayerOnTarget
                                : SquareType.Player
                        );
                        move.boxMove = boxMove;
                    }
                    break;
            }

            if (move) {
                // Save move
                this.saveMove(move);
                // Set player coordinates
                this.playerPosition = this.board.findPlayerPosition();
            }
        }

        return move;
    }

    getLastMove(): Move | null {
        return this.moves.length > 0 ? this.moves[this.moves.length - 1] : null;
    }

    saveMove(move: Move): void {
        move.performMove();
        this.moves.push(move);
    }

    goToLastMove(): void {
        if (this.moves.length > 0) {
            let lastMove: Move = this.moves.pop();
            lastMove.undoMove();
            this.playerPosition = this.board.findPlayerPosition();
            this.playerDirection = SokobanGame.getDirection(
                lastMove.fromSquare.position,
                lastMove.toSquare.position
            );
        }
    }

    static areEqualPositions(position1: Coordinates, position2: Coordinates): boolean {
        return position1.x === position2.x && position1.y === position2.y;
    }

    static getDirection(fromPosition: Coordinates, toPosition: Coordinates): Coordinates {
        let dx: number = toPosition.x - fromPosition.x;
        let dy: number = toPosition.y - fromPosition.y;

        if (dx < 0 && dy === 0) {
            return Directions.Up;
        } else if (dx === 0 && dy > 0) {
            return Directions.Right;
        } else if (dx === 0 && dy < 0) {
            return Directions.Left;
        } else {
            return Directions.Down;
        }
    }
}
