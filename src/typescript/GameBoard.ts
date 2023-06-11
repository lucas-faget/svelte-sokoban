import type { Coordinates } from "./Coordinates";
import { SquareType } from "./SquareType";

export class GameBoard {
    squares: SquareType[][];

    static fromJSON(json: string[]): GameBoard {
        const squares: SquareType[][] = json.map((row) => row.split('').map((str) => GameBoard.getSquareType(str)));
        const gameBoard: GameBoard = new GameBoard();
        gameBoard.squares = squares;
        return gameBoard;
    }

    toJSON(): string {
        const jsonSquares = this.squares.map((row) => row.map((square) => GameBoard.getSquareType(square))).map((row) => row.join(''));
        return JSON.stringify(jsonSquares);
    }

    getSquare(x: number, y: number): SquareType|null {
        return this.squares[x][y] ?? null;
    }

    getNextSquare(x: number, y: number, direction: Coordinates): SquareType|null {
        return this.squares[x + direction.x][y + direction.y] ?? null;
    }

    setSquare(x: number, y: number, squareType: SquareType): void {
        this.squares[x][y] === squareType;
    }

    setNextSquare(x: number, y: number, direction: Coordinates, squareType: SquareType): void {
        this.squares[x + direction.x][y + direction.y] === squareType;
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

    static getSquareType(char: string): SquareType
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
