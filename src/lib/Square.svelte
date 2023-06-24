<script lang="ts">
    import type { Assets } from "../typescript/Assets";
    import type { Coordinates } from "../typescript/Coordinates";
    import { Directions } from "../typescript/Directions";
    import { SquareType } from "../typescript/SquareType";
    import Image from "./Image.svelte";
    import { PlayerImages } from "../typescript/PlayerAssets";

    export let type: SquareType;
    export let hasMoved: boolean;
    export let playerDirection: Coordinates;
    export let assets: Assets;
</script>

<div class="square position-relative">
    {#if type !== SquareType.Void}
        <Image src={assets.ground.src} alt={assets.ground.alt} isTransitionEnable={false} transitionDirection={playerDirection}></Image>
        {#if type === SquareType.Wall}
            <Image src={assets.wall.src} alt={assets.wall.alt} isTransitionEnable={false} transitionDirection={playerDirection}></Image>
        {:else if type === SquareType.Target}
            <Image src={assets.target.src} alt={assets.target.alt} isTransitionEnable={false} transitionDirection={playerDirection}></Image>
        {:else if type === SquareType.Box}
            <Image src={assets.box.src} alt={assets.box.alt} isTransitionEnable={hasMoved} transitionDirection={playerDirection}></Image>
        {:else if type === SquareType.BoxOnTarget}
            <Image src={assets.boxOnTarget.src} alt={assets.boxOnTarget.alt} isTransitionEnable={hasMoved} transitionDirection={playerDirection}></Image>
        {:else if type === SquareType.Player || type === SquareType.PlayerOnTarget}
            {#if playerDirection == Directions.Up}
                <Image src={PlayerImages.Up} alt="player" isTransitionEnable={hasMoved} transitionDirection={playerDirection}></Image>
            {:else if playerDirection == Directions.Right}
                <Image src={PlayerImages.Right} alt="player" isTransitionEnable={hasMoved} transitionDirection={playerDirection}></Image>
            {:else if playerDirection == Directions.Left}
                <Image src={PlayerImages.Left} alt="player" isTransitionEnable={hasMoved} transitionDirection={playerDirection}></Image>
            {:else}
                <Image src={PlayerImages.Down} alt="player" isTransitionEnable={hasMoved} transitionDirection={playerDirection}></Image>
            {/if}
        {/if}
    {/if}
</div>

<style>
    .square {
        color: #fff;
        width: var(--square-size);
        height: var(--square-size);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .position-relative {
        position: relative;
    }
</style>
