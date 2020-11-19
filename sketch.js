let snake;
let scl;
let food;

/**
 * P5 method that defines the initial environment properties for 
 * the program. It is called first
 * @returns undefined
 */
function setup() {
  createCanvas(900, 600);
  snake = new Snake();
  scl = 15;
  frameRate(10);
  setFoodLocation();
}

/**
 * P5 method that continuosly executes the code contained inside. Called
 * right after setup()
 * @returns undefined
 */
function draw() {
  background(51);
  snake.updatePos();
  if (snake.death()) {
    snake = new Snake();
  }
  snake.show();

  snake.eat(food);

  fill(255, 0, 100);
  square(food.x, food.y, scl);
}

/**
 * Set the position in the board for the food
 * @returns null
 */
function setFoodLocation() {
  const colQty = floor(width / scl);
  const rowQty = floor(height / scl);
  food = createVector(floor(random(colQty)), floor(random(rowQty)));
  food.mult(scl);
}

/**
 * Function invoked whenever a key is pressed. Controls the movements of the snake.
 * @returns null
 */
function keyPressed() {
  if (keyCode === LEFT_ARROW && snake.xSpeed !== 1) {
    snake.setSpeed(-1, 0);
  } else if (keyCode === RIGHT_ARROW && snake.xSpeed !== -1) {
    snake.setSpeed(1, 0);
  } else if (keyCode === DOWN_ARROW && snake.ySpeed !== -1) {
    snake.setSpeed(0, 1);
  } else if (keyCode === UP_ARROW && snake.ySpeed !== 1) {
    snake.setSpeed(0, -1);
  }
}
