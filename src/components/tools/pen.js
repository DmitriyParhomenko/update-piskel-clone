import ResizeTool from '../features/resizeTool';

export default class Pen {
  constructor() {
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');
    this.color = '#000';
    this.pixelSize = undefined;
    this.paint = false;
    this.prevDot = [];
    this.currDot = [];
    this.primaryColor = document.querySelector('#primary-color');
    this.secondaryColor = document.querySelector('#secondary-color');
    this.resizeTool = new ResizeTool();
    this.canvasBackground = document.querySelector('.canvas__background');
  }

  static canselDefaultRightClich(e) {
    e.preventDefault();
  }

  getRightCoordinate(x, y) {
    let startX = x;
    let startY = y;

    startX = Math.floor(startX / this.pixelSize) * this.pixelSize;
    startY = Math.floor(startY / this.pixelSize) * this.pixelSize;

    return [startX, startY];
  }

  drawPixel(x, y) {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(x, y, this.pixelSize, this.pixelSize);
  }

  bresenhamAlgorithm(x0, y0, x1, y1) {
    const firstPoint = this.getRightCoordinate(x0, y0);
    const secondPoint = this.getRightCoordinate(x1, y1);

    let newX0 = firstPoint[0];
    let newY0 = firstPoint[1];
    const newX1 = secondPoint[0];
    const newY1 = secondPoint[1];

    const dx = Math.abs(newX1 - newX0);
    const dy = Math.abs(newY1 - newY0);
    const sx = (newX0 < newX1) ? this.pixelSize : -this.pixelSize;
    const sy = (newY0 < newY1) ? this.pixelSize : -this.pixelSize;
    let err = dx - dy;

    while (true) {
      if ((newX0 === newX1) && (newY0 === y1)) break;
      const e2 = 2 * err;
      if (e2 > -dy) { err -= dy; newX0 += sx; }
      if (e2 < dx) { err += dx; newY0 += sy; }

      this.drawPixel(newX0, newY0);
    }
  }

  startDrawing(e) {
    e.preventDefault();

    this.canvas = document.querySelector('.canvas__item');

    this.pixelSize = this.resizeTool.getCurrentPixelSize();

    if (e.button === 0) {
      this.color = this.primaryColor.value;
    } else if (e.button === 2) {
      this.color = this.secondaryColor.value;
    }

    const x = e.pageX - this.canvas.parentElement.offsetLeft;
    const y = e.pageY - this.canvas.parentElement.offsetTop;

    this.paint = true;

    const firstPoint = this.getRightCoordinate(x, y);
    this.drawPixel(firstPoint[0], firstPoint[1]);

    this.prevDot = [...firstPoint];
  }

  stopDrawing() {
    this.paint = false;
  }

  draw(e) {
    if (this.paint) {
      const x = e.pageX - this.canvas.parentElement.offsetLeft;
      const y = e.pageY - this.canvas.parentElement.offsetTop;

      this.currDot = this.getRightCoordinate(x, y);

      this.bresenhamAlgorithm(...this.prevDot, ...this.currDot);

      this.prevDot = this.currDot;
    }
  }

  init() {
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');
    this.canvasBackground = document.querySelector('.canvas__background');

    this.canvasBackground.addEventListener('mousedown', this.startDrawing.bind(this));
    this.canvasBackground.addEventListener('mousemove', this.draw.bind(this));
    this.canvasBackground.addEventListener('mouseup', this.stopDrawing.bind(this));
    this.canvasBackground.addEventListener('mouseleave', this.stopDrawing.bind(this));
    this.canvasBackground.addEventListener('contextmenu', Pen.canselDefaultRightClich.bind(this));

    const canvasWrapper = document.querySelector('#canvas__wrapper');
    canvasWrapper.style.cursor = 'url(\'https://www.piskelapp.com/p/img/cursors/pen.png\') 0 16, auto';
  }
}
