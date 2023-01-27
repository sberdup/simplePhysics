const WIDTH = 370;
const HEIGHT = 300;
const PARTICLE_SPEED = 3;

/**
 * Adjust the velocity of a particle based on the initial speed we
 * assigned it, to make sure it doesn't lose energy.
 *
 * Based on:
 *   https://jsfiddle.net/xaLtoc2g/
 */
const adjustE = function(p) {
    const baseSpeed = PARTICLE_SPEED;

    if (p.speed !== 0) {
        let speedMultiplier = baseSpeed / p.speed;

        Matter.Body.setVelocity(p, {
            x: p.velocity.x * speedMultiplier,
            y: p.velocity.y * speedMultiplier
        });
    }
};

const drawWalls = function() {
    const Bodies = Matter.Bodies;
    const margin = 1;
    const wallOptions = {
        isStatic: true,
        render: {
            fillStyle: 'white',
            strokeStyle: 'white',
            lineWidth: 0
        },
        collisionFilter: {
            mask: 1
        }
    };

    return [
        // Bottom wall
        Bodies.rectangle(
            // x, y
            0, HEIGHT,
            // width, height
            WIDTH * 2, margin,
            wallOptions
        ),
        // right wall
        Bodies.rectangle(
            // x, y
            WIDTH, 0,
            // width, height
            margin, HEIGHT * 2,
            wallOptions
        ),
        // top wall
        Bodies.rectangle(
            // x, y
            0, 0,
            // width, height
            WIDTH * 2, margin,
            wallOptions
        ),
        // left wall
        Bodies.rectangle(
            // x, y
            0, 0,
            // width, height
            margin, HEIGHT * 2,
            wallOptions
        ),
    ];
};

const makeParticle = function() {
    const particleMargin = 4;
    const p = Matter.Bodies.circle(
        (Math.random() * (WIDTH - particleMargin)) +
            (particleMargin / 2),
        (Math.random() * (HEIGHT - particleMargin)) +
            (particleMargin / 2),
        3, {
            render: {
                fillStyle: '#6666A0',
                lineWidth: 1.5
            },
            restitution: 1,
            friction: 0,
            frictionAir: 0
        });

    Matter.Body.setInertia(p, Infinity);

    const direction = Math.random() * Math.PI * 2;
    Matter.Body.setVelocity(p, {
        x: Math.sin(direction) * PARTICLE_SPEED,
        y: Math.cos(direction) * PARTICLE_SPEED
    });


    return p;
};

const makeParticles = function() {
    const particles = [];
    for (let i = 0; i < 140; i++) {
        particles.push(makeParticle());
    }
    return particles;
};

document.addEventListener('DOMContentLoaded', function(event) { 
    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Composite = Matter.Composite;

    // create an engine
    const engine = Engine.create();
    this.engine = engine;
    engine.world.gravity.y = 0;

    // create a renderer
    const render = Render.create({
        element: document.getElementById('js-root'),
        engine: engine,
        width: WIDTH,
        height: HEIGHT,
        options: {
            wireframes: false,
            background: 'white',
        }
    });
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: WIDTH, y: HEIGHT }
    });

    Render.run(render);

    const walls = drawWalls();
    Matter.Composite.add(engine.world, walls);

    const particles = makeParticles();
    Matter.Composite.add(engine.world, particles);

    const runner = Runner.create();
    Runner.run(runner, engine);

    let counter0 = 0;
    Matter.Events.on(engine, 'beforeUpdate', function(e) {
        if (e.timestamp >= counter0 + 500) {
            particles.forEach(function(p) {
                adjustE(p);
            });

            counter0 = e.timestamp;
        }
    });

    // Make a second scene without the energy adjustment.
    // create an engine
    const engine2 = Engine.create();
    this.engine2 = engine2;
    engine2.world.gravity.y = 0;

    // create a renderer
    const render2 = Render.create({
        element: document.getElementById('js-root-2'),
        engine: engine2,
        width: WIDTH,
        height: HEIGHT,
        options: {
            wireframes: false,
            background: 'white',
        }
    });
    Render.lookAt(render2, {
        min: { x: 0, y: 0 },
        max: { x: WIDTH, y: HEIGHT }
    });

    Render.run(render2);

    const walls2 = drawWalls();
    Matter.Composite.add(engine2.world, walls2);

    const particles2 = makeParticles();
    Matter.Composite.add(engine2.world, particles2);

    const runner2 = Runner.create();
    Runner.run(runner2, engine2);
});