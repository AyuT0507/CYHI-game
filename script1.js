const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

let baseGamespeed = 1;
let gamespeed = baseGamespeed;
const SCORE_PER_MS = 0.007;
const SPEED_GROWTH_FACTOR = 0.002;

let score = 0;

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'layer-9.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'layer-10.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'layer-5.png';

class Layer{
    constructor(image, speedmodifier){
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.x2 = this.width;
        this.image = image;
        this.speedmodifier = speedmodifier;
        this.speed = gamespeed * this.speedmodifier;
    }
    update(){
      
        this.speed = gamespeed * this.speedmodifier;

        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);

        if(this.x <= -this.width){
            this.x = this.width + this.x2 - this.speed;
        }
        if(this.x2 <= -this.width){
            this.x2 = this.width + this.x - this.speed;
        }
    }
    draw(){
        if (this.image.complete) {
          ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
          ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
        }
    }
}

const layer5 = new Layer(backgroundLayer5, 1);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer1 = new Layer(backgroundLayer1, 0.2);

const gameObjects = [layer1, layer2, layer3, layer4, layer5];

let lastTimestamp = 0;
function animate(timestamp){
    if(!lastTimestamp) lastTimestamp = timestamp;
    const dt = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    score += dt * SCORE_PER_MS;

    gamespeed = baseGamespeed + (score * SPEED_GROWTH_FACTOR);

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    gameObjects.forEach(object => {
      object.update();
      object.draw();
    });
    ctx.save();
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'right';
    ctx.fillText('Score: ' + Math.floor(score), CANVAS_WIDTH - 12, 28);
    ctx.restore();

    requestAnimationFrame(animate);
};
requestAnimationFrame(animate);
