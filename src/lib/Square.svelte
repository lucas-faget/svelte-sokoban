<script lang="ts">
    import { SquareType } from "../typescript/SquareType";

    const AssetsDir = "/assets/sokoban/";

    const AssetsBlocksDir = AssetsDir + "Blocks/";
    const AssetsCratesDir = AssetsDir + "Crates/";
    const AssetsEnvironmentDir = AssetsDir + "Environment/";
    const AssetsGroundDir = AssetsDir + "Ground/";
    const AssetsPlayerDir = AssetsDir + "Player/";

    const Images = {
        Wall          : AssetsBlocksDir      + "block_05.png",
        Box           : AssetsCratesDir      + "crate_42.png",
        Target        : AssetsEnvironmentDir + "environment_08.png",
        BoxOnTarget   : AssetsCratesDir      + "player_44.png",
        Player        : AssetsPlayerDir      + "player_01.png",
        PlayerOnTarget: AssetsPlayerDir      + "player_01.png"
    }

    export let type: SquareType | string;
</script>

<div class="square">
    {#if type === SquareType.Wall}
        <img src={Images.Wall} alt="player" />

    {:else if type === SquareType.Box}
        <img src={Images.Box} alt="box" />

    {:else if type === SquareType.Target}
        <img src={Images.Target} alt="target" />

    {:else if type === SquareType.BoxOnTarget}
        <img src={Images.BoxOnTarget} alt="box on target" />

    {:else if type === SquareType.Player}
        <img src={Images.Player} alt="player" />

    {:else if type === SquareType.PlayerOnTarget}
        <img src={Images.PlayerOnTarget} alt="player on target" />

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
        border: 1px solid #fff;
    }
</style>
