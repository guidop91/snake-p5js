
/**
 * Object constructor for snake that the player moves
 */
class Snake {
  constructor() {
    this.span = 0;
    this.tail = [];
    this.xPos = 0;
    this.xSpeed = 1;
    this.yPos = 20;
    this.ySpeed = 0;
    this.headSize = 20;
  }

  /**
   * Update position of each link of the snake with passing time. 
   * If it goes out of the screen it returns on the opposite side
   * @returns undefined
   */
  updatePos() {
    if (this.tail.length === this.span) {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.span - 1] = createVector(this.xPos, this.yPos);
    this.death();

    this.xPos += this.xSpeed * scl;
    this.yPos += this.ySpeed * scl;

    // Appear on the opposite side
    if (this.xPos > width) {
      this.xPos = 0 - this.headSize;
    } else if (this.xPos < 0 - this.headSize) {
      this.xPos = width;
    } else if (this.yPos > height) {
      this.yPos = 0 - this.headSize;
    } else if (this.yPos < 0 - this.headSize) {
      this.yPos = height;
    }
  }

  /**
   * Draw the snake to the cavas
   * @returns undefined
   */
  show() {
    fill(81, 161, 23);
    for (let i = 0; i < this.span; i++) {
      ellipse(this.tail[i].x, this.tail[i].y, scl);
    }
    ellipse(this.xPos + this.xSpeed*scl/2, this.yPos + this.ySpeed*scl/2, this.headSize);
  }

  /**
   * Helper method to set the speed (direction) of the snake
   * @param {number} xVal - horizontal value
   * @param {number} yVal - vertical value
   * @returns undefined
   */
  setSpeed(xVal, yVal) {
    this.xSpeed = xVal;
    this.ySpeed = yVal;
  }

  /**
   * Determine if snake has eaten the food particle, and update necessary states
   * 
   * @param {P5Vector} food - food vector
   * @returns undefined
   * 
   */
  eat(food) {
    const separation = dist(this.xPos, this.yPos, food.x, food.y);
    if (separation < scl) {
      setFoodLocation();
      this.span++;
    }
  }

  /**
   * Determines if snake runs into one of its links
   * @returns {boolean} true when conditions are met
   */
  death() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      const link = this.tail[i];
      const separation = dist(link.x, link.y, this.xPos, this.yPos);
      if (separation < 1) {
        console.log('I am death');
        return true;
      }
    }
    return false;
  }
}
