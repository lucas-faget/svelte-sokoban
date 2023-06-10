<script lang="ts">
    import type { SquareType } from "../typescript/SquareType";

    export let type: SquareType | String;
</script>

<div class="square">
    {type}
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
