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
grass1.setAttributes(50, 200, 25);

// Player Instance
let juan = new Player (playerSprite);
juan.setPosition(25, 65);

function animate () {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        context.drawImage(imagenFondo, 0, 0, canvas.width, canvas.height);
        grass1.drawTile(context);
        juan.drawSprite(context);
        grass1.showHitbox(context);
        juan.showHitbox(context);
        collisionDetect( juan.getHitboxCoordinates(), grass1.getHitbox() );
        grass1.battleLauncher();
        requestAnimationFrame(animate);
        juan.update();
    }
}

function startAnimating (fps) {
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();
}

startAnimating(24);

// ####################################
//    CAMBIAR A LA CLASE BATTLE TILE
// ####################################
function isPlayerOffTheTile (playerHitbox, battleTile) {
    return playerHitbox.x >= battleTile[2] + battleTile[0] - 5 ||
        playerHitbox.width + playerHitbox.x <= battleTile[0] + 5 ||
        playerHitbox.height + playerHitbox.y <= battleTile[1] ||
        playerHitbox.height + playerHitbox.y >= battleTile[3] + battleTile[1] + 10
};

// HACER QUE FUNCIONE EN GENERAL!!
function collisionDetect(playerHitbox, ...battleTileHitbox) {
    resetHitboxColor();
    battleTileHitbox.forEach (function (battleTile) {
        grass1.playerOnTile = false;
        if ( isPlayerOffTheTile(playerHitbox, battleTile) ) {
            grass1.battleIndicator = [];
            return;    
        }
        grass1.playerOnTile = true;
        changeHitboxColor();
    })
}

function resetHitboxColor () {context.strokeStyle = "black";}
function changeHitboxColor () {context.strokeStyle = "red";}