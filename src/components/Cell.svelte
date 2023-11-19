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
    font-size: 33px;
    border-radius: 5px;
    transition: background-color 0.6s;
  }

  @media screen and (max-height: 500px) {
    .cell {
      width: 40px;
      height: 40px;
      margin: 3px;
      font-size: 30px;
      border-radius: 5px;
    }
  }

  .CORRECT {
    background-color: var(--green);
    color: var(--whish);
  }

  .CLOSE {
    background-color: var(--blue);
    color: var(--whish);
  }

  .WRONG {
    background-color: var(--dark);
    color: var(--whish);  
  }
</style>
