<script lang="ts">
    import levels from "./levels/levels.json";
    import Board from "./lib/Board.svelte";

    const Level1 = levels.levels.shift();
</script>

<main>
    <Board squares={Level1.board}></Board>
</main>

<style>
    main {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
