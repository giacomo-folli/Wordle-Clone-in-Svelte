<script>
    import { wordList } from "../store.js";
  import {
    GAME_WORD,
    colors,
    gameInfo,
    guess,
    createGrid,
    board,
    gameOver
  } from "../store.js";
  import Board from "./Board.svelte";

  const playAgain = () => {
    console.log("play again");
    const word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
    GAME_WORD.set(word);
    gameInfo.set({ attempt: 0, char: 0 });
    guess.set("");
    colors.set(createGrid());
    board.set(createGrid());
    gameOver.set(false);

    console.log($GAME_WORD);
  };
</script>

<div class="center">
  <h3>The correct word was: <strong>{$GAME_WORD}</strong></h3>
  <h3>You guessed: <strong>{$guess}</strong></h3>
</div>

<Board />

<div class="center">
  <button type="button" on:click={playAgain}>Play Again?</button>
</div>

<style>
  strong {
    font-weight: 900;
  }

  h3 {
    color: var(--whish);
    font-size: 2em;
  }

  button {
    background-color: var(--orange);
    color: white;
    margin-top: 20px;
    padding: 20px 50px;
    cursor: pointer;
    border: none;
  }

  .center {
    margin: 20px auto;
    width: fit-content;
    text-align: center;
  }
</style>
