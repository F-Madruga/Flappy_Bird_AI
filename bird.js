function mutate(x) {
  if (random(1) < MUTATION_RATE) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}

class Bird {
  constructor(brain) {
    this.x = 64;
    this.y = height / 2;
    this.r = BIRD_RADIUS;

    this.gravity = GRAVITY;
    this.lift = LIFT;
    this.velocity = 0;


    if (brain instanceof NeuralNetwork) {
      this.brain = brain.copy();
      this.brain.mutate(mutate);
    } else {
      this.brain = new NeuralNetwork(5, 8, 2);
    }

    this.score = 0;
    this.fitness = 0;
  }

  copy() {
    return new Bird(this.brain);
  }

  show() {
    fill(255, 255, 0);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  think(pipes) {
    let closest = null;
    let record = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let diff = pipes[i].x - this.x;
      if (diff > 0 && diff < record) {
        record = diff;
        closest = pipes[i];
      }
    }

    if (closest != null) {
      let inputs = [];
      // x position of closest pipe
      inputs[0] = map(closest.x, this.x, width, 0, 1);
      // top of closest pipe opening
      inputs[1] = map(closest.top, 0, height, 0, 1);
      // bottom of closest pipe opening
      inputs[2] = map(closest.bottom, 0, height, 0, 1);
      // bird's y position
      inputs[3] = map(this.y, 0, height, 0, 1);
      // bird's y velocity
      inputs[4] = map(this.velocity, -5, 5, 0, 1);

      // Get the outputs from the network
      let action = this.brain.predict(inputs);
      // Decide to jump or not!
      if (action[1] > action[0]) {
        this.up();
      }
    }
  }

  up() {
    this.velocity += this.lift;
  }

  bottomTop() {
    return (this.y > height - this.r || this.y < this.r);
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    this.score++;
  }
}