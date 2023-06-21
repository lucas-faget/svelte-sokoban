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
        sokoban.movePlayer(direction);
        squares = sokoban.board.squares;
        playerDirection = sokoban.playerDirection;
    }

    function turningBack() {
        sokoban.deleteLastMove();
        squares = sokoban.board.squares;
        playerDirection = sokoban.playerDirection;
    }
</script>

<main>
    <ArrowKeyDetection onArrowKey={move}></ArrowKeyDetection>
    <button on:click={turningBack}>Turning back</button>
    <Board squares={squares} hasMoved={hasMoved} playerDirection={playerDirection}></Board>
</main>

<style>
    main {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
