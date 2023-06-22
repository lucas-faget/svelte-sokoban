<script lang="ts">
    export let text: string;
</script>

<div class="button">
    {text}
</div>

<style>
    @import 'https://fonts.googleapis.com/css?family=Rubik+One';

    .button {
        display: inline-block;
        padding: 20px 40px;
        color: white;
        position: absolute;
        transform: translateX(-100%);
        vertical-align: middle;
        font-family: 'Rubik One', sans-serif;
        text-decoration: none;
        font-size: max(16px, 2vw);
        transition: all .5s;
        background-color: hsl(204, 70%, 53%);
        white-space: nowrap;
        cursor: pointer;
    }

    .button::before {
        position: absolute;
        content: '';
        transition: all .5s;
        bottom: -15px;
        height: 15px;
        width: 100%;
        left: 8px;
        transform: skewX(45deg);
        background-color: hsl(204, 70%, 33%);
    }

    .button::after {
        position: absolute;
        content: '';
        transition: all .5s;
        right: -15px;
        height: 100%;
        width: 15px;
        bottom: -8px;
        transform: skewY(45deg);
        background-color: hsl(204, 70%, 23%);
    }

    .button:active {
        margin-left: 10px;
        margin-top: 10px;
    }

    .button:active::before {
        bottom: -5px;
        height: 5px;
        left: 3px;
    }

    .button:active::after {
        right: -5px;
        width: 5px;
        bottom: -3px;
    }
</style>