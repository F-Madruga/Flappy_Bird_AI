// Bird config
const BIRD_WIDTH = 32;
const BIRD_HEIGHT = 32;
const GRAVITY = 0.6;
const LIFT = -10;

// Pipes config
const PIPE_WIDTH = 50;
const PIPE_SPACING = 130;
const PIPE_SPEED = 3;
const FRAMES_PER_PIPE = 80;

var bird;
var pipes;

function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  pipes = [];
  pipes.push(new Pipe());
}

function draw() {
  background(135, 206, 250);

  // Draw the pipes, remove offscreen pipes and check if pipe hit the bird
  for (var i = pipes.length - 1; i >= 0 ; i--) {
    pipes[i].show();
    pipes[i].update();
    if (pipes[i].hits(bird)) {
      // Do something it pipes hit<
    }
    if (pipes[i].offScreen()) {
      pipes.splice(i, 1);
    }
  };

  // Draw the bird
  bird.think(pipes);
  bird.update();
  bird.show();

  // Add new pipe every n frames
  if (frameCount % FRAMES_PER_PIPE == 0) {
    pipes.push(new Pipe());
  }
}

function keyPressed() {
  if (key == ' ') {
    bird.up();
  }
}

function mouseClicked() {
  bird.up();
}