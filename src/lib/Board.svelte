<script lang="ts">
    import type { Coordinates } from "../typescript/Coordinates";
    import type { GameSquare } from "../typescript/GameSquare";
    import Square from "./Square.svelte";

    export let squares: GameSquare[][];
    export let hasMoved: boolean = false;
    export let playerDirection: Coordinates;
</script>

<div class="board">
    {#each squares as row}
        <div class="row">
            {#each row as square}
                {#key square}
                    <Square type={square.type} hasMoved={hasMoved} playerDirection={playerDirection}></Square>
                {/key}
            {/each}
        </div>
    {/each}
</div>

<style>
    .board {
        display: flex;
        flex-direction: column;
    }

    .row {
        display: flex;
    }
</style>
