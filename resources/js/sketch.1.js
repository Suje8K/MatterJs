
// module aliases
var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body;

var engine;
var world;
var bx, gnd, gnd1, gnd2;
function setup() {
    createCanvas(400, 400);
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
    bx = new Box(random(0, width), width - 10, random(8, 25), 20);
    Body.setVelocity(bx.body, { x: 10, y: 0 })
    gnd = new Ground(width / 2, height, width, 10, 0);
    gnd1 = new Ground(0, height / 2, width, 10, PI / 2);
    gnd2 = new Ground(width, height / 2, width, 10, PI / 2);
}

function draw() {
    background(51)
    bx.show();
    gnd.show();
    gnd1.show();
    gnd2.show();
}

function Box(x, y, w, h) {
    var options = {
        friction: 0,
        restitution: 1,
        frictionStatic: 0,
        frictionAir: 0,
        inertia: 10
    }
    // this.body = Bodies.rectangle(x, y, w, h, options);
    this.body = Bodies.circle(x, y, w, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
    var r = random(0, 255);
    var g = random(0, 255);
    var b = random(0, 255);
    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        // rectMode(CENTER)
        strokeWeight(2)
        stroke(255)
        fill(r, g, b);
        ellipse(0, 0, 2 * w);
        pop();
    }
}

function Ground(x, y, w, h, a) {
    var options = {
        friction: 0,
        restitution: 1,
        isStatic: true,
        angle: a,
        frictionStatic: 0,
        frictionAir: 0
    }
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);

    this.show = function () {
        var pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        rotate(a);
        rectMode(CENTER);
        noStroke(255);
        fill(170);
        rect(0, 0, this.w, this.h);
        pop();
    }
}
