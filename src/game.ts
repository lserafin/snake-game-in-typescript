import './style.css';

import { Snake } from './snake';
import { Food } from './food';

const GAME_SPEED = 150; // in milliseconds, smaller values will make the game faster

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
let score = 0;

export const TILE_SIZE = 20;
//const TILE_COUNT = canvas.width / TILE_SIZE;
let isGameStarted = false;
let gameOver = false;

const snake = new Snake();
const food = new Food();

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (snake.ySpeed === 0) {
        snake.xSpeed = 0;
        snake.ySpeed = -1;
      }
      break;
    case 'ArrowDown':
      if (snake.ySpeed === 0) {
        snake.xSpeed = 0;
        snake.ySpeed = 1;
      }
      break;
    case 'ArrowLeft':
      if (snake.xSpeed === 0) {
        snake.xSpeed = -1;
        snake.ySpeed = 0;
      }
      break;
    case 'ArrowRight':
      if (snake.xSpeed === 0) {
        snake.xSpeed = 1;
        snake.ySpeed = 0;
      }
      break;
    case ' ':
      if (!isGameStarted) {
        const directions = [
          { x: 1, y: 0 },
          { x: -1, y: 0 },
          { x: 0, y: 1 },
          { x: 0, y: -1 }
        ];
        const randomDirection =
          directions[Math.floor(Math.random() * directions.length)];
        snake.xSpeed = randomDirection.x;
        snake.ySpeed = randomDirection.y;
        isGameStarted = true;
      }
      if (gameOver) {
        snake.resetSnake();
        food.randomPosition();
        isGameStarted = false;
        score = 0;
        gameOver = false;
      }
      break;
  }
});

function update() {
  if (!isGameStarted) {
    return;
  }

  snake.move();

  // Check for wall collision
  if (snake.hasCollidedWithWall() || snake.hasCollidedWithSelf()) {
    resetGame();
    return;
  }

  // Check for food collision
  if (snake.segments[0].x === food.x && snake.segments[0].y === food.y) {
    snake.grow();
    food.randomPosition();
    score = score + 10;
  }
}

function draw() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  snake.draw(ctx);
  food.draw(ctx);

  // Draw the score:
  ctx.fillStyle = 'white';
  ctx.font = '1rem "Press Start 2P"';
  ctx.textAlign = 'left';
  ctx.fillText('Score: ' + score, 10, 30); // Display the score near the top-left corner of the canvas

  if (gameOver) {
    ctx.fillStyle = 'red';
    ctx.font = '1rem "Press Start 2P"';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
    ctx.fillText(
      `Final Score: ${score}`,
      canvas.width / 2,
      canvas.height / 2 + 40
    );
    ctx.fillText(
      `Hit Space to play again`,
      canvas.width / 2,
      canvas.height / 2 + 60
    );
  }
}

function resetGame() {
  // Instead of directly resetting, we set gameOver to true
  gameOver = true;
  /*
  snake.resetSnake();
  food.randomPosition();
  isGameStarted = false;
  score = 0;*/
}

setInterval(() => {
  update();
  draw();
}, GAME_SPEED);
