class Player {
  constructor(gameScreen, left, top, width, height, imageURL) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0; // used to specify the horizontal movement direction ("0" = not moving, "1" = moving horizontally to the right, "-1" = moving horizontally to the left)
    this.directionY = 0; // used to specify the vertical movement direction ("0" = not moving, "1" = moving vertically down, "-1" = moving vertically up)
    this.element = document.createElement("img"); // creates a image element

    this.element.src = imageURL; // the image element representing the car
    this.element.style.position = "absolute"; // set the exact position of the player
    // sets the default element's property values
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;

    this.gameScreen.appendChild(this.element); // appends the newly created element to the gameScreen
  }

  //  -------- Methods --------
  // updates the player's car position based on the directionX and directionY
  move() {
    // adds the values of directionX and directionY to the player's left and top properties
    this.left += this.directionX;
    this.top += this.directionY;

    // ensures the player's car stays within the boundaries of the game screen
    if (this.left < 10) this.left = 10;
    if (this.top < 10) this.top = 10;

    if (this.left > this.gameScreen.offsetWidth - this.width - 10)
      this.left = this.gameScreen.offsetWidth - this.width - 10;

    if (this.top > this.gameScreen.offsetHeight - this.height - 10)
      this.top = this.gameScreen.offsetHeight - this.height - 10;

    // updates the position
    this.updatePosition();
  }

  // updates the position of the player's car element on the screen
  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  didCollide(obstacle) {
    // check if player is completly to the left of the obstacle
    if (this.left + this.width < obstacle.left) return false;

    // check if player is completly to the right of the obstacle
    if (this.left > obstacle.left + obstacle.width) return false;

    // check if player is completly above the obstacle
    if (this.top > obstacle.top + obstacle.height) return false;

    // check if player is completly below the obstacle
    if (this.top > obstacle.top + obstacle.height) return false;

    // if nothing above is true, then there is a collision
    return true;
  }
}
