const c = document.getElementById("root");
const ctx = c.getContext("2d");

document.addEventListener("DOMContentLoaded", function () {
  const levelContainer = document.getElementById("level-container");

 
  const numberOfLevels = 10;
  const currentLevel = 7; // level that I am

  for (let i = 1; i <= numberOfLevels; i++) {
    const levelNumber = document.createElement("p");
    levelNumber.textContent = i;
    levelNumber.classList.add("level-number");

    if (i === currentLevel) {
      levelNumber.classList.add("current-level");
    } else if (i <= currentLevel) {
      levelNumber.classList.add("current-level");
    }

    levelContainer.appendChild(levelNumber);
  }
});




const startAgain = document.getElementById("startAgain");
const nextLevel = document.getElementById("next-level");

startAgain.addEventListener("click", function () {
  location.reload();
});
nextLevel.addEventListener("click", function () {
  window.location.replace('/level8/level8.html');
});

var radius = 10;
var x = c.width / 2;
var y = c.height - radius;
var dx = 2;
var dy = -2;

let paddlex = c.width / 2;
let paddley = c.height - 10;
let paddleW = 90;
let paddleH = 12;

let rightMove = false;
let leftMove = false;

let brickRows = 3;
let brickColums = 5;

let brickWidth = 60;
let brickHeight = 20;

let brickPadding = 12;
let brickOfSetTop = 30;
let brickOfSetLeft = 100;

let score = 0;
let lives = 1;

let gameStarted = false;

let briks = [];
for (let i = 0; i < brickColums; i++) {
  briks[i] = [];
  for (let j = 0; j < brickRows; j++) {
    briks[i][j] = { x: 0, y: 0, drawBrik: true };
  }
}

function keyDownHandler(e) {
  if (e.keyCode === 37) {
    leftMove = true;
  } else if (e.keyCode === 39) {
    rightMove = true;
  } else if (e.keyCode === 32) {
    if (!gameStarted) {
      gameStarted = true;
      dx = 2;
    }
  }
}

function keyUpHandler(e) {
  if (e.keyCode === 37) {
    leftMove = false;
  } else if (e.keyCode === 39) {
    rightMove = false;
  }
}

function mouseMoverHanler(e) {
  var mouseRelativeX = e.clientX - c.offsetLeft;
  if (mouseRelativeX > 0 && mouseRelativeX < c.width) {
    paddlex = mouseRelativeX - paddleW / 2;
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoverHanler, false);

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "#0a66c2";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddlex, paddley, paddleW, paddleH);
  ctx.fillStyle = "#0a66c4";
  ctx.fill();
  ctx.closePath();
}

function drawBriks() {
  for (let i = 0; i < brickColums; i++) {
    for (let j = 0; j < brickRows; j++) {
      if (briks[i][j].drawBrik) {
        var bx = i * (brickWidth + brickPadding) + brickOfSetLeft;
        var by = j * (brickHeight + brickPadding) + brickOfSetTop;
        briks[i][j].x = bx;
        briks[i][j].y = by;

        ctx.rect(bx, by, brickWidth, brickHeight);
        ctx.fillStyle = "#0a66c2";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
function detectHits() {
  for (let i = 0; i < brickColums; i++) {
    for (let j = 0; j < brickRows; j++) {
      var brick = briks[i][j];
      if (briks[i][j].drawBrik) {
        if (
          x > brick.x &&
          x < brick.x + brickWidth &&
          y > brick.y &&
          y < brick.y + brickHeight
        ) {
          dy = -dy;
          brick.drawBrik = false;
          score++;
          if (score === brickColums * brickRows) {
            alert("Congratulations");
            document.getElementById("next-level").style.display = "block";
            Win()
            
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = "18px Arial";
  ctx.fillText("Score: " + score, 10, 20);
  ctx.fillStyle = "#0a66c2";
}

function drawlives() {
  ctx.font = "18px Arial";
  ctx.fillText("Lives: " + lives, c.width - 70, 20);
  ctx.fillStyle = "#0a66c2";
}

function draw() {
  ctx.clearRect(0, 0, c.width, c.height);
  drawPaddle();
  drawBall();
  drawBriks();
  detectHits();
  drawScore();
  drawlives();
  if (x + dx > c.width - radius || x + dx < radius) {
    dx = -dx;
  }

  if (y + dy < radius) {
    dy = -dy;
  } else {
    if (y + dy > c.height - radius) {
      if (x > paddlex && x < paddlex + paddleW) {
        dy = -dy;
      } else {
        lives--;
        if (lives < 1) {
          gameover();
          return;
        } else {
          x = c.width / 2;
          y = c.height - radius;
          dx = 2;
          dy = -2;

          paddlex = c.width / 2;
          paddley = c.height - 10;
        }
      }
    }
  }

  if (rightMove && paddlex + paddleW + 8 < c.width) {
    paddlex += 8;
  }

  if (leftMove && paddlex - 8 > 0) {
    paddlex -= 8;
  }

  x += dx;
  y += dy;
}

function gameover() {
  document.getElementById("GameOver").style.display = "block";
  document.getElementById("startAgain").style.display = "block";
  ctx.font = "38px Arial";
  ctx.fillText("Game Over: " + lives, c.width / 2, c.height / 2);
  ctx.fillStyle = "#0a66c2";
}
function Win() {
  document.getElementById("Win").style.display = "block";
  ctx.font = "38px Arial";
  ctx.fillText("Win: " + lives, c.width / 2, c.height / 2);
  ctx.fillStyle = "#0a66c2";
}


setInterval(draw, 9);
