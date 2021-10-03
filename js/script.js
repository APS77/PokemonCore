import { overworldMusic } from "./audio.js";
import { Player } from "./player_class.js";
import { createBattle } from "./battle.js"
import { BattleTile } from "./BattleTile_class.js";
//overworldMusic.play();
/*
const config = {
    debug: false
};
*/
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let fpsInterval, startTime, now, then, elapsed;

canvas.height = 400;
canvas.width = 760;

// Images
const playerSprite = new Image(); // 128 x 192 ideal
playerSprite.src = "img/characters/p3.png";
const imagenFondo = new Image();
imagenFondo.src = "img/fondo.png";
const pasto = new Image();
pasto.src = "img/pasto.png";

// BattleTile Instance
let grass1 = new BattleTile (pasto);
grass1.setAttributes(50, 200, 25); //(x,y,ratio)

// Player Instance
let juan = new Player (playerSprite);
juan.setPosition(25, 65);

function animate () {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed <= fpsInterval) return;
    then = now - (elapsed % fpsInterval);
    context.drawImage(imagenFondo, 0, 0, canvas.width, canvas.height);
    grass1.drawTile();
    juan.drawSprite();
    grass1.showHitbox(context);
    juan.showHitbox(context);
    grass1.collisionDetect( juan.getHitboxCoordinates() );
    grass1.battleLauncher();
    juan.update();
    requestAnimationFrame(animate);
}

function startAnimating (fps) {
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();
}

startAnimating(30);