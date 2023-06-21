import { GameBoard } from "./GameBoard";
import type { Coordinates } from "./Coordinates";
import { SquareType } from "./SquareType";
import { Directions } from "./Directions";
import { Move } from "./Move";
import type { GameSquare } from "./GameSquare";

export class SokobanGame
{
    playerPosition: Coordinates;
    playerDirection: Coordinates;
    board: GameBoard;
    moves: Move[];

    constructor(json: string[][])
    {
        this.board = GameBoard.fromJSON(json);
        this.playerPosition = this.board.findPlayerPosition();
        this.playerDirection = Directions.Down;
        this.moves = [];
    }

    moveBox(boxSquare: GameSquare): Move|null
    {
        let boxMove: Move|null = null;

        let nextBoxSquare: GameSquare|null = this.board.getNextSquare(boxSquare.position, this.playerDirection);
        if (nextBoxSquare && (nextBoxSquare.type === SquareType.Ground || nextBoxSquare.type === SquareType.Target)) {
            boxMove = new Move(boxSquare, nextBoxSquare, boxSquare.type, nextBoxSquare.type,
                boxSquare.type === SquareType.BoxOnTarget ? SquareType.Target : SquareType.Ground,
                nextBoxSquare.type === SquareType.Target ? SquareType.BoxOnTarget : SquareType.Box
            );
        }

        return boxMove;
    }

    movePlayer(direction: Coordinates): Move|null
    {
        let move: Move|null = null;

        this.playerDirection = direction;

        let playerSquare: GameSquare|null = this.board.getSquare(this.playerPosition);
        let nextSquare: GameSquare|null = this.board.getNextSquare(this.playerPosition, this.playerDirection);
        if (nextSquare && (nextSquare.type === SquareType.Ground || nextSquare.type === SquareType.Target || nextSquare.type === SquareType.Box || nextSquare.type === SquareType.BoxOnTarget))
        {
            switch (nextSquare.type) {
                case SquareType.Ground:
                case SquareType.Target:
                    move = new Move(playerSquare, nextSquare, playerSquare.type, nextSquare.type,
                        playerSquare.type === SquareType.PlayerOnTarget ? SquareType.Target : SquareType.Ground,
                        nextSquare.type === SquareType.Target ? SquareType.PlayerOnTarget : SquareType.Player
                    );
                    break;
                case SquareType.Box:
                case SquareType.BoxOnTarget:
                    let boxMove: Move|null = this.moveBox(nextSquare);
                    if (boxMove) {
                        move = new Move(playerSquare, nextSquare, playerSquare.type, boxMove.fromNextType,
                            playerSquare.type === SquareType.PlayerOnTarget ? SquareType.Target : SquareType.Ground,
                            boxMove.fromNextType === SquareType.Target ? SquareType.PlayerOnTarget : SquareType.Player
                        );
                        move.boxMove = boxMove;
                    }
                    break;
            }

            if (move) {
                // Perform move
                this.board.move(move);
                // Save move
                this.saveMove(move);
                // Set player coordinates
                this.playerPosition = this.board.findPlayerPosition();
            }
        }

        return move;
    }

    saveMove(move: Move): void
    {
        this.moves.push(move);
        console.log(this.moves);
    }

    static getNextPosition(position: Coordinates, direction: Coordinates, step: number = 1)
    {
        return {
            x: position.x + step * direction.x,
            y: position.y + step * direction.y
        }
    }
}
