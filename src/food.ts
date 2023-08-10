import { TILE_SIZE } from './game';

export class Food {
  x: number = 0;
  y: number = 0;

  constructor() {
    this.randomPosition();
  }

  randomPosition() {
    this.x = Math.floor(Math.random() * TILE_SIZE);
    this.y = Math.floor(Math.random() * TILE_SIZE);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#5DC2AF'; /* Turquoise food */
    ctx.fillRect(this.x * TILE_SIZE, this.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}
