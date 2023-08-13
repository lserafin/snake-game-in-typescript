import { SnakeSegment } from './snakesegment';
import { TILE_SIZE } from './game';

export class Snake {
  segments: SnakeSegment[] = [new SnakeSegment(10, 10)];
  xSpeed = 0;
  ySpeed = 0;

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

  hasCollidedWithSelf(): boolean {
    const head = this.segments[0];
    for (let i = 1; i < this.segments.length; i++) {
      const segment = this.segments[i];
      if (head.x === segment.x && head.y === segment.y) {
        return true;
      }
    }
    return false;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#FF6568'; /* Red snake */
    for (let segment of this.segments) {
      ctx.fillRect(
        segment.x * TILE_SIZE,
        segment.y * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE
      );
    }
  }
}
