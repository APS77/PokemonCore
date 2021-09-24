import { overworldMusic } from "./audio.js";
import { Player } from "./player_class.js";
import { createBattle } from "./battle.js"
overworldMusic.play();

const config = {
    debug: true
};

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

// let window_height = window.innerHeight;
// let window_width = window.innerWidth;
let fpsInterval, startTime, now, then, elapsed;

canvas.height = 400;
canvas.width = 760;

// Imagenes
const playerSprite = new Image(); // 128 x 192 ideal
playerSprite.src = "img/characters/p1.png";
const imagenFondo = new Image();
imagenFondo.src = "img/fondo.png";
const grass = new Image();
grass.src = "img/pasto.png";

// Player Instance
let player = new Player (playerSprite);
player.setX = 5;
player.setY = 65;
player.setWidth = 128;
player.setHeight = 192;
player.setSpeed = 5;

startAnimating(24);

function startAnimating (fps) {
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate () {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed <= fpsInterval) return
    then = now - (elapsed % fpsInterval);
    context.drawImage(imagenFondo, 0, 0, canvas.width, canvas.height);
    //createBattle(context, canvas);
    createAllGrass();
    player.drawSprite();
    debug(player);
    detecCollisionBetweenPlayerAndTheGrass(player.getHitboxCoordinates(), allGrass);
    requestAnimationFrame(animate);
    player.movePlayer();
    player.handlePlayerFrame();
}
// ********************************************
// THESE SHOULD BE A STATIC CLASS IN OTHER FILE
// ********************************************
function debug(player) {
    if ( !config.debug ) return;
    showHitboxes(player);
}

function showHitboxes() {
    // Should be an static class that recieves the allGrass as argument
    showColissionHitbox(player.getHitboxCoordinates(), allGrass);
    player.showHitbox();
}
// ********************************************
// ********************************************
// ********************************************

// ********************************************
//   THESE SHOULD HAS A CLASS IN OTHER FILE
// ********************************************
function getGrassRectData (x, y, nHorizontal, nVertical) {
    return [x , y, nHorizontal * 20, nVertical * 20];
}

const grassRect1 = getGrassRectData(30, 200, 6, 7);
let grassRect2 = getGrassRectData(260, 80, 9, 5);
let grassRect3 = getGrassRectData(540, 280, 9, 3);
let grassRect4 = getGrassRectData(600, 60, 6, 3);
const allGrass = [grassRect1, grassRect2, grassRect3, grassRect4];

// Funcion que crea seccion de grass como matriz rectangular
function createGrass (initialX, initialY, nHorizontal, nVertical) {
    // *** Define a const that explains qhat is the 20 ***
    // *** Give more explanatory names to nHorizontal and nVertical ***
    for (let x = initialX; x < initialX + nHorizontal * 20; x += 20)
        for (let y = initialY; y < initialY + nVertical * 20; y += 20)
            context.drawImage(grass, x, y, 20, 20);
}

function createAllGrass() {
    createGrass(30, 200, 6, 7);
    createGrass(260, 80, 9, 5);
    createGrass(540, 280, 9, 3);
    createGrass(600, 60, 6, 3)
}

function detecCollisionBetweenPlayerAndTheGrass(playerHitbox, grassRects) {
    for (let i = 0; i < grassRects.length; i++) {
        if ( !isThePlayerCollidingWithTheGrass(playerHitbox, grassRects[i]) ) return;
        console.log("Colision detectada");
        //createBattle(context, canvas);
    }
}

function showColissionHitbox (playerHitbox, grassRects) {
    for (let i = 0; i < grassRects.length; i++) showColoredGrassHitbox(playerHitbox, grassRects[i]);
}

function showColoredGrassHitbox(playerHitbox, grass) {
    if ( isThePlayerCollidingWithTheGrass(playerHitbox, grass) ) showGrassHitbox(grass, 'red');
    else showGrassHitbox(grass, 'black');
}

function isThePlayerCollidingWithTheGrass(playerHitbox, grass) {
    return !(
        playerHitbox.x >= grass[2] + grass[0] - 5
        || playerHitbox.width + playerHitbox.x <= grass[0] + 5
        || playerHitbox.height + playerHitbox.y <= grass[1]
        || playerHitbox.height + playerHitbox.y >= grass[3] + grass[1] + 10
    );
}

function showGrassHitbox(grass, color) {
    context.beginPath();
    context.rect(grass[0], grass[1], grass[2], grass[3]);
    context.strokeStyle = color;
    context.stroke(); 
}
// ********************************************
// ********************************************
// ********************************************

function getKeyCode (e) {
    var keyCode = (window.event) ? e.which : e.keyCode;
    console.log(keyCode);
}
//windows.addEventListener("keydown", getKeyCode);