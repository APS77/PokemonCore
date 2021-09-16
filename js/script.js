import { overworldMusic } from "./audio.js";
import { Player } from "./player_class.js";

overworldMusic.play();

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

// let window_height = window.innerHeight;
// let window_width = window.innerWidth;

let fpsInterval, startTime, now, then, elapsed;


canvas.height = 400;
canvas.width = 760;

// Imagenes
const playerSprite = new Image(); // 128 x 192 ideal
playerSprite.src = "img/p2.png";
const imagenFondo = new Image();
imagenFondo.src = "img/fondo.png";
const pasto = new Image();
pasto.src = "img/pasto.png";

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
        creaPasto(30, 200, 6, 7);
        creaPasto(260, 80, 9, 5);
        creaPasto(540, 280, 9, 3);
        creaPasto(600, 60, 6, 3);
        //colissionDetect(juan.rectPlayer(), rectPasto1, rectPasto2, rectPasto3, rectPasto4);
        //showColissionHitbox(juan.rectPlayer(), rectPasto1, rectPasto2, rectPasto3, rectPasto4);
        //showGrassHitbox(rectPasto1, rectPasto2, rectPasto3, rectPasto4);
        juan.drawSprite();
        juan.showPlayerHitbox();
        requestAnimationFrame(animate);
        juan.movePlayer();
        juan.handlePlayerFrame();  
    }
}

startAnimating(24);

function infoPasto (posX, posY, nHorizontal, nVertical) {
    return [posX , posY, nHorizontal * 20, nVertical * 20];
}

let rectPasto1 = infoPasto(30, 200, 6, 7);
let rectPasto2 = infoPasto(260, 80, 9, 5);
let rectPasto3 = infoPasto(540, 280, 9, 3);
let rectPasto4 = infoPasto(600, 60, 6, 3);

function colissionDetect(rectPlayer, ...rectPasto) {
    rectPasto.forEach (function (pasto) {
        if (rectPlayer[0] >= pasto[2] + pasto[0]  ||
            rectPlayer[2] + rectPlayer[0] <= pasto[0]  ||
            rectPlayer[3] + rectPlayer[1] <= pasto[1] ||
            rectPlayer[3] + rectPlayer[1] >= pasto[3] + pasto[1] + 10
        ) {
            // no colission
        } else {
            // colission
            console.log("Colision detectada");
            // HACER ALGO AQUI
        }
    } )
}

function showGrassHitbox (...rectPasto) {
    rectPasto.forEach ( function (pasto) {
        context.beginPath();
        context.rect(pasto[0], pasto[1], pasto[2], pasto[3]);
        context.strokeStyle = "black";
        context.stroke(); 
    } )
}

function showColissionHitbox (rectPlayer, ...rectPasto) {
    // show player's hitbox
    context.rect(rectPlayer[0], rectPlayer[1], rectPlayer[2], rectPlayer[3])
    context.stroke(); 

    rectPasto.forEach (function (pasto) {
        if (rectPlayer[0] >= pasto[2] + pasto[0]  - 5||
            rectPlayer[2] + rectPlayer[0] <= pasto[0] + 5 ||
            rectPlayer[3] + rectPlayer[1] <= pasto[1] ||
            rectPlayer[3] + rectPlayer[1] >= pasto[3] + pasto[1] + 10
        ) {
            // no colission
            context.beginPath();
            context.rect(pasto[0], pasto[1], pasto[2], pasto[3]);
            context.strokeStyle = "black";
            context.stroke(); 
        } else {
            // colission
            context.beginPath();
            context.rect(pasto[0], pasto[1], pasto[2], pasto[3]);
            context.strokeStyle = "red";
            context.stroke();
        }
    } )
}

// Funcion que crea seccion de pasto como matriz rectangular
function creaPasto (posX, posY, nHorizontal, nVertical) {
    for (let x = posX; x < posX + nHorizontal * 20; x += 20) {
        for (let y = posY; y < posY + nVertical * 20; y += 20) {
            context.drawImage(pasto, x, y, 20, 20);
        }
    }
}




function getKeyCode (e) {
    var keyCode = (window.event) ? e.which : e.keyCode;
    console.log(keyCode);
}
//windows.addEventListener("keydown", getKeyCode);