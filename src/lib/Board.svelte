<script lang="ts">
    import { SquareType } from "../typescript/SquareType";
    import Square from "./Square.svelte";

    type SquareString = `${SquareType}`;

    type BoardFormat = Array<SquareString>

    export let squares: BoardFormat | string[];
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
