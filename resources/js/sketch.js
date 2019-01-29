
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
        isStatic : true
    }
    ground = Bodies.rectangle(200, height, width, 10, options);
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
    // box1.show();
}

function Box(x, y, w, h) {
    this.body = Bodies.rectangle(x, y, w, h);
    this.w = w;
    this.h = h;
    World.add(world, this.body);

    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rect(0, 0, this.w, this.h);
        pop();
    }
}