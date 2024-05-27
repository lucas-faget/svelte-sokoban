<script lang="ts">
    import type { Coordinates } from "../typescript/Coordinates";
    import { Directions } from "../typescript/Directions";

    export let onArrowKey: (direction: Coordinates) => void;

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === "ArrowUp") {
            console.log("up");
            onArrowKey(Directions.Up);
        } else if (event.key === "ArrowDown") {
            console.log("down");
            onArrowKey(Directions.Down);
        } else if (event.key === "ArrowLeft") {
            console.log("left");
            onArrowKey(Directions.Left);
        } else if (event.key === "ArrowRight") {
            console.log("right");
            onArrowKey(Directions.Right);
        }
    }
</script>

<svelte:window on:keydown|preventDefault={handleKeyDown} />
