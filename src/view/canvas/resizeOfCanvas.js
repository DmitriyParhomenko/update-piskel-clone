/* eslint-disable max-len */
import { index, sizes } from '../../components/features/resizeTool';

export default class ResizeOfCanvas {
  constructor() {
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');
    this.canvasBackground = document.querySelector('.canvas__background');
    this.header = document.querySelector('.header');
    this.main = document.querySelector('.main');
    this.framesWrapper = document.querySelector('.frames__wrapper');
    this.resizeButton = document.querySelector('.resize__button');
    this.resizeTimer = undefined;
    this.canvasBuffer = document.querySelector('.canvas__buffer');
  }

  resizeWithTimer() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.changeSize();
    }, 300);
  }

  changeSize() {
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');
    this.canvasBuffer = document.querySelector('.canvas__buffer');
    this.ctxBuffer = this.canvasBuffer.getContext('2d');
    this.canvasBackground = document.querySelector('.canvas__background');

    const windowHeight = window.innerHeight;
    const headerHeight = this.header.offsetHeight;

    let mainMarginTop = this.main.currentStyle || window.getComputedStyle(this.main);
    mainMarginTop = mainMarginTop.marginTop.slice(0, -2);

    let appropriateSize = windowHeight - headerHeight - mainMarginTop * 5;

    appropriateSize = Math.round(appropriateSize / sizes[index]) * sizes[index];

    const newCanvas = document.createElement('canvas');
    const contex = newCanvas.getContext('2d');
    newCanvas.width = `${appropriateSize}`;
    newCanvas.height = `${appropriateSize}`;
    const diff = (appropriateSize - this.canvas.width) / 2;
    contex.drawImage(this.canvas, diff, diff);

    const newCanvas2 = document.createElement('canvas');
    const contex2 = newCanvas2.getContext('2d');
    newCanvas2.width = `${appropriateSize}`;
    newCanvas2.height = `${appropriateSize}`;
    const diff2 = (appropriateSize - this.canvasBuffer.width) / 2;
    contex2.drawImage(this.canvasBuffer, diff2, diff2);

    this.canvas.width = `${appropriateSize}`;
    this.canvas.height = `${appropriateSize}`;

    this.canvasBuffer.width = `${appropriateSize}`;
    this.canvasBuffer.height = `${appropriateSize}`;

    this.canvasBackground.style.height = `${appropriateSize}px`;
    this.framesWrapper.style.height = `${appropriateSize}px`;

    this.ctx.drawImage(newCanvas, 0, 0);
    this.ctxBuffer.drawImage(newCanvas2, 0, 0);
  }

  init() {
    window.addEventListener('resize', this.resizeWithTimer.bind(this));

    this.resizeButton.addEventListener('click', this.changeSize.bind(this));
  }
}
