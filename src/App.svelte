<script lang="ts">
    import levels from "./levels/levels.json";
    import ArrowKeyDetection from "./lib/ArrowKeyDetection.svelte";
    import Board from "./lib/Board.svelte";
    import type { Coordinates } from "./typescript/Coordinates";
    import type { GameSquare } from "./typescript/GameSquare";
    import { SokobanGame } from "./typescript/SokobanGame";

    const Level1 = levels.levels.shift();
    const sokoban = new SokobanGame(Level1.board);

    let squares: GameSquare[][] = sokoban.board.squares;
    let hasMoved: boolean = false;
    let playerDirection: Coordinates = sokoban.playerDirection;
    let isLevelWon: boolean = sokoban.board.isLevelWon();

    function move(direction: Coordinates) {
        hasMoved = sokoban.movePlayer(direction);
        squares = sokoban.board.squares;
        playerDirection = sokoban.playerDirection;
        if (hasMoved) {
            isLevelWon = sokoban.board.isLevelWon();
        }
    }
</script>

<main>
    <Board squares={squares} hasMoved={hasMoved} playerDirection={playerDirection}></Board>
    <ArrowKeyDetection onArrowKey={move}></ArrowKeyDetection>
</main>

<style>
    main {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
