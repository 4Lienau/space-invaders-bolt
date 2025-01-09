export class Projectile {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
    this.width = 4;
    this.height = 8;
    this.velocity = {
      y: -7
    };
  }

  draw(ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.y += this.velocity.y;
  }
}
