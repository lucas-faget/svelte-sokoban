import { GameBoard } from "./GameBoard";
import type { Coordinates } from "./Coordinates";
import { SquareType } from "./SquareType";
import { Directions } from "./Directions";

export class SokobanGame {
    playerPosition: Coordinates;
    playerDirection: Coordinates;
    board: GameBoard;

    constructor(json: string[])
    {
        this.board = GameBoard.fromJSON(json);
        this.playerPosition = this.board.findPlayerPosition();
        this.playerDirection = Directions.Down;
    }

    moveBox(boxPosition: Coordinates, direction: Coordinates): boolean
    {
        let nextBoxSquare: SquareType|null = this.board.getNextSquare(boxPosition, direction);
        if (nextBoxSquare && (nextBoxSquare == SquareType.Ground || nextBoxSquare == SquareType.Target)) {
            this.board.setNextSquare(boxPosition, direction,
                nextBoxSquare == SquareType.Target ? SquareType.BoxOnTarget : SquareType.Box
            )

            return true;
        }

        return false;
    }

    movePlayer(direction: Coordinates): void
    {
        this.playerDirection = direction;

        let playerSquare: SquareType|null = this.board.getSquare(this.playerPosition);
        let nextSquare: SquareType|null = this.board.getNextSquare(this.playerPosition, this.playerDirection);
        if (nextSquare && (nextSquare == SquareType.Ground || nextSquare == SquareType.Target || nextSquare == SquareType.Box || nextSquare == SquareType.BoxOnTarget))
        {
            let hasMoved: boolean = false;
            
            switch (nextSquare) {
                case SquareType.Ground:
                    this.board.setNextSquare(this.playerPosition, this.playerDirection, SquareType.Player);
                    hasMoved = true;
                    break;
                case SquareType.Target:
                    this.board.setNextSquare(this.playerPosition, this.playerDirection, SquareType.PlayerOnTarget);
                    hasMoved = true;
                    break;
                case SquareType.Box:
                case SquareType.BoxOnTarget:
                    let boxPosition: Coordinates|null = SokobanGame.getNextPosition(this.playerPosition, this.playerDirection);
                    let boxType: SquareType|null = this.board.getSquare(boxPosition);
                    if (this.moveBox(boxPosition, this.playerDirection)) {
                        this.board.setSquare(boxPosition,
                            boxType === SquareType.BoxOnTarget ? SquareType.PlayerOnTarget : SquareType.Player
                        )
                        hasMoved = true;
                    }
                    break;
            }

            if (hasMoved) {
                // Set previous player square
                this.board.setSquare(this.playerPosition,
                    playerSquare === SquareType.PlayerOnTarget ? SquareType.Target : SquareType.Ground
                );

                // Set player coordinates
                this.playerPosition = this.board.findPlayerPosition();
            }
        }
    }

    static getNextPosition(position: Coordinates, direction: Coordinates, step: number = 1)
    {
        return {
            x: position.x + step * direction.x,
            y: position.y + step * direction.y
        }
    }
}
