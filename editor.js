
function popTileSelectionWindow(res, tileSelectionWindow){
    const tiles = JSON.parse(res.responseText)['_'];
    const ul = document.createElement('ul');
    ul.classList.add('tile_list');
    tiles.forEach( ts => {
        let li = document.createElement('li');
        li.classList.add(ts.name.replace(' ',''));
        let img = document.createElement('img');
        img.src = ts.art;
        img.alt = ts.description;
        li.appendChild(img);
        ul.appendChild(li);
    });

    tileSelectionWindow.querySelector('.window-body').appendChild(ul);
}

document.querySelectorAll('#tiles .tabs menu li').forEach( li => {
    li.addEventListener('click', (e) => {
        const req = new XMLHttpRequest();
        const tileSelectionWindow = document.querySelector('#tiles .tabs .window');
        req.addEventListener("load", (e) => {
            let resp = e.currentTarget;
            if(resp.status === 200) {
                popTileSelectionWindow(resp, tileSelectionWindow);
            }
        });
        req.open("GET", "tiles/world.json");
        req.send();
    });
});