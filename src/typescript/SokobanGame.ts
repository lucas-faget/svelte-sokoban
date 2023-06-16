import { GameBoard } from "./GameBoard";
import type { Coordinates } from "./Coordinates";
import { SquareType } from "./SquareType";

export class SokobanGame {
    playerPosition: Coordinates;
    gameBoard: GameBoard;

    constructor(json: string[])
    {
        this.gameBoard = GameBoard.fromJSON(json);
        this.playerPosition = this.gameBoard.findPlayerPosition();
        console.log(this.playerPosition);
    }

    moveBox(boxPosition: Coordinates, direction: Coordinates): boolean
    {
        let nextBoxSquare: SquareType|null = this.gameBoard.getNextSquare(boxPosition, direction);
        if (nextBoxSquare && (nextBoxSquare == SquareType.Ground || nextBoxSquare == SquareType.Target)) {
            this.gameBoard.setNextSquare(boxPosition, direction,
                nextBoxSquare == SquareType.Target ? SquareType.BoxOnTarget : SquareType.Box
            )

            return true;
        }

        return false;
    }

    movePlayer(direction: Coordinates): void
    {
        let playerSquare: SquareType|null = this.gameBoard.getSquare(this.playerPosition);
        let nextSquare: SquareType|null = this.gameBoard.getNextSquare(this.playerPosition, direction);
        if (nextSquare && (nextSquare == SquareType.Ground || nextSquare == SquareType.Target || nextSquare == SquareType.Box || nextSquare == SquareType.BoxOnTarget))
        {
            let canMove: boolean = false;
            
            switch (nextSquare) {
                case SquareType.Ground:
                    this.gameBoard.setNextSquare(this.playerPosition, direction, SquareType.Player);
                    canMove = true;
                    break;
                case SquareType.Target:
                    this.gameBoard.setNextSquare(this.playerPosition, direction, SquareType.PlayerOnTarget);
                    canMove = true;
                    break;
                case SquareType.Box:
                case SquareType.BoxOnTarget:
                    let boxPosition: Coordinates|null = SokobanGame.getNextPosition(this.playerPosition, direction);
                    let boxType: SquareType|null = this.gameBoard.getSquare(boxPosition);
                    if (this.moveBox(boxPosition, direction)) {
                        this.gameBoard.setSquare(boxPosition,
                            boxType === SquareType.BoxOnTarget ? SquareType.PlayerOnTarget : SquareType.Player
                        )
                        canMove = true;
                    }
                    break;
            }

            if (canMove) {
                // Set previous player square
                this.gameBoard.setSquare(this.playerPosition,
                    playerSquare === SquareType.PlayerOnTarget ? SquareType.Target : SquareType.Ground
                );

                // Set player coordinates
                this.playerPosition = this.gameBoard.findPlayerPosition();
                console.log(this.playerPosition);
                console.log(this.gameBoard);
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
