<script>
  import Board from "./components/Board.svelte";
  import Keyboard from "./components/Keyboard.svelte";
  import GameOver from "./components/GameOver.svelte";
  import { gameOver } from "./store";
  import { fade } from "svelte/transition";
</script>

<main>
  <nav>Wordle Clone</nav>
  {#if $gameOver}
    <div in:fade={{ duration: 1000 }}>
      <GameOver />
    </div>
  {:else}
    <div in:fade={{ duration: 800 }}>
      <Board />
      <Keyboard />
    </div>
  {/if}
</main>

<style>
  main {
    min-height: 100vh;
  }
  nav {
    background-color: var(--eerie);
    color: white;
    font-weight: bold;
    font-size: 3em;
    padding: 15px 15px 0px 15px;
    text-align: center;
  }
</style>
