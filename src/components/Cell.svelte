<script>
  import { board, colors, gameOver } from "../store.js";
  export let x;
  export let y;
  $: letter = $board[y][x];
  $: color = $colors[y][x];
</script>

<div class={`cell ${color}`}>
  {#if !$gameOver}
    {letter}
  {/if}
</div>

<style>
  .cell {
    width: 50px;
    height: 50px;
    color: var(--jet);
    background-color: var(--whish);
    margin: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 55px;
    border-radius: 5px;
    transition: background-color 0.6s;
  }

  .CORRECT {
    background-color: var(--green);
  }

  .CLOSE {
    background-color: var(--orange);
  }

  .WRONG {
    background-color: var(--dark);
  }
</style>
