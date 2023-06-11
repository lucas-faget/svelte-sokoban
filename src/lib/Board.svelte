<script lang="ts">
    import { SquareType } from "../typescript/SquareType";
    import Square from "./Square.svelte";

    export let squares: SquareType[][];
</script>

<div class="board">
    {#each squares as row}
        <div class="row">
            {#each row as square}
                <Square type={square}></Square>
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
