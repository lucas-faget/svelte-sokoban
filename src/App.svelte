<script lang="ts">
    import levels from "./levels/levels.json";
    import ArrowKeyDetection from "./lib/ArrowKeyDetection.svelte";
    import Board from "./lib/Board.svelte";
    import type { Coordinates } from "./typescript/Coordinates";
    import { SokobanGame } from "./typescript/SokobanGame";

    const Level1 = levels.levels.shift();
    const sokoban = new SokobanGame(Level1.board);

    function move(direction: Coordinates) {
        sokoban.movePlayer(direction);
    }
</script>

<main>
    <Board squares={sokoban.gameBoard.squares}></Board>
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
