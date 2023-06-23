<script lang="ts">
    import type { Coordinates } from "../typescript/Coordinates";
    import { Directions } from "../typescript/Directions";
    import { Images } from "../typescript/Images";
    import { SquareType } from "../typescript/SquareType";
    import Image from "./Image.svelte";

    export let type: SquareType;
    export let hasMoved: boolean;
    export let playerDirection: Coordinates;
</script>

<div class="square position-relative">
    {#if type !== SquareType.Void}
        <Image src={Images.Ground} alt="ground" isTransitionEnable={false} transitionDirection={playerDirection}></Image>
        {#if type === SquareType.Wall}
            <Image src={Images.Wall} alt="wall" isTransitionEnable={false} transitionDirection={playerDirection}></Image>
        {:else if type === SquareType.Box}
            <Image src={Images.Box} alt="box" isTransitionEnable={hasMoved} transitionDirection={playerDirection}></Image>
        {:else if type === SquareType.Target}
            <Image src={Images.Target} alt="target" isTransitionEnable={false} transitionDirection={playerDirection}></Image>
        {:else if type === SquareType.BoxOnTarget}
            <Image src={Images.BoxOnTarget} alt="box on target" isTransitionEnable={hasMoved} transitionDirection={playerDirection}></Image>
        {:else if type === SquareType.Player || type === SquareType.PlayerOnTarget}
            {#if playerDirection == Directions.Up}
                <Image src={Images.Player.Up} alt="player" isTransitionEnable={hasMoved} transitionDirection={playerDirection}></Image>
            {:else if playerDirection == Directions.Right}
                <Image src={Images.Player.Right} alt="player" isTransitionEnable={hasMoved} transitionDirection={playerDirection}></Image>
            {:else if playerDirection == Directions.Left}
                <Image src={Images.Player.Left} alt="player" isTransitionEnable={hasMoved} transitionDirection={playerDirection}></Image>
            {:else}
                <Image src={Images.Player.Down} alt="player" isTransitionEnable={hasMoved} transitionDirection={playerDirection}></Image>
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
