
import './progress.css';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const radius = 90;
let rotationAngle = 0;

let isRotating = false;
let isHide = false;
let animationFrameId;

let start = 0;
let end = 0;
let to;

const drawCircle = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = '#EFF3F6';
  ctx.lineWidth = 14;
  ctx.stroke();

  if (to === 'up' && start < end) {
    start += 1;
  } else if ( start > end){
    start -= 1;
  }

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, -Math.PI / 2, (-Math.PI / 2) + ((2 * Math.PI) * (start / 100)));
  ctx.strokeStyle = '#005BFF';
  ctx.lineWidth = 14;
  ctx.stroke();

  if (to === 'up') {
    if (start < end) {
      requestAnimationFrame(drawCircle);
    }
  } else if (to === 'down') {
    if (start > end) {
      requestAnimationFrame(drawCircle);
    }
  } else {
    cancelAnimationFrame(drawCircle);
  }
}

const moveProgress = () => {
  if (rotationAngle === 360) {
    rotationAngle = 0;
  } else {
    rotationAngle += 4;
  }
  canvas.style.transform = `rotate(${rotationAngle}deg)`;
  animationFrameId = requestAnimationFrame(moveProgress);
}

const startProgress = () => {
  if (!isRotating) {
    isRotating = true;
    startButton.classList.add('toggle-btn_active');
    moveProgress();
  } else {
    isRotating = false;
    startButton.classList.remove('toggle-btn_active');
    cancelAnimationFrame(animationFrameId);
  }
}

const hideProgress = () => {
  if (!isHide) {
    isHide = true;
    hideButton.classList.add('toggle-btn_active');
    canvas.classList.add('progress_hide');
  } else {
    isHide = false;
    hideButton.classList.remove('toggle-btn_active')
    canvas.classList.remove('progress_hide');
  }
}

const draw = (percentage) => {
  to = (end < percentage) ? 'up' : 'down';
  end = Math.floor(+percentage);
  drawCircle();
}

export const progressOptions = {
  drawCircle,
  startProgress,
  hideProgress,
  draw,
}