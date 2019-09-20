import Canvas from './view/canvas/canvas';
import './view/canvas/style.css';
import './components/tools/picker-style.css';
import './components/frames/frames.css';


function startApp() {
  const canvas = new Canvas();
  canvas.init();
}

document.addEventListener('DOMContentLoaded', () => {
  startApp();
}, false);
