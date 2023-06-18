<script lang="ts">
  import type { Coordinates } from "../typescript/Coordinates";
  import { Directions } from "../typescript/Directions";
    import { SquareType } from "../typescript/SquareType";
    import Image from "./Image.svelte";

    const AssetsDir = "/assets/sokoban/";

    const AssetsBlocksDir = AssetsDir + "Blocks/";
    const AssetsCratesDir = AssetsDir + "Crates/";
    const AssetsEnvironmentDir = AssetsDir + "Environment/";
    const AssetsGroundDir = AssetsDir + "Ground/";
    const AssetsPlayerDir = AssetsDir + "Player/";

    const PlayerImages = {
        Up1   : AssetsPlayerDir + "player_02.png",
        Up2   : AssetsPlayerDir + "player_03.png",
        Up3   : AssetsPlayerDir + "player_04.png",
        Down1 : AssetsPlayerDir + "player_23.png",
        Down2 : AssetsPlayerDir + "player_24.png",
        Down3 : AssetsPlayerDir + "player_01.png",
        Right1: AssetsPlayerDir + "player_11.png",
        Right2: AssetsPlayerDir + "player_12.png",
        Right3: AssetsPlayerDir + "player_13.png",
        Left1 : AssetsPlayerDir + "player_14.png",
        Left2 : AssetsPlayerDir + "player_15.png",
        Left3 : AssetsPlayerDir + "player_16.png"
    }

    const Images = {
        Ground        : AssetsGroundDir      + "ground_06.png",
        Wall          : AssetsBlocksDir      + "block_05.png",
        Box           : AssetsCratesDir      + "crate_42.png",
        Target        : AssetsEnvironmentDir + "environment_10.png",
        BoxOnTarget   : AssetsCratesDir      + "crate_45.png",
        Player        : PlayerImages.Down1,
        PlayerOnTarget: AssetsPlayerDir      + "player_01.png"
    }

    export let type: SquareType | string;
    export let playerDirection: Coordinates;
</script>

<div class="square position-relative">
    {#if type === SquareType.Ground}
        <Image src={Images.Ground} alt="ground"></Image>

    {:else if type === SquareType.Wall}
        <Image src={Images.Ground} alt="ground"></Image>
        <Image src={Images.Wall} alt="wall"></Image>

    {:else if type === SquareType.Box}
        <Image src={Images.Ground} alt="ground"></Image>
        <Image src={Images.Box} alt="box"></Image>

    {:else if type === SquareType.Target}
        <Image src={Images.Ground} alt="ground"></Image>
        <Image src={Images.Target} alt="target"></Image>

    {:else if type === SquareType.BoxOnTarget}
        <Image src={Images.Ground} alt="ground"></Image>
        <Image src={Images.BoxOnTarget} alt="box on target"></Image>

    {:else if type === SquareType.Player}
        <Image src={Images.Ground} alt="ground"></Image>
        {#if playerDirection === Directions.Up}
            <Image src={PlayerImages.Up1} alt="player"></Image>
        {:else if playerDirection === Directions.Right}
            <Image src={PlayerImages.Right1} alt="player"></Image>
        {:else if playerDirection === Directions.Left}
            <Image src={PlayerImages.Left1} alt="player"></Image>
        {:else}
            <Image src={PlayerImages.Down1} alt="player"></Image>
        {/if}

    {:else if type === SquareType.PlayerOnTarget}
        <Image src={Images.Ground} alt="ground"></Image>
        {#if playerDirection === Directions.Up}
            <Image src={PlayerImages.Up1} alt="player on target"></Image>
        {:else if playerDirection === Directions.Right}
            <Image src={PlayerImages.Right1} alt="player on target"></Image>
        {:else if playerDirection === Directions.Left}
            <Image src={PlayerImages.Left1} alt="player on target"></Image>
        {:else}
            <Image src={PlayerImages.Down1} alt="player on target"></Image>
        {/if}
    {/if}
</div>

<style>
    .square {
        color: #fff;
        background-color: #000;
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .position-relative {
        position: relative;
    }
</style>
