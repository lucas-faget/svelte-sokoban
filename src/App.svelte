<script lang="ts">
    import levels from "./levels/levels.json";
    import ArrowKeyDetection from "./lib/ArrowKeyDetection.svelte";
    import Board from "./lib/Board.svelte";
    import type { Coordinates } from "./typescript/Coordinates";
    import { SokobanGame } from "./typescript/SokobanGame";
    import type { SquareType } from "./typescript/SquareType";

    const Level1 = levels.levels.shift();
    const sokoban = new SokobanGame(Level1.board);

    let squares: SquareType[][] = sokoban.board.squares;
    let playerDirection: Coordinates = sokoban.playerDirection;

    function move(direction: Coordinates) {
        sokoban.movePlayer(direction);
        squares = sokoban.board.squares;
        playerDirection = sokoban.playerDirection
    }
</script>

<main>
    <Board squares={squares} playerDirection={playerDirection}></Board>
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
