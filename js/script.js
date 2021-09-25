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


// let window_height = window.innerHeight;
// let window_width = window.innerWidth;
let fpsInterval, startTime, now, then, elapsed;


canvas.height = 400;
canvas.width = 760;

// Imagenes
const playerSprite = new Image(); // 128 x 192 ideal
playerSprite.src = "img/characters/p3.png";
const imagenFondo = new Image();
imagenFondo.src = "img/fondo.png";
const pasto = new Image();
pasto.src = "img/pasto.png";

// BattleTile Instance
let grass = new BattleTile (pasto);
grass.setTilePosX = 30;
grass.setTilePosY = 200;
grass.setTileRatio = 10;
grass.setTileRatio = 1;

// Player Instance
let juan = new Player (playerSprite);
juan.setPlayerPosX = 5;
juan.setPlayerPosY = 65;
juan.setPlayerWidth = 128;
juan.setPlayerHeight = 192;
juan.setPlayerSpeed = 5;

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
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        context.drawImage(imagenFondo, 0, 0, canvas.width, canvas.height);
        grass.drawTile(context);
        juan.drawSprite(context);
        grass.showTileHitbox(context);
        juan.showPlayerHitbox(context);
        collisionDetect( juan.getHitbox(), grass.getHitbox() );
        //grass.battleLauncher();
        requestAnimationFrame(animate);
        juan.movePlayer();
        juan.handlePlayerFrame();
    }
}

startAnimating(24);

function isPlayerOffTheTile (playerHitbox, battleTile) {
    return playerHitbox[0] >= battleTile[2] + battleTile[0] - 5 ||
           playerHitbox[2] + playerHitbox[0] <= battleTile[0] + 5 ||
           playerHitbox[3] + playerHitbox[1] <= battleTile[1] ||
           playerHitbox[3] + playerHitbox[1] >= battleTile[3] + battleTile[1] + 10
}

function collisionDetect(playerHitbox, ...battleTileHitbox) {
    resetHitboxColor();
    battleTileHitbox.forEach (function (battleTile) {
        grass.playerOnTile = false;
        if ( isPlayerOffTheTile(playerHitbox, battleTile) ) return;
        grass.playerOnTile = true;
        changeHitboxColor();
    })
}

function resetHitboxColor () {context.strokeStyle = "black";}
function changeHitboxColor () {context.strokeStyle = "red";}