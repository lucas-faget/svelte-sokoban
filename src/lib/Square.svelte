<script lang="ts">
    import { SquareType } from "../typescript/SquareType";

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
        <img src={Images.Ground} alt="ground" />

    {:else if type === SquareType.Wall}
        <img src={Images.Wall} alt="wall" />

    {:else if type === SquareType.Box}
        <img src={Images.Box} alt="box" />

    {:else if type === SquareType.Target}
        <img src={Images.Ground} alt="ground" />
        <img src={Images.Target} alt="target" class="position-absolute" />

    {:else if type === SquareType.BoxOnTarget}
        <img src={Images.BoxOnTarget} alt="box on target" />

    {:else if type === SquareType.Player}
        <img src={Images.Ground} alt="ground" />
        <img src={Images.Player} alt="player" class="position-absolute" />

    {:else if type === SquareType.PlayerOnTarget}
        <img src={Images.Ground} alt="ground" />
        <img src={Images.PlayerOnTarget} alt="player" class="position-absolute" />
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

    .position-absolute {
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
