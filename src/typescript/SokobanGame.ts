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
        let playerSquare: SquareType|null = this.board.getSquare(this.playerPosition);
        let nextSquare: SquareType|null = this.board.getNextSquare(this.playerPosition, direction);
        if (nextSquare && (nextSquare == SquareType.Ground || nextSquare == SquareType.Target || nextSquare == SquareType.Box || nextSquare == SquareType.BoxOnTarget))
        {
            let canMove: boolean = false;
            
            switch (nextSquare) {
                case SquareType.Ground:
                    this.board.setNextSquare(this.playerPosition, direction, SquareType.Player);
                    canMove = true;
                    break;
                case SquareType.Target:
                    this.board.setNextSquare(this.playerPosition, direction, SquareType.PlayerOnTarget);
                    canMove = true;
                    break;
                case SquareType.Box:
                case SquareType.BoxOnTarget:
                    let boxPosition: Coordinates|null = SokobanGame.getNextPosition(this.playerPosition, direction);
                    let boxType: SquareType|null = this.board.getSquare(boxPosition);
                    if (this.moveBox(boxPosition, direction)) {
                        this.board.setSquare(boxPosition,
                            boxType === SquareType.BoxOnTarget ? SquareType.PlayerOnTarget : SquareType.Player
                        )
                        canMove = true;
                    }
                    break;
            }

            if (canMove) {
                // Set previous player square
                this.board.setSquare(this.playerPosition,
                    playerSquare === SquareType.PlayerOnTarget ? SquareType.Target : SquareType.Ground
                );

                this.setPlayerPosition();
            }
        }
    }

    setPlayerPosition()
    {
        let previousPlayerPosition: Coordinates = this.playerPosition;
        // Set player coordinates
        this.playerPosition = this.board.findPlayerPosition();
        let nextPlayerPosition: Coordinates = this.playerPosition;

        let direction: Coordinates = {
            x: nextPlayerPosition.x - previousPlayerPosition.x,
            y: nextPlayerPosition.y - previousPlayerPosition.y
        }

        if (direction.x === Directions.Up.x && direction.y === Directions.Up.y) {
            this.playerDirection = Directions.Up;
        } else if (direction.x === Directions.Right.x && direction.y === Directions.Right.y) {
            this.playerDirection = Directions.Right;
        } else if (direction.x === Directions.Left.x && direction.y === Directions.Left.y) {
            this.playerDirection = Directions.Left;
        } else {
            this.playerDirection = Directions.Down;
        }

        console.log(this.playerDirection === Directions.Up)
    }

    static getNextPosition(position: Coordinates, direction: Coordinates, step: number = 1)
    {
        return {
            x: position.x + step * direction.x,
            y: position.y + step * direction.y
        }
    }
}
