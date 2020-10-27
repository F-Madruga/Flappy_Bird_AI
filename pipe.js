class Pipe {
  constructor() {
    this.x = width;
    this.topHeight = random(height / 6, (3 / 4) * height);
    this.bottomHeight = height - this.topHeight - PIPE_SPACING;
    this.width = PIPE_WIDTH;
    this.speed = PIPE_SPEED;
    this.highlight = false;
  }
  

  hits(bird) {
    if (bird.y - (bird.height / 2) < this.topHeight || bird.y + (bird.height / 2) > height - this.bottomHeight) {
      if (bird.x + (bird.width / 2) > this.x && bird.x - (bird.width / 2) < this.x + this.width) {
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
    rect(this.x, 0, this.width, this.topHeight);
    rect(this.x, height - this.bottomHeight, this.width, this.bottomHeight);
  }

  update() {
    this.x -= this.speed;
  }

  offScreen() {
    return this.x < -this.width;
  }
}