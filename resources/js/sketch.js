
// module aliases
var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var boxes = [];
var world;
var grounds = [];
function setup() {
    createCanvas(400, 400);
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
    grounds.push(new Ground(100, height / 2, width / 1.5, 10, 0.3));
    grounds.push(new Ground(300, height * 3 / 4, width / 1.5, 10, -0.3));
}

function mouseDragged() {
    boxes.push(new Box(mouseX, mouseY, random(8, 25), 20));
}

function draw() {
    background(51)
    for (var bx = 0; bx < boxes.length; bx++) {
        boxes[bx].show();
    }
    for (var gd = 0; gd < grounds.length; gd++) {
        grounds[gd].show();
    }
}

function Box(x, y, w, h) {
    var options = {
        friction: 0,
        restitution: 0.6
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
        friction: 0.3,
        restitution: 0.6,
        isStatic: true,
        angle: a
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
        rectMode(CENTER)
        noStroke(255)
        fill(170)
        rect(0, 0, this.w, this.h);
        pop();
    }
}
