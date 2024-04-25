import { writable } from "svelte/store";
import { word } from "./words"

export const createGrid = () => {
  const grid = [];

  for (let i = 0; i < 6; i++) {
    grid.push([]);
    for (let j = 0; j < 5; j++) {
      grid[i][j] = "";
    }
  }

  return grid;
};

export const gameInfo = writable({ char: 0, attempt: 0 });

export const gameOver = writable(false);
export const GAME_WORD = writable("HELLO");
export const guess = writable("");
export const colors = writable(createGrid());
export const board = writable(createGrid());
export const wordList = word