<script lang="ts">
  import type { Coordinates } from "../typescript/Coordinates";
  import { Directions } from "../typescript/Direction";

    export let onArrowKey: (direction: Coordinates) => void;

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === "ArrowUp") {
            onArrowKey(Directions.Up);
        } else if (event.key === "ArrowDown") {
            onArrowKey(Directions.Down);
        } else if (event.key === "ArrowLeft") {
            onArrowKey(Directions.Left);
        } else if (event.key === "ArrowRight") {
            onArrowKey(Directions.Right);
        }
    }
</script>
  
<svelte:window on:keydown|preventDefault={handleKeyDown} />
