<script lang="ts">
    import levels from "./levels/levels.json";
    import Board from "./lib/Board.svelte";
    import { GameBoard } from "./typescript/GameBoard";

    const Level1 = levels.levels.shift();

    const GB = GameBoard.fromJSON(Level1.board);
</script>

<main>
    <Board squares={GB.squares}></Board>
</main>

<style>
    main {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
