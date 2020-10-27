const PIPE_WIDTH = 50;
const PIPE_SPACING = 130;
const PIPE_SPEED = 3;

class Pipe {
  constructor() {
    this.topHeight = random(height / 6, (3 / 4) * height);
    this.bottomHeight = height - this.topHeight - PIPE_SPACING;
    this.x = width;
    this.highlight = false;
  }
  

  hits(bird) {
    if (bird.y < this.topHeight || bird.y > height - this.bottomHeight) {
      if (bird.x > this.x && bird.x < this.x + PIPE_WIDTH) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  }

  show() {
    fill(0, 204, 0);
    if (this.highlight) {
      fill(255, 0, 0);
    }
    rect(this.x, 0, PIPE_WIDTH, this.topHeight);
    rect(this.x, height - this.bottomHeight, PIPE_WIDTH, this.bottomHeight);
  }

  update() {
    this.x -= PIPE_SPEED;
  }

  offScreen() {
    return this.x < -PIPE_WIDTH;
  }
}