<script lang="ts">
    import levels from "./levels/levels.json";
    import ArrowKeyDetection from "./lib/ArrowKeyDetection.svelte";
    import CustomAssets from "./lib/CustomAssets.svelte";
    import Background from "./lib/Background.svelte";
    import Board from "./lib/Board.svelte";
    import Button3D from "./lib/Button3D.svelte";
    import type { Coordinates } from "./typescript/Coordinates";
    import type { GameSquare } from "./typescript/GameSquare";
    import type { Move } from "./typescript/Move";
    import { SokobanGame } from "./typescript/SokobanGame";

    const Level1 = levels.levels.shift();
    let sokoban: SokobanGame = new SokobanGame(Level1.board);

    let squares: GameSquare[][] = sokoban.board.squares;
    let lastMove: Move|null = null;
    let playerDirection: Coordinates = sokoban.playerDirection;

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

    function restartLevel() {
        sokoban = new SokobanGame(Level1.board);
        squares = sokoban.board.squares;
        playerDirection = sokoban.playerDirection;
    }
</script>

<main>
    <Background></Background>
    <ArrowKeyDetection onArrowKey={move}></ArrowKeyDetection>
    <div class="sokoban">
        <Board squares={squares} lastMove={lastMove} playerDirection={playerDirection}></Board>
        <div class="buttons">
            <div on:click={goToLastMove} on:keydown={goToLastMove}>
                <Button3D text="Go to last move"></Button3D>
            </div>
            <div on:click={restartLevel} on:keydown={restartLevel}>
                <Button3D text="Restart level"></Button3D>
            </div>
        </div>
        <CustomAssets></CustomAssets>
    </div>
</main>

<style>
    main {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .sokoban {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 50px;
    }

    .buttons {
        display: flex;
        gap: 50px;
    }
</style>
