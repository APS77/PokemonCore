import { audioObj } from "./audio.js";
import { Player } from "./test.js";

//audioObj.play();

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let window_height = window.innerHeight;
let window_width = window.innerWidth;

let fps, fpsInterval, startTime, now, then, elapsed;
let keys = [];

canvas.height = 400;
canvas.width = 760;

// Imagenes
const playerSprite = new Image(); // 128 x 192 ideal
playerSprite.src = "img/p5.png";
const imagenFondo = new Image();
imagenFondo.src = "img/fondo.png";
const pasto = new Image();
pasto.src = "img/pasto.png";

// Player
const player = {
    posX: 8,
    posY: 65,
    width: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
    speed: 5,
    moving: false
}

// Personaje, Movimiento E Imagen de fondo

function drawSprite (img, sX, sY, sW, sH, dX, dY, dW, dH) {
    context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

window.addEventListener("keydown", function (e) {
    if (keys.length == 0) {
        keys.push(e.keyCode);
        //console.log(keys);
    }
    if (keys[0] != e.keyCode && keys.length < 2) {
        keys.push(e.keyCode);
        //console.log(keys)
    }
})
window.addEventListener("keyup", function (e) {
    if(keys[1] == e.keyCode) {
        keys.pop();
        //console.log(keys);
    }
    if(keys[0] == e.keyCode) {
        keys.shift();
        //console.log(keys);
    }
    if (keys.length == 0) {
        player.moving = false;    
    }
})

function movePlayer () {  //  A D W S (en ese orden)
    if (keys[0] == 87 || keys[0] == 83 || keys[0] == 65 || keys[0] == 68) player.moving = true;

    if (keys[0] == 65 && keys.length == 1 || keys[0] == 68 && keys[1] == 65 || keys[0] == 65 && keys[1] == 68) {
        player.frameY = 1;
        if (player.posX > 0) {
            player.posX -= player.speed;
        }
    }
    if (keys[0] == 68 && keys.length == 1) {
        player.frameY = 2;
        if (player.posX < canvas.width - player.width + 10) {
            player.posX += player.speed;
        }
    }
    if (keys[keys.length - 1] == 87    ||
        keys[0] == 87                  || 
        keys[0] == 83 && keys[1] == 87 ||
        keys[0] == 87 && keys[1] == 83
        ){
        player.frameY = 3;
        if (player.posY > 20) {
            player.posY -= player.speed;
        }    
    }
    if (keys[keys.length - 1] == 83 && keys[0] != 87 || keys[0] == 83 && keys[1] != 87) {
        player.frameY = 0;
        if (player.posY < canvas.height - player.height + 10) {
            player.posY += player.speed;
        }
    }
}

function handlePlayerFrame () {
    (player.frameX < 3 && player.moving) ? 
    player.frameX++ : player.frameX = 0;
}

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
        colissionDetect(getHitbox(player.posX, player.posY, player.width, player.height), rectPasto1, rectPasto2, rectPasto3, rectPasto4);
        showColissionHitbox(getHitbox(player.posX, player.posY, player.width, player.height), rectPasto1, rectPasto2, rectPasto3, rectPasto4);
        //showGrassHitbox(rectPasto1, rectPasto2, rectPasto3, rectPasto4);
        drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY,
        player.width, player.height, player.posX, player.posY, player.width/1.3, player.height/1.3);
        requestAnimationFrame(animate);
        movePlayer();
        handlePlayerFrame();  
    }
}

function getHitbox(posX, posY, width, height) {
    return [posX + 2, posY + 5, width - 12, height - 18]; // hitbox Player
}

function infoPasto (posX, posY, nHorizontal, nVertical) {
    return [posX , posY, nHorizontal * 20, nVertical * 20];
}

let rectPasto1 = infoPasto(30, 200, 6, 7);
let rectPasto2 = infoPasto(260, 80, 9, 5);
let rectPasto3 = infoPasto(540, 280, 9, 3);
let rectPasto4 = infoPasto(600, 60, 6, 3);

function colissionDetect(getHitbox, ...rectPasto) {
    rectPasto.forEach (function (pasto) {
        if (getHitbox[0] >= pasto[2] + pasto[0]  ||
            getHitbox[2] + getHitbox[0] <= pasto[0]  ||
            getHitbox[3] + getHitbox[1] <= pasto[1] ||
            getHitbox[3] + getHitbox[1] >= pasto[3] + pasto[1] + 10
        ) {
            // no colission
        } else {
            // colission
            console.log("Colision detectada");
            // HACER ALGO AQUI
        }
    } )
}

function showHitbox (getHitbox) {
    // show player's hitbox
    context.rect(getHitbox[0], getHitbox[1], getHitbox[2], getHitbox[3])
    context.stroke(); 
}

function showGrassHitbox (...rectPasto) {
    rectPasto.forEach ( function (pasto) {
        context.beginPath();
        context.rect(pasto[0], pasto[1], pasto[2], pasto[3]);
        context.strokeStyle = "black";
        context.stroke(); 
    } )
}

function showColissionHitbox (getHitbox, ...rectPasto) {
    // show player's hitbox
    context.rect(getHitbox[0], getHitbox[1], getHitbox[2], getHitbox[3])
    context.stroke(); 

    rectPasto.forEach (function (pasto) {
        if (getHitbox[0] >= pasto[2] + pasto[0]  - 5||
            getHitbox[2] + getHitbox[0] <= pasto[0] + 5 ||
            getHitbox[3] + getHitbox[1] <= pasto[1] ||
            getHitbox[3] + getHitbox[1] >= pasto[3] + pasto[1] + 10
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

startAnimating(24);


function getKeyCode (e) {
    var keyCode = (window.event) ? e.which : e.keyCode;
    console.log(keyCode);
}
//windows.addEventListener("keydown", getKeyCode);