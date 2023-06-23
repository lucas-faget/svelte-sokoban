<script lang="ts">
    import { Images } from "../typescript/Images";
    import CustomAsset from "./CustomAsset.svelte";
</script>

<div class="assets-container">
    <h2>Custom Assets</h2>
    <div class="assets">
        <CustomAsset title="Ground" src={Images.Ground}></CustomAsset>
        <CustomAsset title="Wall" src={Images.Wall}></CustomAsset>
        <CustomAsset title="Target" src={Images.Target}></CustomAsset>
        <CustomAsset title="Box" src={Images.Box}></CustomAsset>
        <CustomAsset title="Box on target" src={Images.BoxOnTarget}></CustomAsset>
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
