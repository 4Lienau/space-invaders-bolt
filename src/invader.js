
export class Invader {
  constructor({ x }) {
    this.width = 30;
    this.height = 30;
    this.x = x;
    this.y = -this.height;
    this.velocity = {
      x: 0,
      y: 1
    };
  }

  draw(ctx) {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height