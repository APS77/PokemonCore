import { overworldMusic } from "./audio.js";
import { Player } from "./player_class.js";
import { createBattle } from "./battle.js"
overworldMusic.play();

const config = {
    debug: false
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
playerSprite.src = "img/characters/p3.png";
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
        //createBattle(context, canvas);
        creaPasto(30, 200, 6, 7);
        creaPasto(260, 80, 9, 5);
        creaPasto(540, 280, 9, 3);
        creaPasto(600, 60, 6, 3);
        juan.drawSprite();
        //showColissionHitbox(juan.getHitboxCoordinates(), rectPasto1, rectPasto2, rectPasto3, rectPasto4);
        colissionDetect(juan.getHitboxCoordinates(), rectPasto1, rectPasto2, rectPasto3, rectPasto4);
        
        //showGrassHitbox(rectPasto1, rectPasto2, rectPasto3, rectPasto4);
        
        juan.showHitbox();
        requestAnimationFrame(animate);
        juan.movePlayer();
        juan.handlePlayerFrame();
    }
}

startAnimating(24);

function infoPasto (x, posY, nHorizontal, nVertical) {
    return [x , posY, nHorizontal * 20, nVertical * 20];
}

let rectPasto1 = infoPasto(30, 200, 6, 7);
let rectPasto2 = infoPasto(260, 80, 9, 5);
let rectPasto3 = infoPasto(540, 280, 9, 3);
let rectPasto4 = infoPasto(600, 60, 6, 3);

function colissionDetect(hitbox, ...rectPasto) {
    let { x, y, width, height } = hitbox;
    rectPasto.forEach (function (pasto) {
        if (x >= pasto[2] + pasto[0] - 5 ||
            width + x <= pasto[0] + 5 ||
            height + y <= pasto[1] ||
            height + y >= pasto[3] + pasto[1] + 10
        ) {
            // no colission
        } else {
            // colission
            console.log("Colision detectada");
            //createBattle(context, canvas);
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

function showColissionHitbox (hitbox, ...rectPasto) {
    // show player's hitbox
    let { x, y, width, height } = hitbox;
    context.rect(x, y, width, height);
    context.stroke(); 

    rectPasto.forEach (function (pasto) {
        if (x >= pasto[2] + pasto[0]  - 5 ||
            width + x <= pasto[0] + 5 ||
            height + y <= pasto[1] ||
            height + y >= pasto[3] + pasto[1] + 10
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
    })
}

// Funcion que crea seccion de pasto como matriz rectangular
function creaPasto (initialX, initialY, nHorizontal, nVertical) {
    for (let x = initialX; x < initialX + nHorizontal * 20; x += 20)
        for (let y = initialY; y < initialY + nVertical * 20; y += 20)
            context.drawImage(pasto, x, y, 20, 20);
}




function getKeyCode (e) {
    var keyCode = (window.event) ? e.which : e.keyCode;
    console.log(keyCode);
}
//windows.addEventListener("keydown", getKeyCode);