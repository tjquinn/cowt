export default class ViewersEye {
  constructor(selector) {
    this.player = document.querySelector(selector);
    this.viewer = document.querySelector('#viewer');
    this.observerConfig = { childList: true, attributes: false, subtree: true };
    this.consumeManaGoblet();
    this.sight = this.setPlayersSight();
  }
  exposeTile(e) {
    e.forEach(obs => {
      let tile = obs.target;
      let visible = obs.isIntersecting;
      let area = document.querySelector('div.player area').getBoundingClientRect();
      if (visible) {
        let x = area.left + area.width >= tile.offsetLeft + tile.offsetWidth;
        let y = area.top + area.height >= tile.offsetTop + tile.offsetHeight;
        if (x && y && tile.classList.contains('undiscovered')) {
          tile.classList.remove('undiscovered');
          tile.style.background = "green";
        }
      }
    });

  }
  setPlayersSight() {
    const mapTiles = document.querySelectorAll('map div.tile');
    let area = document.createElement('area');
    this.player.appendChild(area);
    area = document.querySelector('player area');
    const options = {
      root: area,
      rootMargin: "0",
      threshold: 1, // Intersection threshold
    };
    let observer = new IntersectionObserver(this.exposeTile);
    mapTiles.forEach(tile => {
      observer.observe(tile, options);
    });

  }
  isSoulPresent(nodeList) {
    return Array.from(nodeList).includes(this.player);
  }
  focusSight(mutation) {
    console.log(mutation);
  }
  mutantSight(mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        if (this.isSoulPresent(mutation.removedNodes)) {
          this.prefixClarifyMutationEffects(mutation);
        }
        if (this.isSoulPresent(mutation.addedNodes)) {
          this.suffixClarifyMutationEffects(mutation);
        }
      }
    }
  }
  prefixClarifyMutationEffects(mutation) {
    console.log('There are are no tile effects yet.', mutation);
  }
  suffixClarifyMutationEffects(mutation) {
    if (window.destiny == mutation.target) {
      this.focusSight(mutation);
    }
  }
  consumeManaGoblet() {
    this.observer = new MutationObserver(this.mutantSight.bind(this));
    this.observer.observe(this.viewer, this.observerConfig);
  }
}
