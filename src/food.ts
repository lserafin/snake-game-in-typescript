import { TILE_SIZE } from './game';
import imgUrl from './images/apple.png';

export class Food {
  x: number = 0;
  y: number = 0;
  background = new Image();

  constructor() {
    this.randomPosition();
    this.background.src = imgUrl;
  }

  randomPosition() {
    this.x = Math.floor(Math.random() * TILE_SIZE);
    this.y = Math.floor(Math.random() * TILE_SIZE);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.background, this.x * TILE_SIZE, this.y * TILE_SIZE);
    //ctx.fillStyle = '#5DC2AF'; /* Turquoise food */
    //ctx.fillRect(this.x * TILE_SIZE, this.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}
