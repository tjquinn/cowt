import PathFinder from "./pathfinder.js";
import ViewersEye from "./viewerseye.js";
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

function navPing(e) {
    let player = getElm('div.tile:has(.player)');
    let gridElements = getElm('map div.tile');
    const pathfinder = new PathFinder(gridElements);

    let path = pathfinder.findPath(player, this);
    console.log(path);
    pathfinder.journey(player, path);
}

function buildMap(grid) {

    let numTiles = grid.x * grid.y;
    let map = getElm('body map');
    for (let index = 0; index < numTiles; index++) {
        let tile = document.createElement('div');
        tile.classList.add('tile');
        tile.addEventListener('click', navPing);
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

    // var setX = alphaStr.split('');
    // var setY = [...setX];

    // let posX = setX.pop();
    // let posY = setY.pop();
    // tile.setAttribute('posX', posX);
    // tile.setAttribute('posY', posY);
}



// function organizeMap(grid) {
//     var tiles = getElm('map div.tile');
//     var setTotal = [...Array(grid.x * grid.y).keys()];
//     var setX = [...Array(grid.x).keys()]
//     var setY = [...Array(grid.y).keys()]
//     let start = 0;
//     let posY = setY.pop();
//     for (let index = 0; index < grid.y * grid.x; index++) {
//         if (start !== 0 && index % grid.y == 0) {
//             posY = setY.pop();
//         }
//         tiles[start].setAttribute('y', posY);
//         let posX = setX.pop();
//         tiles[start].setAttribute('x', posX);
//         start++;

//         if (setX.length < 1) {
//             setX = setTotal;
//         }
//     }

//     // var setX = alphaStr.split('');
//     // var setY = [...setX];

//     // let posX = setX.pop();
//     // let posY = setY.pop();
//     // tile.setAttribute('posX', posX);
//     // tile.setAttribute('posY', posY);
// }

function loadCharacter() {
    let start = getElm('map div.tile[x="0"][y="0"]');
    let char = document.createElement('div');
    char.classList.add('player');
    start.append(char);
    let vewers = new ViewersEye('.player');
}




buildMap(grid);
organizeMap(grid);
loadCharacter();


// }