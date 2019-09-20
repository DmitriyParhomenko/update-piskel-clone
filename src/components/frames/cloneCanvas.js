export default class CloneCanvas {
  static clone(oldCanvas) {
    if (oldCanvas) {
      const newCanvas = document.createElement('canvas');
      const context = newCanvas.getContext('2d');

      newCanvas.setAttribute('class', 'canvas__item');

      newCanvas.width = oldCanvas.width;
      newCanvas.height = oldCanvas.height;

      context.drawImage(oldCanvas, 0, 0);

      return newCanvas;
    }

    return null;
  }
}
