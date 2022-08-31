import { draw_grid, draw_asteroid } from "./drawing.js";

const canvas = document.getElementsByTagName("canvas")[0];
const context = canvas.getContext("2d");

draw_grid(context);
// asteroid shape
let segments = 24;
let shape = [];
for (let i = 0; i < segments; i++) {
  shape.push(Math.random() - 0.5);
}
let radius = 50;
let noise = 0.2;
// asteroid state
let x = context.canvas.width * Math.random();
let y = context.canvas.height * Math.random();
let angle = 0;
// asteroid movement
let x_speed = context.canvas.width * (Math.random() - 0.5);
let y_speed = context.canvas.height * (Math.random() - 0.5);
let rotation_speed = 2 * Math.PI * (Math.random() - 0.5);

function draw(ctx, guide) {
  if (guide) {
    draw_grid(ctx);
  }
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  draw_asteroid(ctx, radius, shape, {
    guide: guide,
    noise: noise,
  });
  ctx.restore();
}

function update(elapsed) {
  if (x - radius + elapsed * x_speed > context.canvas.width) {
    x = -radius;
  }
  if (x + radius + elapsed * x_speed < 0) {
    x = context.canvas.width + radius;
  }
  if (y - radius + elapsed * y_speed > context.canvas.height) {
    y = -radius;
  }
  if (y + radius + elapsed * y_speed < 0) {
    y = context.canvas.height + radius;
  }
  x += elapsed * x_speed;
  y += elapsed * y_speed;
  angle = (angle + elapsed * rotation_speed) % (2 * Math.PI);
}

var previous, elapsed;
function frame(timestamp) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  if (!previous) previous = timestamp;
  elapsed = timestamp - previous;
  update(elapsed / 1000);
  draw(context, true);
  previous = timestamp;
  window.requestAnimationFrame(frame);
}
window.requestAnimationFrame(frame);
