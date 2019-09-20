import { currentFrameIndex, setCurrentFrameIndex, framesArray } from './frames';
import CloneCanvas from './cloneCanvas';
import DrawNewFrame from './drawNewFrame';
import SetFramePrev from './setFramePrev';
import PreviewTool from '../preview/preview';
import CheckCurrentTool from '../../view/canvas/checkCurrentTool';
import ShowCurrentFrame from './showCurrentFrame';

export default class AddNewFrame {
  constructor() {
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.emptyCanvas = CloneCanvas.clone(this.canvas);
    this.emptyDataURL = this.canvas.toDataURL();
    this.emptyFrame = document.querySelector('.frame__background');
    this.setFramePrev = new SetFramePrev(this.emptyDataURL);
    this.cloneCanvas = new CloneCanvas();
    this.drawNewFrame = new DrawNewFrame(this.emptyFrame);
    this.previewTool = new PreviewTool();
    this.checkCurrentTool = new CheckCurrentTool();
    this.showCurrentFrame = new ShowCurrentFrame();
  }

  addFrame() {
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');

    framesArray[currentFrameIndex] = CloneCanvas.clone(this.canvas);

    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    setCurrentFrameIndex(framesArray.length);

    framesArray.push(this.emptyCanvas);

    this.drawNewFrame.init(currentFrameIndex + 1);

    this.showCurrentFrame.highlightSelectedFrame();

    this.setFramePrev.setEmpty(currentFrameIndex);

    this.checkCurrentTool.activePreviousTool();

    this.previewTool.show();
  }
}
