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
playerSprite.src = "img/characters/p1.png";
const imagenFondo = new Image();
imagenFondo.src = "img/fondo.png";
const grass = new Image();
grass.src = "img/pasto.png";

// Player Instance
let player = new Player (playerSprite);
player.setPlayerPosX = 5;
player.setPlayerPosY = 65;
player.setPlayerWidth = 128;
player.setPlayerHeight = 192;
player.setPlayerSpeed = 5;

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
        createGrass(30, 200, 6, 7);
        createGrass(260, 80, 9, 5);
        createGrass(540, 280, 9, 3);
        createGrass(600, 60, 6, 3);
        player.drawSprite();
        //showColissionHitbox(player.getHitboxCoordinates(), rectPasto1, rectPasto2, rectPasto3, rectPasto4);
        colissionDetect(player.getHitboxCoordinates(), rectPasto1, rectPasto2, rectPasto3, rectPasto4);
        
        //showGrassHitbox(rectPasto1, rectPasto2, rectPasto3, rectPasto4);
        
        player.showHitbox();
        requestAnimationFrame(animate);
        player.movePlayer();
        player.handlePlayerFrame();
    }
}

startAnimating(24);

function infoPasto (x, y, nHorizontal, nVertical) {
    return [x , y, nHorizontal * 20, nVertical * 20];
}

let rectPasto1 = infoPasto(30, 200, 6, 7);
let rectPasto2 = infoPasto(260, 80, 9, 5);
let rectPasto3 = infoPasto(540, 280, 9, 3);
let rectPasto4 = infoPasto(600, 60, 6, 3);

function colissionDetect(hitbox, ...rectPasto) {
    let { x, y, width, height } = hitbox;
    rectPasto.forEach (function (grass) {
        if (x >= grass[2] + grass[0] - 5 ||
            width + x <= grass[0] + 5 ||
            height + y <= grass[1] ||
            height + y >= grass[3] + grass[1] + 10
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
    rectPasto.forEach ( function (grass) {
        context.beginPath();
        context.rect(grass[0], grass[1], grass[2], grass[3]);
        context.strokeStyle = "black";
        context.stroke(); 
    } )
}

function showColissionHitbox (hitbox, ...rectPasto) {
    // show player's hitbox
    let { x, y, width, height } = hitbox;
    context.rect(x, y, width, height);
    context.stroke(); 

    rectPasto.forEach (function (grass) {
        if (x >= grass[2] + grass[0]  - 5 ||
            width + x <= grass[0] + 5 ||
            height + y <= grass[1] ||
            height + y >= grass[3] + grass[1] + 10
        ) {
            // no colission
            context.beginPath();
            context.rect(grass[0], grass[1], grass[2], grass[3]);
            context.strokeStyle = "black";
            context.stroke(); 
        } else {
            // colission
            context.beginPath();
            context.rect(grass[0], grass[1], grass[2], grass[3]);
            context.strokeStyle = "red";
            context.stroke();
        }
    })
}

// Funcion que crea seccion de grass como matriz rectangular
function createGrass (initialX, initialY, nHorizontal, nVertical) {
    for (let x = initialX; x < initialX + nHorizontal * 20; x += 20)
        for (let y = initialY; y < initialY + nVertical * 20; y += 20)
            context.drawImage(grass, x, y, 20, 20);
}




function getKeyCode (e) {
    var keyCode = (window.event) ? e.which : e.keyCode;
    console.log(keyCode);
}
//windows.addEventListener("keydown", getKeyCode);