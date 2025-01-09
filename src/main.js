import { Player } from './player.js';
import { Invader } from './invader.js';
import { Projectile } from './projectile.js';
import { createSoundEffects } from './sound.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.querySelector('#scoreEl');

canvas.width = 800;
canvas.height = 600;

let player;
let projectiles;
let invaders;
let score;
let animationId;
let spawnInterval;
const { shoot, explosion, move } = createSoundEffects();

function init() {
  player = new Player(canvas);
  projectiles = [];
  invaders = [];
  score = 0;
  scoreEl.innerHTML = score;
}

function animate() {
  animationId = requestAnimationFrame(animate);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  player.draw(ctx);

  projectiles.forEach((projectile, index) => {
    projectile.update();
    projectile.draw(ctx);

    if (projectile.y + projectile.height < 0) {
      projectiles.splice(index, 1);
    }
  });

  invaders.forEach((invader, invaderIndex) => {
    invader.update();
    invader.draw(ctx);

    if (invader.y + invader.height > canvas.height) {
      setTimeout(() => {
        cancelAnimationFrame(animationId);
        clearInterval(spawnInterval);
      }, 0);
    }

    projectiles.forEach((projectile, projectileIndex) => {
      if (
        projectile.y - projectile.height / 2 < invader.y + invader.height &&
        projectile.y + projectile.height / 2 > invader.y &&
        projectile.x + projectile.width / 2 > invader.x &&
        projectile.x - projectile.width / 2 < invader.x + invader.width
      ) {
        setTimeout(() => {
          invaders.splice(invaderIndex, 1);
          projectiles.splice(projectileIndex, 1);
          score += 100;
          scoreEl.innerHTML = score;
          explosion().play();
        }, 0);
      }
    });
  });
}

addEventListener('keydown', ({ key }) => {
  switch (key) {
    case 'ArrowLeft':
      player.velocity.x = -5;
      break;
    case 'ArrowRight':
      player.velocity.x = 5;
      break;
    case ' ':
      projectiles.push(
        new Projectile({
          x: player.x + player.width / 2,
          y: player.y
        })
      );
      shoot().play();
      break;
  }
});

addEventListener('keyup', ({ key }) => {
  if (key === 'ArrowLeft' && player.velocity.x < 0) {
    player.velocity.x = 0;
  } else if (key === 'ArrowRight' && player.velocity.x > 0) {
    player.velocity.x = 0;
  }
});

init();
animate();

spawnInterval = setInterval(() => {
  const x = Math.random() * (canvas.width - 30);
  invaders.push(new Invader({ x }));
  move().play();
}, 1000);
