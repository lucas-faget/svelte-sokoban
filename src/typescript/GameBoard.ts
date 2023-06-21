import type { Coordinates } from "./Coordinates";
import { GameSquare } from "./GameSquare";
import type { Move } from "./Move";
import { SquareType } from "./SquareType";

export class GameBoard
{
    squares: GameSquare[][];

    static fromJSON(json: string[][]): GameBoard
    {
        const squares = json.map((row, x) => row.map((char, y) => new GameSquare(x, y, GameSquare.getSquareTypeByChar(char))));
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
}
