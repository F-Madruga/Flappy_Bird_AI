class Pipe {
  constructor() {
    let centery = random(PIPE_SPACING, height - PIPE_SPACING);

    this.top = centery - PIPE_SPACING / 2;
    this.bottom = height - (centery + PIPE_SPACING / 2);
    
    this.x = width;

    this.w = PIPE_WIDTH;

    this.speed = PIPE_SPEED;

    this.highlight = false;
  }

  // hits(bird) {
  //   if ((bird.y - bird.r) < this.top || (bird.y + bird.r) > (height - this.bottom)) {
  //     if (bird.x > this.x && bird.x < this.x + this.w) {
  //       this.highlight = true;
  //       return true;
  //     }
  //   }
  //   this.highlight = false;
  //   return false;
  // }

  hits(bird) {
    if (bird.y - bird.r < this.top || bird.y + bird.r > height - this.bottom) {
      if (bird.x + bird.r > this.x && bird.x - bird.r < this.x + this.w) {
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
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
}