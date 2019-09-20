/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
import { currentFrameIndex, setCurrentFrameIndex, framesArray } from './frames';
import CloneCanvas from './cloneCanvas';
import CheckIndex from './checkIndex';
import DrawNewFrame from './drawNewFrame';
import SetFramePrev from './setFramePrev';
import PreviewTool from '../preview/preview';
import CheckCurrentTool from '../../view/canvas/checkCurrentTool';

let storage;
const wasDeleteFrameUsed = [false];

export default class DeleteFrame {
  constructor() {
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');
    this.frameWrapper = document.querySelector('.frames__wrapper');
    this.emptyFrame = document.querySelector('.frame__background');
    this.drawNewFrame = new DrawNewFrame(this.emptyFrame);
    this.cloneCanvas = new CloneCanvas();
    this.emptyCanvas = CloneCanvas.clone(this.canvas);
    this.emptyDataURL = this.canvas.toDataURL();
    this.setFramePrev = new SetFramePrev(this.emptyDataURL);
    this.previewTool = new PreviewTool();
    this.checkCurrentTool = new CheckCurrentTool();
  }

  delete() {
    wasDeleteFrameUsed[0] = true;

    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');

    const frames = document.querySelectorAll('.frame__background');
    const arrayOfFrames = [...frames];
    this.frameWrapper = document.querySelector('.frames__wrapper');
    this.frameWrapper.removeChild(arrayOfFrames[currentFrameIndex]);

    framesArray.splice(currentFrameIndex, 1);

    if (currentFrameIndex) {
      storage = currentFrameIndex;
      storage -= 1;
      setCurrentFrameIndex(storage);
    }

    const canvasParent = this.canvas.parentNode;

    if (framesArray.length !== 0) {
      const elemToInsert = CloneCanvas.clone(framesArray[currentFrameIndex]);

      canvasParent.replaceChild(elemToInsert, this.canvas);

      const newCanvas = canvasParent.children[0];
      newCanvas.className = 'canvas__item';

      this.setFramePrev.init();
    } else {
      this.drawNewFrame.init(currentFrameIndex + 1);

      canvasParent.replaceChild(this.emptyCanvas, this.canvas);

      const newCanvas = canvasParent.children[0];
      newCanvas.className = 'canvas__item';

      this.setFramePrev.setEmpty();
    }
  }

  deleteFrame(e) {
    this.canvas = document.querySelector('.canvas__item');

    if (e.target.className.indexOf('trash') >= 0) {
      framesArray[currentFrameIndex] = CloneCanvas.clone(this.canvas);

      setCurrentFrameIndex(CheckIndex.check(e));

      this.delete();

      const frames = document.querySelectorAll('.frame__unit');
      const arrayOfFrames = [...frames];
      arrayOfFrames.map((i, j) => {
        i.children[1].textContent = `${j + 1}`;
      });

      this.checkCurrentTool.activePreviousTool();

      this.previewTool.show();
    }
  }

  init() {
    this.frameWrapper.addEventListener('mousedown', this.deleteFrame.bind(this));
  }
}

export { wasDeleteFrameUsed };
