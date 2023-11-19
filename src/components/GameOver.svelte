<script>
  import { wordList } from "../store.js";
  import {
    GAME_WORD,
    colors,
    gameInfo,
    guess,
    createGrid,
    board,
    gameOver,
  } from "../store.js";
  import Board from "./Board.svelte";

  const copyToClip = async (text) => {
    // Copy the text inside the text field
    try {
      await navigator.clipboard.writeText(text);
      console.log("Content copied to clipboard");

      // Alert the copied text
      // alert("Copied the text: " + text);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const playAgain = () => {
    console.log("play again");
    const word =
      wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
    GAME_WORD.set(word);
    gameInfo.set({ attempt: 0, char: 0 });
    guess.set("");
    colors.set(createGrid());
    board.set(createGrid());
    gameOver.set(false);

    console.log($GAME_WORD);
  };

  const emoji = ["🟩", "🟥", "⚪"];

  const shareBoard = () => {
    console.log("share board");
    // get the values of the charts
    let box = [];

    let { attempt, char } = $gameInfo;
    let prevAttempt = $gameInfo.attempt - 1;

    for (let j = prevAttempt; prevAttempt >= 0; prevAttempt--) {
      for (let i = 0; i < 5; i++) {
        if (
          $GAME_WORD[i].toUpperCase() == $board[prevAttempt][i].toUpperCase()
        ) {
          box.push(emoji[0]);
        } else if (
          $GAME_WORD
            .toUpperCase()
            .includes($board[prevAttempt][i].toUpperCase())
        ) {
          box.push(emoji[1]);
        } else box.push(emoji[2]);
      }
    }

    // write mess
    let mex = "The correct word was: " + $GAME_WORD + "\n";
    mex += "You guessed: " + $guess + "\n";

    console.log(box);

    // write the board
    for (let i = 0; i < box.length; i++) {
      if (i % 5 == 0) mex += "\n";
      mex += box[box.length - i - 1];
    }

    console.log(mex);

    copyToClip(mex);
  };
</script>

<div class="container fail_cont">
  <div class="board">
    <Board />
  </div>
  <div class="center">
    <h3>Correct guess: <strong>{$GAME_WORD}</strong></h3>
    <h3>You guessed: <strong>{$guess}</strong></h3>

    <div class="center flexed">
      <button class="share tooltip" type="button" on:click={shareBoard}
        ><span class="tooltiptext" id="myTooltip">Copy to clipboard</span>
        Share
      </button>
      <button class="retry" type="button" on:click={playAgain}
        >Play Again</button
      >
    </div>
  </div>
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
    border-radius: 3px;
    color: white;
    margin-top: 20px;
    padding: 20px 50px;
    cursor: pointer;
    border: none;
  }

  .container {

    padding: 10px 15vw;
    display: grid;
    align-items: center;

    gap: 20px; 
  }

  .board {
    grid-column-start: 1;
    grid-column-end: 2;
  }

  .center {
    grid-column: 3;
    width: fit-content;
  }

  .flexed {
    display: flex;
    justify-content: space-between;
  }

  .share {
    flex: 0.5;
    background-color: var(--green);
    font-size: large;
    font-weight: bolder;
    margin: 2px;
  }

  .retry {
    background-color: var(--blue);
    flex: 0.5;
    margin: 2px;
    font-size: large;
    font-weight: bolder;
  }

  .tooltip {
    position: relative;
    display: inline-block;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 140px;
    background-color: #ffffffcc;
    color: #000000cc;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 150%;
    left: 50%;
    margin-left: -75px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }

  @media screen and (max-width: 700px) {
    .container {
      gap: 5px;
    }

    .fail_cont {
      font-size: 10px;
      border-radius: 5px;
    }

    .flexed > button {
      color: white;
      padding: 10px;
    }
  }

  @media screen and (max-width: 600px) {
    .container {
      gap: none; 
    }
    
    .fail_cont {
      font-size: 10px;
      border-radius: 5px;
    }

    .flexed {
      flex-direction: column;
    }

    .flexed > button {
      color: white;
      margin-top: 0;
      padding: 10px;
    }

    .center > h3 {
      display: none;
    }
  }
</style>
