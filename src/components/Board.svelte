<script>
  import { board } from "../store.js";
  import Cell from "./Cell.svelte";
</script>

<div class="game-board">
  {#each $board as column, y}
    <div class="row">
      {#each column as row, x}
        <Cell {y} {x} />
      {/each}
    </div>
  {/each}
</div>

<style>
  .row {
    display: flex;
  }
</style>
