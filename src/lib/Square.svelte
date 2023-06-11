<script lang="ts">
    import { SquareType } from "../typescript/SquareType";
    import Image from "./Image.svelte";

    const AssetsDir = "/assets/sokoban/";

    const AssetsBlocksDir = AssetsDir + "Blocks/";
    const AssetsCratesDir = AssetsDir + "Crates/";
    const AssetsEnvironmentDir = AssetsDir + "Environment/";
    const AssetsGroundDir = AssetsDir + "Ground/";
    const AssetsPlayerDir = AssetsDir + "Player/";

    const Images = {
        Ground        : AssetsGroundDir      + "ground_06.png",
        Wall          : AssetsBlocksDir      + "block_05.png",
        Box           : AssetsCratesDir      + "crate_42.png",
        Target        : AssetsEnvironmentDir + "environment_10.png",
        BoxOnTarget   : AssetsCratesDir      + "crate_45.png",
        Player        : AssetsPlayerDir      + "player_01.png",
        PlayerOnTarget: AssetsPlayerDir      + "player_01.png"
    }

    export let type: SquareType | string;
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
        <Image src={Images.Player} alt="target"></Image>

    {:else if type === SquareType.PlayerOnTarget}
        <Image src={Images.Ground} alt="ground"></Image>
        <Image src={Images.PlayerOnTarget} alt="player on target"></Image>
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
