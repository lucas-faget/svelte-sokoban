<script lang="ts">
    export let src: string;
    export let alt: string;
</script>

<img src={src} alt={alt} class="position-absolute" />

<style>
    img {
        width: 100%;
        height: 100%;
    }

    .position-absolute {
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
