class Game {
  // code to be added
  constructor() {
    // holds the div element #game-intro
    this.startScreen = document.getElementById("game-intro");
    // holds the div element #game-screen
    this.gameScreen = document.getElementById("game-screen");
    // holds the div element #game-end
    this.gameEndScreen = document.getElementById("game-end");
    // will be used to save the instance of the Player class
    this.player = new Player(
      this.gameScreen,
      200,
      500,
      100,
      150,
      "/images/car.png"
    );
    // the height of the game screen in pixels
    this.height = 600;
    // the width of the game screen in pixels
    this.width = 500;
    // will be used to store the obstacle instances
    this.obstacles = [];

    // a score increases every time an obstacle is passed
    this.score = 0;
    this.scoreHTML = document.getElementById("score");
    // the number of remaining lives the player has
    this.lives = 3;
    this.livesHTML = document.getElementById("lives");

    // a flag used to track whether the game is over
    this.gameIsOver = false;
    // a variable used to store the id of the interval running the game loop
    this.gameIntervalId;
    // a number that indicated the interval in ms at which the game loop will execute
    this.gameLoopFrequency = Math.round(1000 / 60);

    //game audio controls
    this.music = new Audio();
    this.music.src = "./audio/music.mp3";
    this.music.volume = 0.05;
    this.music.loop = true;
  }

  //  -------- Methods --------
  start() {
    // sets the height and width of the game screen
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    // hides the start screen
    this.startScreen.style.display = "none";

    // shows the game screen
    this.gameScreen.style.display = "flex";

    this.music.play();

    // start the game loop
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  gameLoop() {
    // invokes the update() method
    this.update();

    // check if the gameIsOver flag is set tu true
    if (this.gameIsOver) {
      // interrupts the game interval by calling clearInterval while passing the gameIntervalId as an argument
      clearInterval(this.gameIntervalId);
    }
  }

  // this method is responsible for updating the game state during each loop iteration
  update() {
    this.player.move();

    if (Math.random() > 0.85 && this.obstacles.length < 1) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }

    // loop through the obstacles array, to check for collisions
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();

      //Check for player collisions
      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();

        this.lives--;
        this.livesHTML.innerText = this.lives;

        this.obstacles.splice(i, 1);
        i--;
      } else if (obstacle.top > this.height) {
        obstacle.element.remove();

        this.score++;
        this.scoreHTML.innerText = this.score;
        this.obstacles.splice(i, 1);
        i--;
      }
    }
    // If the lives are 0, end the game
    if (this.lives === 0) {
      this.endGame();
    }
  }

  endGame() {
    this.player.element.remove();
    this.obstacles.forEach((obs) => obs.element.remove());
    this.music.pause();
    this.music.currentTime = 0;

    this.gameIsOver = true;

    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "flex";
  }

  getPlayer() {
    return this.player;
  }
}
