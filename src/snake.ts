import { SnakeSegment } from './snakesegment';
import { TILE_SIZE } from './game';
import imgUrl from './images/snacke_sprite_64_48.png';

export class Snake {
  segments: SnakeSegment[] = [new SnakeSegment(10, 10)];
  xSpeed = 0;
  ySpeed = 0;

  background = new Image();

  constructor() {
    this.background.src = imgUrl;
  }

  move() {
    const head = this.segments[0];
    const newHead = new SnakeSegment(
      head.x + this.xSpeed,
      head.y + this.ySpeed
    );
    this.segments.unshift(newHead);
    this.segments.pop();
  }

  resetSnake() {
    this.segments = [new SnakeSegment(10, 10)];
    this.xSpeed = 0;
    this.ySpeed = 0;
  }

  grow() {
    const head = this.segments[0];
    const newHead = new SnakeSegment(
      head.x + this.xSpeed,
      head.y + this.ySpeed
    );
    this.segments.unshift(newHead);
  }

  hasCollidedWithWall(): boolean {
    const head = this.segments[0];
    return (
      head.x < 0 || head.y < 0 || head.x >= TILE_SIZE || head.y >= TILE_SIZE
    );
  }

  draw(ctx: CanvasRenderingContext2D) {
    //ctx.fillStyle = '#FF6568'; /* Red snake */
    for (let segment of this.segments) {
      let posx = segment.x * TILE_SIZE;
      let posy = segment.x * TILE_SIZE;
      //posx = 0;
      // posy = 0;
      ctx.drawImage(
        this.background,
        0, //Left cut
        0, //Top cut
        16,
        16,
        posx,
        posy,
        16,
        16
      );
      /*
      ctx.fillRect(
        segment.x * TILE_SIZE,
        segment.y * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE
      );*/
    }
  }
}
