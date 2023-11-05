<script>
  import Key from "./Key.svelte";
  import {
    board,
    gameInfo,
    colors,
    GAME_WORD,
    guess,
    gameOver,
    wordList,
  } from "../store.js";

  const row1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  const row2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  const row3 = ["ENTER", "z", "x", "c", "v", "b", "n", "m", "DEL"];
  const admissible_keys = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "Enter",
    "Backspace",
  ];

  const handleDel = () => {
    if ($gameInfo.char === 0) return;

    gameInfo.update((prev) => {
      return {
        char: prev.char - 1,
        attempt: prev.attempt,
      };
    });

    board.update((prevBoard) => {
      const newBoard = prevBoard;
      newBoard[$gameInfo.attempt][$gameInfo.char] = "";
      return newBoard;
    });
  };

  const handleEnter = () => {
    let { attempt, char } = $gameInfo;

    if (char !== 5) return;

    gameInfo.set({ attempt: attempt + 1, char: 0 });

    const prevAttempt = $gameInfo.attempt - 1;
    const newColorsBoard = $colors;

    const duplicateChars = new Set();

    for (let i = 0; i < 5; i++) {
      let char = $board[prevAttempt][i].toUpperCase();
      guess.update((prevChars) => prevChars + char);

      if ($GAME_WORD[i].toUpperCase() === char)
        newColorsBoard[prevAttempt][i] = "CORRECT";
      else if ($GAME_WORD.toUpperCase().includes(char)) {
        if (!duplicateChars.has(char)) {
          newColorsBoard[prevAttempt][i] = "CLOSE";
          duplicateChars.add(char);
        }
      } else newColorsBoard[prevAttempt][i] = "WRONG";
    }

    colors.set(newColorsBoard);

    //check game over
    if ($guess == $GAME_WORD.toUpperCase() || prevAttempt == 5)
      gameOver.set(true);
    else guess.set("");
  };

  // user keyboard events
  let keyEvent = "";

  function handleKeyPress(event) {
    keyEvent = event.key;
    if (!admissible_keys.includes(keyEvent)) return;

    if (keyEvent == "Backspace") handleDel();
    else if (keyEvent == "Enter") handleEnter();
    else {
      keyEvent = keyEvent.toUpperCase();
      let { attempt, char } = $gameInfo;

      if (char > 4) return;

      board.update((prevBoard) => {
        const newBoard = prevBoard;
        newBoard[attempt][char++] = keyEvent;
        return newBoard;
      });

      gameInfo.set({ attempt, char });
    }
  }

  // handle keyboard user input
  const keyPress = (key = "") => {
    if (key == "DEL") handleDel();
    else if (key == "ENTER") handleEnter();
    else {
      let { attempt, char } = $gameInfo;

      if (char > 4) return;

      board.update((prevBoard) => {
        const newBoard = prevBoard;
        newBoard[attempt][char++] = key;
        return newBoard;
      });

      gameInfo.set({ attempt, char });
    }
  };

  //window.addEventListener("keydown", handleKeyPress);
</script>

<div class="keyboard">
  <div class="row">
    {#each row1 as char}
      <Key {char} {keyPress} />
    {/each}
  </div>

  <div class="row">
    {#each row2 as char}
      <Key {char} {keyPress} />
    {/each}
  </div>

  <div class="row">
    {#each row3 as char}
      <Key {char} {keyPress} />
    {/each}
  </div>
</div>

<svelte:window on:keydown|preventDefault={handleKeyPress} />

<style>
  .keyboard {
    position: fixed;
    width: fit-content;

    bottom: 20px;
    left: 50%;
    transform: translate(-50%, 0%);

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .row {
    display: flex;
    align-items: center;
    justify-self: center;
  }
</style>
