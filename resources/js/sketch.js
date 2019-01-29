
// module aliases
var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var boxes = [];
var world;
var ground;
function setup() {
    createCanvas(400, 400);
    engine = Engine.create();
    world = engine.world;
    // box1 = Bodies.rectangle(50, 100, 80, 80);
    // ground = Bodies.rectangle(0, 300, 400, 10, { isStatic: true });
    // World.add(world, box1);
    Engine.run(engine);
    var options = {
        isStatic: true
    }
    ground = Bodies.rectangle(200, height-50, width, 10, options);
    World.add(world, ground);
}

function mouseDragged() {
    boxes.push(new Box(mouseX, mouseY, 20, 20));
}

function draw() {
    background(51)
    // rect(box1.position.x, box1.position.y, 80, 80)
    // rect(ground.position.x, ground.position.y, 400, 10)
    for (var bx = 0; bx < boxes.length; bx++) {
        boxes[bx].show();
    }
    noStroke(255);
    fill(170);
    rectMode(CENTER);
    rect(ground.position.x, ground.position.y, width, 10);
    // box1.show();
}

function Box(x, y, w, h) {
    var options = {
        friction: 0.5,
        restitution: 1
    }
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);

    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER)
        strokeWeight(2)
        stroke(255)
        fill(127)
        rect(0, 0, this.w, this.h);
        pop();
    }
}