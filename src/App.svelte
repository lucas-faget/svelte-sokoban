<script lang="ts">
    import levels from "./levels/levels.json";
    import ArrowKeyDetection from "./lib/ArrowKeyDetection.svelte";
    import Board from "./lib/Board.svelte";
    import Button3D from "./lib/Button3D.svelte";
    import type { Coordinates } from "./typescript/Coordinates";
    import type { GameSquare } from "./typescript/GameSquare";
    import type { Move } from "./typescript/Move";
    import { SokobanGame } from "./typescript/SokobanGame";

    const Level1 = levels.levels.shift();
    const sokoban = new SokobanGame(Level1.board);

    let squares: GameSquare[][] = sokoban.board.squares;
    let lastMove: Move|null = null;
    let playerDirection: Coordinates = sokoban.playerDirection;
    let isLevelWon: boolean = sokoban.board.isLevelWon();

    function move(direction: Coordinates) {
        lastMove = sokoban.movePlayer(direction);
        squares = sokoban.board.squares;
        playerDirection = sokoban.playerDirection;
    }

    function goToLastMove() {
        sokoban.goToLastMove();
        squares = sokoban.board.squares;
        lastMove = null;
        playerDirection = sokoban.playerDirection;
    }
</script>

<main>
    <ArrowKeyDetection onArrowKey={move}></ArrowKeyDetection>
    <div class="sokoban">
        <Board squares={squares} lastMove={lastMove} playerDirection={playerDirection}></Board>
        <div class="position-fixed" on:click={goToLastMove} on:keydown={goToLastMove}>
            <Button3D text="Go to last move"></Button3D>
        </div>
    </div>
</main>

<style>
    main {
        background: url("/landscapes/landscape.jpg");
        background-size: cover;
        background-position: center top;
        background-repeat: no-repeat;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .sokoban {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .position-fixed {
        position: fixed;
        top: 20px;
        right: calc(35px);
    }
</style>
