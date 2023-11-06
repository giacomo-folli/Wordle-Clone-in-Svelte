<script>
  import Board from "./components/Board.svelte";
  import Keyboard from "./components/Keyboard.svelte";
  import GameOver from "./components/GameOver.svelte";
  import Switch from "./components/Switch.svelte";
  import { gameOver } from "./store";
  import { fade } from "svelte/transition";

  let showKey = true;
</script>

<main>
  <nav>
    <h1>Wordle Clone</h1>
    <div>
      <Switch bind:checked={showKey} />
    </div>
  </nav>

  {#if $gameOver}
    <div in:fade={{ duration: 1000 }}>
      <GameOver />
    </div>
  {:else}
    <div in:fade={{ duration: 800 }}>
      <Board />
      <Keyboard hide={showKey}/>
    </div>
  {/if}
</main>

<style>
  main {
    min-height: 100vh;
  }

  nav {
    background-color: #f38721f6;
    color: white;
    font-weight: bold;
    font-size: 3em;
    padding: 0px 15px 0px 15px;
    margin: 10px;
    border-radius: 50px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }
</style>
