// All active birds (not yet collided with pipe)
let activeBirds = [];
// All birds for any given population
let allBirds = [];

let pipes = [];
let counter = 0;

// Interface
let speedSlider;
let speedSpan;
let highScoreSpan;
let activeBirdsSpan;
let genSpan;
let allTimeHighScoreSpan;

// All time high score
let highScore = 0;
let gen = 0;

// Training or just showing the current best
let runBest = false;
let runBestButton;

let populationInput;
let mutationRateInput;
let restartButton;

function setup() {
  let canvas = createCanvas(WIDTH, HEIGHT);
  canvas.parent('canvascontainer');

  // Access the interface
  speedSlider = select('#speedSlider');
  speedSpan = select('#speed');
  highScoreSpan = select('#hs');
  allTimeHighScoreSpan = select('#ahs');
  activeBirdsSpan = select('#activeBirds');
  genSpan = select('#gen');
  runBestButton = select('#best');
  runBestButton.mousePressed(toggleState);

  populationInput = select('#population');
  mutationRateInput = select('#mutation');
  restartButton = select('#restart');
  restartButton.mousePressed(restart);

  // Creation of population
  for (let i = 0; i < POPULATION_SIZE; i++) {
    let bird = new Bird();
    activeBirds[i] = bird;
    allBirds[i] = bird;
  }
  activeBirdsSpan.html(activeBirds.length);
}

function toggleState() {
  runBest = !runBest;
  // Show the best bird
  if (runBest) {
    resetGame();
    runBestButton.html('Continue training');
    activeBirdsSpan.html(1);
    // Show training
  } else {
    nextGeneration();
    runBestButton.html('Run all time best');
    activeBirdsSpan.html(activeBirds.length);
  }
}

function restart() {
  if (!populationInput.value()) {
    populationInput.value(POPULATION_SIZE);
  }
  if (!mutationRateInput.value()) {
    mutationRateInput.value(MUTATION_RATE);
  }
  POPULATION_SIZE = parseInt(populationInput.value());
  MUTATION_RATE = parseFloat(mutationRateInput.value());

  bestBird = null;
  activeBirds = [];
  allBirds = [];
  runBest = false;
  highScore = 0;
  gen = 0;
  genSpan.html(gen);
  highScoreSpan.html(highScore);
  allTimeHighScoreSpan.html(highScore);
  for (let i = 0; i < POPULATION_SIZE; i++) {
    let bird = new Bird();
    activeBirds[i] = bird;
    allBirds[i] = bird;
  }
  activeBirdsSpan.html(activeBirds.length);
  counter = 0;
  pipes = [];
}



function draw() {
  background(135, 206, 250);

  let cycles = speedSlider.value();
  speedSpan.html(cycles);

  for (let n = 0; n < cycles; n++) {
    // Update all the pipes
    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }
    // Update the best bird
    if (runBest) {
      bestBird.think(pipes);
      bestBird.update();
      for (let j = 0; j < pipes.length; j++) {
        if (pipes[j].hits(bestBird)) {
          resetGame();
          break;
        }
      }
      if (bestBird.bottomTop()) {
        resetGame();
      }
    } else { // Update the population which is training
      for (let i = activeBirds.length - 1; i >= 0; i--) {
        let bird = activeBirds[i];
        bird.think(pipes);
        bird.update();

        // Check if birds hit the pipes
        for (let j = 0; j < pipes.length; j++) {
          if (pipes[j].hits(activeBirds[i])) {
            activeBirds.splice(i, 1);
            activeBirdsSpan.html(activeBirds.length);
            break;
          }
        }
        if (bird.bottomTop()) {
          activeBirds.splice(i, 1);
        }

      }
    }

    // Add a new pipe every n frames
    if (counter % FRAMES_PER_PIPE == 0) {
      pipes.push(new Pipe());
    }
    counter++;
  }

  let tempHighScore = 0;

  // Calculate current score of the best bird
  if (!runBest) {
    let tempBestBird = null;
    for (let i = 0; i < activeBirds.length; i++) {
      let s = activeBirds[i].score;
      if (s > tempHighScore) {
        tempHighScore = s;
        tempBestBird = activeBirds[i];
      }
    }
    if (tempHighScore > highScore) {
      highScore = tempHighScore;
      bestBird = tempBestBird;
    }
  } else { // Calculate highest score of current population training
    tempHighScore = bestBird.score;
    if (tempHighScore > highScore) {
      highScore = tempHighScore;
    }
  }

  // Update the interface
  highScoreSpan.html(tempHighScore);
  allTimeHighScoreSpan.html(highScore);

  // Draw pipes
  for (let i = 0; i < pipes.length; i++) {
    pipes[i].show();
  }

  // Draw best bird
  if (runBest) {
    bestBird.show();
  } else { // Draw population training
    for (let i = 0; i < activeBirds.length; i++) {
      activeBirds[i].show();
    }
    if (activeBirds.length == 0) {
      nextGeneration();
    }
  }
}