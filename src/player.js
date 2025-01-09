export class Player {
  constructor(canvas) {
    this.width = 30;
    this.height = 30;
    this.x = canvas.width / 2 - this.width / 2;
    this.y = canvas.height - this.height - 10;
    this.velocity = {
      x: 0
    };
    this.canvas = canvas;
  }

  draw(ctx) {
    this.x += this.velocity.x;

    if (this.x < 0) {
      this.x = 0;
    } else if (this.x > this.canvas.width - this.width) {
      this.x = this.canvas.width - this.width;
    }

    ctx.fillStyle = '#00ff00';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
