window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let newGame;

  restartButton.addEventListener("click", () => {
    location.reload();
  });

  startButton.addEventListener("click", function () {
    startGame();
  });

  function startGame() {
    console.log("start game");

    newGame = new Game();
    newGame.start();

    // Handle Keyboard Input
    document.onkeydown = (event) => {
      const possibleKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
      // Check if the pressed key is in the possibleKeystrokes array
      if (possibleKeys.includes(event.key)) {
        event.preventDefault();
        // Update player's directionX and directionY based on the key pressed
        switch (event.key) {
          case "ArrowLeft":
            newGame.player.directionX = -1;
            break;
          case "ArrowRight":
            newGame.player.directionX = 1;
            break;
          case "ArrowUp":
            newGame.player.directionY = -1;
            break;
          case "ArrowDown":
            newGame.player.directionY = 1;
            break;
        }
      }
    };
  }
};
