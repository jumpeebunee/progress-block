import './options.css'
import { progressOptions } from "../progress/progress";

export default function init() {
  const lengthInput = document.querySelector('#lengthInput');
  const startButton = document.querySelector('#startButton');
  const hideButton = document.querySelector('#hideButton');
  
  startButton.addEventListener('click', progressOptions.startProgress);
  hideButton.addEventListener('click', progressOptions.hideProgress);
  
  let t;
  
  lengthInput.addEventListener('input', () => {
    clearTimeout(t);
    if (lengthInput.value > 100) {
      lengthInput.value = 100;
    } else if (lengthInput.value < 0) {
      lengthInput.value = 0;
    } 
    t = setTimeout(() => {
      progressOptions.drawCircle(lengthInput.value);
    }, 400);
  });

  progressOptions.drawCircle(lengthInput.value);
}