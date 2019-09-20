import ColorPicker from '../../components/tools/color-picker';
import Frames from '../../components/frames/frames';
import DeleteFrame from '../../components/frames/deleteFrame';
import SetFramePrev from '../../components/frames/setFramePrev';
import AddNewFrame from '../../components/frames/addNewFrame';
import CloneFrameTool from '../../components/frames/cloneFrameTool';
import SelectFrameTool from '../../components/frames/selectFrameTool';
import ShowCurrentFrame from '../../components/frames/showCurrentFrame';
import PreviewTool from '../../components/preview/preview';
import ResizeTool from '../../components/features/resizeTool';
import ResizeOfCanvas from './resizeOfCanvas';
import CanvasData from '../../components/features/canvasData';
import FullScreenTool from '../../components/preview/fullScreenTool';
import CheckCurrentTool from './checkCurrentTool';
import Shortcuts from '../../components/tools/shortcuts';
import DragAndDrop from '../../components/frames/drag&drop';
import APNG from './aPNGMaker';
import GIFMaker from './gifMaker';

export default class Canvas {
  constructor() {
    this.canvas = document.querySelector('.canvas__item');
    this.emptyDataURL = this.canvas.toDataURL();
    this.setFramePrev = new SetFramePrev(this.emptyDataURL);
    this.addNewFrame = new AddNewFrame();
    this.canvasData = new CanvasData();
    this.addFrameButton = document.querySelector('.frames__add-frame-button');
    this.canvasWrapper = document.querySelector('#canvas__wrapper');
    this.shortcuts = new Shortcuts();
    this.dragAndDrop = new DragAndDrop();
    this.aPNG = new APNG();
    this.gifMaker = new GIFMaker();
  }

  init() {
    this.canvasWrapper.addEventListener('contextmenu', this.canselDefaultRightClich);

    const checkCurrentTool = new CheckCurrentTool();
    checkCurrentTool.init();

    const colorPicker = new ColorPicker();
    colorPicker.init();

    const frames = new Frames();
    frames.init();

    const deleteFrame = new DeleteFrame();
    deleteFrame.init();

    const cloneFrameTool = new CloneFrameTool();
    cloneFrameTool.init();

    this.dragAndDrop.init();

    const previewTool = new PreviewTool();
    previewTool.init();


    const resizeTool = new ResizeTool();
    resizeTool.init();

    const resizeOfCanvas = new ResizeOfCanvas();
    resizeOfCanvas.init();
    resizeOfCanvas.changeSize();

    const fullScreenTool = new FullScreenTool();
    fullScreenTool.init();

    this.canvasWrapper.addEventListener('click', this.setFramePrev.init.bind(this));
    this.canvasWrapper.addEventListener('contextmenu', this.setFramePrev.init.bind(this));

    this.addFrameButton.addEventListener('click', this.addNewFrame.addFrame.bind(this.addNewFrame));

    const selectFrameTool = new SelectFrameTool();
    selectFrameTool.init();

    this.firstFrame = document.querySelector('.frame__unit');
    this.firstFrame.style.borderColor = 'rgb(255, 215, 0)';
    const showCurrentFrame = new ShowCurrentFrame();
    showCurrentFrame.init();

    this.canvasData.init();

    this.shortcuts.init();

    this.aPNG.init();

    this.gifMaker.init();
  }
}
