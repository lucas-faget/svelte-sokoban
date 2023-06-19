<script lang="ts">
    import type { Coordinates } from "../typescript/Coordinates";
    import { Directions } from "../typescript/Directions";
    import { SquareType } from "../typescript/SquareType";
    import Image from "./Image.svelte";
    import { fade, fly } from 'svelte/transition';

    const AssetsDir = "/assets/sokoban/";

    const Images = {
        Ground        : `${AssetsDir}Ground/ground_06.png`,
        Wall          : `${AssetsDir}Blocks/block_05.png`,
        Box           : `${AssetsDir}Crates/crate_42.png`,
        Target        : `${AssetsDir}Environment/environment_10.png`,
        BoxOnTarget   : `${AssetsDir}Crates/crate_45.png`,
        Player        : {
            Up        : `${AssetsDir}Player/player_02.png`,
            Right     : `${AssetsDir}Player/player_11.png`,
            Left      : `${AssetsDir}Player/player_14.png`,
            Down      : `${AssetsDir}Player/player_23.png`
        },
        PlayerOnTarget: `${AssetsDir}Player/player_01.png`
    }

    export let type: SquareType | string;
    export let playerDirection: Coordinates;

    function flyAnimation() {
        switch (playerDirection) {
            case Directions.Up:
                return { y: 60, duration: 300 };
            case Directions.Right:
                return { x: -60, duration: 300 };
            case Directions.Down:
                return { y: -60, duration: 300 };
            case Directions.Left:
                return { x: 60, duration: 300 };
        }
    }
</script>

<div class="square position-relative">
    <Image src={Images.Ground} alt="ground" isTransitionEnable={false} transitionDirection={playerDirection}></Image>
    {#if type === SquareType.Wall}
        <Image src={Images.Wall} alt="wall" isTransitionEnable={false} transitionDirection={playerDirection}></Image>
    {:else if type === SquareType.Box}
        <Image src={Images.Box} alt="box" isTransitionEnable={true} transitionDirection={playerDirection}></Image>
    {:else if type === SquareType.Target}
        <Image src={Images.Target} alt="target" isTransitionEnable={false} transitionDirection={playerDirection}></Image>
    {:else if type === SquareType.BoxOnTarget}
        <Image src={Images.BoxOnTarget} alt="box on target" isTransitionEnable={true} transitionDirection={playerDirection}></Image>
    {:else if type === SquareType.Player || type === SquareType.PlayerOnTarget}
        {#if playerDirection === Directions.Up}
            <Image src={Images.Player.Up} alt="player" isTransitionEnable={true} transitionDirection={playerDirection}></Image>
        {:else if playerDirection === Directions.Right}
            <Image src={Images.Player.Right} alt="player" isTransitionEnable={true} transitionDirection={playerDirection}></Image>
        {:else if playerDirection === Directions.Left}
            <Image src={Images.Player.Left} alt="player" isTransitionEnable={true} transitionDirection={playerDirection}></Image>
        {:else}
            <Image src={Images.Player.Down} alt="player" isTransitionEnable={true} transitionDirection={playerDirection}></Image>
        {/if}
    {/if}
</div>

<style>
    .square {
        color: #fff;
        background-color: #000;
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
