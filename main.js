var config = {
    type: Phaser.AUTO,
    width: 1800,
    height: 1000,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    audio: {
        disableWebAudio: true
    },
    scene: {
        preload: preload,
        create: create,
        update: updateDirect,
    }
};

var game = new Phaser.Game(config);

function preload () {
    this.load.tilemapTiledJSON('map', '/harrypotter.json');
    // this.load.image('tiles', '/Tileset.png');
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

    //Bullet Stuff
    // this.load.image('shoot1', '1.png');
    this.load.image('bullet', 'bullet.png');
    // this.load.image('shoot3', '3.png');
    // this.load.image('shoot4', '4.png');
    // this.load.image('shoot5', '5.png');
    // this.load.image('shoot6', '6.png');
    // this.load.image('shoot7', '7.png');

    this.load.audio('goldenEgg', '/10 - Golden Egg.mp3');

}
var boi;
var dragon;
var bullets;
var speed;
var dragonHealth = 100;
var harryHealth = 100;
var lastFired = 0;

function create ()
{
    var Bullet = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Bullet (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

            this.speed = Phaser.Math.GetSpeed(700, 1);
        },

        fire: function (x, y)
        {
            this.setPosition(x, y);

            this.setActive(true);
            this.setVisible(true);
        },

        update: function (time, delta)
        {
            this.x -= this.speed * delta;

            if (this.x < -50)
            {
                this.setActive(false);
                this.setVisible(false);
            }

            if(this.y == dragon.y){
                dragonHealth = dragonHealth -= 1;
                console.log('dragonHealth', dragonHealth);
            }
        }

    });

    bullets = this.add.group({
        classType: Bullet,
        maxSize: 20,
        runChildUpdate: true
    });

    speed = Phaser.Math.GetSpeed(300, 1);

    this.cameras.main.setBounds(0, 0, 4000, 900);
    this.physics.world.setBounds(0, 0, 5700, 900, true, true, true, true);

    const map = this.make.tilemap({key:'map', tileWidth: 32, tileHeight: 32});
    var background = this.add.tileSprite(1150, 0, 5700, 2150, 'background');
    // const main = map.addTilesetImage('harrypotter', 'tiles');
    boi = this.physics.add.sprite(50, 600, 'harry').setAngle(0);
    // const playerWalks = map.createStaticLayer('player-walks', main, 0, 0);

    boi.setBounce(0.2);
    boi.setCollideWorldBounds(true)
    boi.onWorldBounds = true

    var music = this.sound.add('goldenEgg');
    music.play();

    cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.startFollow(boi, true, 0.08, 0.08);

    this.cameras.main.setZoom(1);

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

    //Bullet Stuff
    // this.anims.create({
    //     key: 'shoot',
    //     frames: [
    //         { key: 'shoot1', frame: null },
    //         { key: 'shoot2', frame: null },
    //         { key: 'shoot3', frame: null },
    //         { key: 'shoot4', frame: null },
    //         { key: 'shoot5', frame: null },
    //         { key: 'shoot6', frame: null },
    //         { key: 'shoot7', frame: null, duration: 50 }
    //     ],
    //     frameRate: 5,
    //     repeat: -1
    // });
    // bullet = this.add.sprite(400, 300, 'shoot1').play('shoot');
}

function updateDirect (time, delta) {
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

    if(boi.x < dragon.x){
        dragon.setAngle(179);
        dragon.x -= 2;
    }
    else if(boi.x > dragon.x){
        dragon.setAngle(0);
        dragon.x += 2;
    }
    if(boi.y < dragon.y){
        dragon.y -= 2;
    }
    else if(boi.y > dragon.y){
        dragon.y += 2;
    }
    else{
        dragon.setAngle(0);
    }
    if (cursors.space.isDown && time > lastFired)
    {
        console.log('fire')
        var bullet = bullets.get();

        if (bullet)
        {
            bullet.fire(boi.x, boi.y);

            lastFired = time + 5;
        }
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
    if(boi.x < dragon.x){
        dragon.setVelocityX(-600);
    }
    else if(boi.x > dragon.x){
        dragon.setVelocityX(+600);
    }
    if(boi.y < dragon.x){
        dragon.setVelocityY(-600);
    }
    else if(boi.y > dragon.x){
        dragon.setVelocityY(+600);
    }
}
