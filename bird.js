class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 64;
    this.velocity = 0; 
    this.width = BIRD_WIDTH;
    this.height = BIRD_HEIGHT;
    this.lift = LIFT;
    this.gravity = GRAVITY;
  }

  up() {
    this.velocity = this.lift;
  }

  show() {
    fill(255, 255, 0);
    ellipse(this.x, this.y, this.width, this.height);
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    // Check if bird is on the bottom of window
    if (this.y > height - (this.height / 2)) {
      this.y = height - (this.height / 2);
      this.velocity = 0;
    }

    // Check if bird is on the top of window
    if (this.y < (this.height / 2)) {
      this.y = (this.height / 2);
      this.velocity = 0;
    }
  }
}