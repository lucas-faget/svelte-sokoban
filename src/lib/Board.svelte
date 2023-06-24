<script lang="ts">
  import type { Assets } from "../typescript/Assets";
    import type { Coordinates } from "../typescript/Coordinates";
    import type { GameSquare } from "../typescript/GameSquare";
    import type { Move } from "../typescript/Move";
    import { SokobanGame } from "../typescript/SokobanGame";
    import Square from "./Square.svelte";

    export let squares: GameSquare[][];
    export let lastMove: Move|null;
    export let playerDirection: Coordinates;
    export let assets: Assets;

    function hasMoved(position: Coordinates): boolean {
        return lastMove && (
            SokobanGame.areEqualPositions(lastMove.fromSquare.position, position) || 
            SokobanGame.areEqualPositions(lastMove.toSquare.position, position) || 
            (lastMove.boxMove && SokobanGame.areEqualPositions(lastMove.boxMove.toSquare.position, position))
        )
    }
</script>

<div class="board">
    {#each squares as row}
        <div class="row">
            {#each row as square}
                {#key square}
                    <Square type={square.type} hasMoved={hasMoved(square.position)} playerDirection={playerDirection} assets={assets}></Square>
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
