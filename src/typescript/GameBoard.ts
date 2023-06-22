import type { Coordinates } from "./Coordinates";
import { GameSquare } from "./GameSquare";
import { SquareType } from "./SquareType";

export class GameBoard
{
    squares: GameSquare[][];

    static fromJSON(json: string[][]): GameBoard
    {
        console.log(json);
        json = GameBoard.removeOutsideSquares(json);
        console.log(json);
        const squares: GameSquare[][] = json.map((row, x) => row.map((char, y) => new GameSquare(x, y, GameSquare.getSquareTypeByChar(char))));
        const board = new GameBoard();
        board.squares = squares;

        return board;
    }

    toJSON(): string
    {
        const json = this.squares.map((row) => row.map((square) => square.type));
        return JSON.stringify(json);
    }

    getSquare(position: Coordinates): GameSquare|null
    {
        return this.squares[position.x][position.y] ?? null;
    }

    getNextSquare(position: Coordinates, direction: Coordinates): GameSquare|null
    {
        return this.squares[position.x + direction.x][position.y + direction.y] ?? null;
    }

    setSquare(position: Coordinates, type: SquareType): void
    {
        this.squares[position.x][position.y].type = type;
    }

    setNextSquare(position: Coordinates, direction: Coordinates, type: SquareType): void
    {
        this.squares[position.x + direction.x][position.y + direction.y].type = type;
    }

    findPlayerPosition(): Coordinates|null
    {
        for (const [x, row] of this.squares.entries()) {
            for (const [y, square] of row.entries()) {
                if (square.type === SquareType.Player || square.type === SquareType.PlayerOnTarget) {
                    return square.position;
                }
            }
        }

        return null;
    }

    isLevelWon(): boolean
    {
        for (const [x, row] of this.squares.entries()) {
            for (const [y, square] of row.entries()) {
                if (square.type === SquareType.Box) {
                    return false;
                }
            }
        }

        return true;
    }

    static removeOutsideSquares(squares: string[][]): string[][]
    {
        for (let x = 0; x < squares.length; x++) {
            let firstY: number|undefined = undefined;
            let lastY: number|undefined = undefined;
            for (let y = 0; y < squares[x].length; y++) {
                if (squares[x][y] && squares[x][y] !== SquareType.Ground && squares[x][y] !== SquareType.Void) {
                    lastY = y;
                    if (firstY === undefined) {
                        firstY = y;
                    }
                }
            }
            for (let y = 0; y < squares[x].length; y++) {
                if (y < firstY || y > lastY) {
                    squares[x][y] = SquareType.Void;
                }
            }
        }

        for (let y = 0; y < squares[0].length; y++) {
            let firstX: number|undefined = undefined;
            let lastX: number|undefined = undefined;
            for (let x = 0; x < squares.length; x++) {
                if (squares[x][y] && squares[x][y] !== SquareType.Ground && squares[x][y] !== SquareType.Void) {
                    lastX = x;
                    if (firstX === undefined) {
                        firstX = x;
                    }
                }
            }
            for (let x = 0; x < squares.length; x++) {
                if (x < firstX || x > lastX) {
                    squares[x][y] = SquareType.Void;
                }
            }
        }

        return squares;
    }
}
