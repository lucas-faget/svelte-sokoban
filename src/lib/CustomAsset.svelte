<script lang="ts">
    import type { Asset } from "../typescript/Asset";
    import { AssetDirection } from "../typescript/AssetDirection";
    import { Assets } from "../typescript/Assets";
    import Image from "./Image.svelte";

    export let title: string;
    export let asset: Asset;
    export let onRefreshBoard: () => void;

    function changeAsset(direction: AssetDirection): void {
        asset = Assets.setAsset(asset, direction);
        onRefreshBoard();
    }
</script>

<div class="asset">
    <h3>{title}</h3>
    <div class="image-and-arrows">
        <span
            class="material-symbols-outlined"
            on:click={() => changeAsset(AssetDirection.Previous)}
            on:keydown={() => changeAsset(AssetDirection.Previous)}
        >
            arrow_back_ios_new
        </span>
        <div class="image">
            <Image
                src={asset.src}
                alt={asset.alt}
                isTransitionEnable={false}
                transitionDirection={null}
            ></Image>
        </div>
        <span
            class="material-symbols-outlined"
            on:click={() => changeAsset(AssetDirection.Next)}
            on:keydown={() => changeAsset(AssetDirection.Next)}
        >
            arrow_forward_ios
        </span>
    </div>
</div>

<style>
    .asset {
        background-color: hsl(0, 0%, 100%, 0.5);
        width: 250px;
        height: 250px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
        border-radius: 50px;
    }

    .image-and-arrows {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .image {
        position: relative;
        width: var(--square-size);
        height: var(--square-size);
    }

    .material-symbols-outlined {
        cursor: pointer;
        font-variation-settings:
            "FILL" 0,
            "wght" 400,
            "GRAD" 0,
            "opsz" 48;
    }
</style>
