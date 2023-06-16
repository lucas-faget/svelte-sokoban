import type { Coordinates } from "./Coordinates";
import { SquareType } from "./SquareType";

export class GameBoard {
    squares: SquareType[][];

    static fromJSON(json: string[]): GameBoard {
        const squares: SquareType[][] = json.map((row) => row.split('').map((str) => GameBoard.getSquareTypeByChar(str)));
        const gameBoard: GameBoard = new GameBoard();
        gameBoard.squares = squares;
        return gameBoard;
    }

    toJSON(): string {
        const jsonSquares = this.squares.map((row) => row.map((square) => GameBoard.getSquareTypeByChar(square))).map((row) => row.join(''));
        return JSON.stringify(jsonSquares);
    }

    getSquare(position: Coordinates): SquareType|null {
        return this.squares[position.x][position.y] ?? null;
    }

    getNextSquare(position: Coordinates, direction: Coordinates): SquareType|null {
        return this.squares[position.x + direction.x][position.y + direction.y] ?? null;
    }

    setSquare(position: Coordinates, squareType: SquareType): void {
        this.squares[position.x][position.y] = squareType;
    }

    setNextSquare(position: Coordinates, direction: Coordinates, squareType: SquareType): void {
        this.squares[position.x + direction.x][position.y + direction.y] = squareType;
    }

    findPlayerPosition(): Coordinates|null {
        for (const [x, row] of this.squares.entries()) {
            for (const [y, square] of row.entries()) {
                if (square === SquareType.Player || square === SquareType.PlayerOnTarget) {
                    return {
                        x: x, 
                        y: y
                    }
                }
            }
        }

        return null;
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
