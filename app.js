import PathFinder from "./pathfinder.js";
import ViewersEye from "./viewerseye.js";
import ScrollCrawler from "./scrollcrawler.js";
const grid = { x: 26, y: 26 };

function getElm(selector, multiple = true) {
    try {
        let elements = multiple ? document.querySelectorAll(selector) : document.querySelector(selector);
        elements = (elements.length > 1) ? Array.from(elements) : elements;
        elements = (elements.length === 1) ? elements[0] : elements;
        return elements;
    } catch (error) {
        throw error;
    }
}

function enblazendPath(e){
    let player = getElm('div.tile:has(.player)');
    const pathfinder = new PathFinder(gridElements);
    let path = pathfinder.findPath(player, this);
    path.forEach((p)=>{
        setTimeout(() => {
            p.classList.add('active');
        }, 250);
    });
}

function navPing(e) {
    let player = getElm('map div.player');
    let gridElements = getElm('map div.tile');
    const pathfinder = new PathFinder(gridElements);
    const playerTile = pathfinder.getTile(player);
    let path = pathfinder.findPath(playerTile, this);
    pathfinder.journey(player, path);
}

function buildMap(grid) {
    let numTiles = grid.x * grid.y;
    let map = getElm('body map');
    for (let index = 0; index < numTiles; index++) {
        let tile = document.createElement('div');
        tile.classList.add('tile');
        tile.classList.add('undiscovered');
        map.append(tile);
    }
}

function organizeMap(grid) {
    var tiles = getElm('map div.tile');
    const gridX = grid.x - 1;
    var x = 0;
    var y = 0;
    for (let index = 0; index < tiles.length; index++) {
        tiles[index].setAttribute('x', x);
        tiles[index].setAttribute('y', y);
        let gridBreak = x % gridX == 0;
        if (x != 0 && gridBreak) {
            x = 0;
            y++;
        } else {
            x++;
        }
    }
}

function loadCharacter() {
    let map = getElm('map');
    let char = document.createElement('div');
    char.classList.add('player');
    char.setAttribute('x', 0);
    char.setAttribute('y', 0);
    map.prepend(char);
    let vewers = new ViewersEye('.player');
    new ScrollCrawler();
}

buildMap(grid);
organizeMap(grid);
loadCharacter();


let mt = document.querySelectorAll('map div.tile');
mt.forEach((t)=> {
    t.addEventListener('click', navPing);
    t.addEventListener('hover', enblazendPath);
});