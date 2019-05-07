var config = {
    type: Phaser.AUTO,
    width: 6400,
    height: 1000,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: updateDirect
    }
};

var game = new Phaser.Game(config);

function preload () {
    this.load.tilemapTiledJSON('map', '/harrypotter.json');
    this.load.image('tiles', '/Tileset.png');
    this.load.image('background', '/mountains2.png');
    this.load.image('harry', './harry.png');

    this.load.image('fly0', 'Flight_000.png');
    this.load.image('fly1', 'Flight_001.png');
    this.load.image('fly2', 'Flight_002.png');
    this.load.image('fly3', 'Flight_003.png');
    this.load.image('fly4', 'Flight_004.png');
    this.load.image('fly5', 'Flight_005.png');
    this.load.image('fly6', 'Flight_006.png');
    this.load.image('fly7', 'Flight_007.png');
    this.load.image('fly8', 'Flight_008.png');
    this.load.image('fly9', 'Flight_009.png');
    this.load.image('fly10', 'Flight_010.png');
    this.load.image('fly11', 'Flight_011.png');
    this.load.image('fly12', 'Flight_012.png');

}
var boi;
var dragon;
var dragonHealth = 100;
var harryHealth = 100;
function create ()
{
    this.cameras.main.setBounds(0, 0, 50, 50);
    this.physics.world.setBounds(0, 0, 6400, 840, true, true, true, true);

    const map = this.make.tilemap({key:'map', tileWidth: 32, tileHeight: 32});
    var background = this.add.tileSprite(0, 0, 5000, 2200, 'background');
    const main = map.addTilesetImage('harrypotter', 'tiles');
    boi = this.physics.add.sprite(50, 600, 'harry').setAngle(0);

    const playerWalks = map.createStaticLayer('player-walks', main, 0, 0);

    boi.setBounce(0.2);
    boi.setCollideWorldBounds(true)
    boi.onWorldBounds = true

    cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.startFollow(boi, true, 50, 50);

    this.cameras.main.setZoom(1);
    this.physics.add.collider(boi, playerWalks);

    this.anims.create({
        key: 'fly',
        frames: [
            { key: 'fly0', frame: null },
            { key: 'fly1', frame: null },
            { key: 'fly2', frame: null },
            { key: 'fly3', frame: null },
            { key: 'fly4', frame: null },
            { key: 'fly5', frame: null },
            { key: 'fly6', frame: null },
            { key: 'fly7', frame: null },
            { key: 'fly8', frame: null },
            { key: 'fly9', frame: null },
            { key: 'fly10', frame: null },
            { key: 'fly11', frame: null },
            { key: 'fly12', frame: null, duration: 50 }
        ],
        frameRate: 10,
        repeat: -1
    });
    dragon = this.add.sprite(400, 300, 'fly0').play('fly');
}

function updateDirect () {
    if (cursors.left.isDown && boi.x > 0) {
        boi.setAngle(179);
        boi.x -= 2.5;
    }
    else if (cursors.right.isDown && boi.x < 3392) {
        boi.setAngle(0);
        boi.x += 2.5;
    }

    if (cursors.up.isDown && boi.y > 0) {
        boi.setAngle(-90);
        boi.y -= 2.5;
    }
    else if (cursors.down.isDown && boi.y < 1280) {
        boi.setAngle(90);
        boi.y += 2.5;
    }
}

function update () {
    boi.setVelocity(0);

    if (cursors.left.isDown) {
        boi.setAngle(0).setVelocityX(-400);
    }
    else if (cursors.right.isDown) {
        boi.setAngle(0).setVelocityX(400);
    }

    if (cursors.up.isDown) {
        boi.setVelocityY(-400);
    }
    else if (cursors.down.isDown) {
        boi.setVelocityY(400);
    }
}
