<script lang="ts">
    import Image from "./Image.svelte";

    export let title: string;
    export let src: string;
</script>

<div class="asset">
    <h3>{title}</h3>
    <div class="image-and-arrows">
        <span class="material-symbols-outlined">
            arrow_back_ios_new
        </span>
        <div class="image">
            <Image src={src} alt="asset" isTransitionEnable={false} transitionDirection={null}></Image>
        </div>
        <span class="material-symbols-outlined">
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
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48;
    }
</style>
