<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import type { Coordinates } from "../typescript/Coordinates";
    import { Directions } from "../typescript/Directions";

    export let src: string;
    export let alt: string;
    export let isTransitionEnable: boolean = false
    export let transitionDirection: Coordinates;

    function flyTransition() {
        switch (transitionDirection) {
            case Directions.Up:
                return { y: 60, duration: 300 };
            case Directions.Right:
                return { x: -60, duration: 300 };
            case Directions.Down:
                return { y: -60, duration: 300 };
            case Directions.Left:
                return { x: 60, duration: 300 };
            default:
                return {};
        }
    }
</script>

{#if isTransitionEnable}
    <div class="position-absolute" in:fly="{flyTransition()}">
        <img src={src} alt={alt} />
    </div>
{:else}
    <div class="position-absolute">
        <img src={src} alt={alt} />
    </div>
{/if}

<style>
    .position-absolute {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    img {
        width: 100%;
        height: 100%;
    }
</style>
