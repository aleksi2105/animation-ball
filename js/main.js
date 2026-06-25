const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const statusText = document.getElementById('statusText');

let x = 50;
let y = 50;
let dx = 3;
let dy = 2.5;
let size = 60;
let isPaused = false;
let animationId = null;
let ballImage = new Image();

ballImage.src = 'css/myach.png';

function drawBall(posX, posY) {
  ctx.clearRect(0, 0, 400, 400);
  ctx.drawImage(ballImage, posX - size / 2, posY - size / 2, size, size);
}

function animate() {
  if (!isPaused) {
    x += dx;
    y += dy;

    if (x > 400 - size / 2 || x < size / 2) dx = -dx;
    if (y > 400 - size / 2 || y < size / 2) dy = -dy;
  }

  drawBall(x, y);
  animationId = requestAnimationFrame(animate);
}

function updateUI() {
  if (isPaused) {
    pauseBtn.textContent = '▶ Играть';
    pauseBtn.classList.add('paused');
    statusText.textContent = '⏸ Пауза';
  } else {
    pauseBtn.textContent = '⏸ Пауза';
    pauseBtn.classList.remove('paused');
    statusText.textContent = '▶ Играет';
  }
}

function togglePause() {
  isPaused = !isPaused;
  updateUI();
}

function resetAnimation() {
  x = 50;
  y = 50;
  dx = 3;
  dy = 2.5;

  if (isPaused) {
    isPaused = false;
    updateUI();
  }

  drawBall(x, y);
}

drawBall(x, y);
animate();

pauseBtn.addEventListener('click', togglePause);
resetBtn.addEventListener('click', resetAnimation);