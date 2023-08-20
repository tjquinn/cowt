export default class ScrollCrawler {
    constructor() {
      this.config = { attributes: true, childList: true, subtree: true };
      this.map = document.querySelector('map');
      this.player = this.map.querySelector('.player');
      this.observer = new MutationObserver(this.scrollWithPlayer.bind(this));
      this.observer.observe(this.player, this.config);
    }

    scrollWithPlayer(e) {
      e.forEach(() => {       
        this.player.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
      });
    }
  }