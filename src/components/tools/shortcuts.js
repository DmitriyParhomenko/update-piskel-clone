/* eslint-disable default-case */
/* eslint-disable consistent-return */
import CheckCurrentTool from '../../view/canvas/checkCurrentTool';

export default class Shortcuts {
  constructor() {
    this.checkCurrentTool = new CheckCurrentTool();
    this.allToolsItems = document.querySelectorAll('.tools__item');
  }

  static selectTool(e) {
    switch (e.keyCode) {
      case 80:
        this.getTool('pen');
        break;
      case 66:
        this.getTool('paint-bucket');
        break;
      case 69:
        this.getTool('eraser');
        break;
      case 82:
        this.getTool('rectangle');
        break;
      case 77:
        this.getTool('move');
        break;
      case 83:
        this.getTool('crop');
        break;
      case 79:
        this.getTool('color-picker');
        break;
    }
  }

  getTool(name) {
    CheckCurrentTool.setCurrentTool(name);

    this.allToolsItems.forEach((i) => {
      const toolName = i.getAttribute('data-tool');

      if (toolName === name) { return this.checkCurrentTool.setTool(i); }
    });
  }

  init() {
    window.addEventListener('keydown', Shortcuts.selectTool.bind(this));
  }
}
