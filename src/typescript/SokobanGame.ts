import { GameBoard } from "./GameBoard";
import type { Coordinates } from "./Coordinates";
import { SquareType } from "./SquareType";

export class SokobanGame {
    playerPosition: Coordinates;
    gameBoard: GameBoard;

    constructor(json: string[]) {
        this.gameBoard = GameBoard.fromJSON(json);
        this.playerPosition = this.gameBoard.findPlayerPosition();
        console.log(this.playerPosition);
    }

    movePlayer(direction: Coordinates): void {
        let nextSquare: SquareType|null = this.gameBoard.getNextSquare(this.playerPosition.x, this.playerPosition.y, direction);
        if (nextSquare && nextSquare !== SquareType.Wall) {
            this.gameBoard.setSquare(this.playerPosition.x, this.playerPosition.y, SquareType.Ground);
            this.gameBoard.setNextSquare(this.playerPosition.x, this.playerPosition.y, direction, SquareType.Player);
            this.playerPosition.x += direction.x;
            this.playerPosition.y += direction.y;
        }
    }
}
