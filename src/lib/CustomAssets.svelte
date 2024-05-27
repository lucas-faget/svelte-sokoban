<script lang="ts">
    import type { Assets } from "../typescript/Assets";
    import CustomAsset from "./CustomAsset.svelte";

    export let assets: Assets;
    export let onRefreshBoard: () => void;
</script>

<div class="assets-container">
    <h2>Custom Assets</h2>
    <div class="assets">
        <CustomAsset title="Ground" asset={assets.ground} {onRefreshBoard}></CustomAsset>
        <CustomAsset title="Wall" asset={assets.wall} {onRefreshBoard}></CustomAsset>
        <CustomAsset title="Target" asset={assets.target} {onRefreshBoard}></CustomAsset>
        <CustomAsset title="Box" asset={assets.box} {onRefreshBoard}></CustomAsset>
        <CustomAsset title="Box on target" asset={assets.boxOnTarget} {onRefreshBoard}
        ></CustomAsset>
    </div>
</div>

<style>
    .assets-container {
        width: min(900px, 100vw);
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-wrap: wrap;
        gap: 30px;
    }

    .assets {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 50px;
    }
</style>
