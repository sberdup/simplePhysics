const ballSpeed = 5;
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#1d1d1d',
    parent: 'phaser-example',
    physics: {g
        default: 'matter',
        matter: {
            enableSleeping: true,
            gravity: {
                y: 0
            },
            debug: {
                showBody: true,
                showStaticBody: true
            }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('ball', 'assets/bomb.png');
}

function create() {
    //the set of booleans afterwards makes the bounds of the world solid
    this.matter.world.setBounds(0, 0, 800, 600, 32, true, true, true, true);

    //  Add in a stack of balls
    for (var i = 0; i < 100; i++) {
        var ball = this.matter.add.image(Phaser.Math.Between(0, 800), Phaser.Math.Between(0, 600), 'ball', null, { inertia: Infinity });
        // Find a random direction, in radians
        const direction = Math.random() * Math.PI * 2;
        ball.setCircle();
        ball.setFriction(0);
        ball.setFrictionAir(0);
        ball.setVelocity(Math.sin(direction) * ballSpeed, Math.cos(direction) * ballSpeed);
    }
}

function update() {

}

function adjustE(p) {
    const baseSpeed = ballSpeed;

    if (p.speed !== 0) {
        let speedMultiplier = baseSpeed / p.speed;

        Phaser.Physics.Matter.Body.setVelocity(p, {
            x: p.velocity.x * speedMultiplier,
            y: p.velocity.y * speedMultiplier
        });
    }
};