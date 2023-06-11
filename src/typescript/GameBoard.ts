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
