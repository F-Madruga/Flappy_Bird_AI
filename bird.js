class Bird {
  constructor() {
    this.width = BIRD_WIDTH;
    this.height = BIRD_HEIGHT;

    this.y = height / 2;
    this.x = 64;

    this.velocity = 0; 
    this.lift = LIFT;
    this.gravity = GRAVITY;

    this.brain = new NeuralNetwork(4, 4, 1); // inputs, hidden nodes, outputs
  }

  up() {
    this.velocity = this.lift;
  }

  show() {
    fill(255, 255, 0);
    ellipse(this.x, this.y, this.width, this.height);
  }

  think(pipes) {

    let closestPipe = null;
    let closestPipeDistance = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let distance = pipes[i].x - this.x;
      if (distance < closestPipeDistance && distance > 0) {
        closestPipe = pipes[i];
        closestPipeDistance = distance;
      }
    }

    let inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = closestPipe.topHeight / height;
    inputs[2] = closestPipe.bottomHeight / height;
    inputs[3] = closestPipe.x / width;
    
    let output = this.brain.predict(inputs);
    if (output[0] > 0.5) {
      this.up();
    }
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