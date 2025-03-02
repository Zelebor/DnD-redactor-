const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let selectedTile = null;
let tiles = [];

function preload() {
    // Загрузка спрайтов
    this.load.image('grass', 'assets/grass.png');
    this.load.image('tree', 'assets/tree.png');
    this.load.image('water', 'assets/water.png');
}

function create() {
    // Создание карты
    for (let y = 0; y < 40; y++) {
        for (let x = 0; x < 40; x++) {
            let tile = this.add.image(x * 20, y * 20, 'grass').setInteractive();
            tile.setData('x', x);
            tile.setData('y', y);
            tile.on('pointerdown', () => openModal(tile));
            tiles.push(tile);
        }
    }

    // Создание панели спрайтов
    const tileTypes = ['tree', 'water'];
    const sidebar = document.getElementById('tiles');
    tileTypes.forEach(type => {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.style.backgroundImage = `url(assets/${type}.png)`;
        tile.addEventListener('click', () => selectTile(type));
        sidebar.appendChild(tile);
    });
}

function update() {
    // Обновление логики игры
}

function selectTile(type) {
    selectedTile = type;
}

function openModal(tile) {
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';

    document.getElementById('rotate-btn').onclick = () => rotateTile(tile);
    document.getElementById('delete-btn').onclick = () => deleteTile(tile);
    document.getElementById('move-btn').onclick = () => moveTile(tile);
}

function rotateTile(tile) {
    tile.angle += 90;
    closeModal();
}

function deleteTile(tile) {
    tile.destroy();
    closeModal();
}

function moveTile(tile) {
    // Логика перемещения тайла
    closeModal();
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}
