const BIRD_WIDTH = 32;
const BIRD_HEIGHT = 32;
const GRAVITY = 0.6;
const LIFT = -10;

function Bird() {
  this.y = height / 2;
  this.x = 64;
  this.velocity = 0;

  this.up = () => {
    this.velocity = LIFT;
  }

  this.show = () => {
    fill(255);
    ellipse(this.x, this.y, BIRD_WIDTH, BIRD_HEIGHT);
  }

  this.update = () => {
    this.velocity += GRAVITY;
    this.y += this.velocity;

    // Check if bird is on the bottom of window
    if (this.y > height - (BIRD_HEIGHT / 2)) {
      this.y = height - (BIRD_HEIGHT / 2);
      this.velocity = 0;
    }

    // Check if bird is on the top of window
    if (this.y < (BIRD_HEIGHT / 2)) {
      this.y = (BIRD_HEIGHT / 2);
      this.velocity = 0;
    }
  }
}