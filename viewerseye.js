export default class ViewersEye {
  constructor(selector) {
    this.dynamicDiv = document.querySelector(selector);

    this.centerScroll();
  }

  centerScroll() {
    const divRect = this.dynamicDiv.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const centerX = windowWidth / 2;
    const centerY = windowHeight / 2;

    const offsetX = centerX - divRect.x - divRect.width / 2;
    const offsetY = centerY - divRect.y - divRect.height / 2;

    const newScrollX = window.scrollX + offsetX;
    const newScrollY = window.scrollY + offsetY;

    window.scrollTo(newScrollX, newScrollY);

    requestAnimationFrame(this.centerScroll.bind(this));
  }
}
