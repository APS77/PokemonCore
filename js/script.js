let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let window_height = window.innerHeight;
let window_width = window.innerWidth;

canvas.height = 400;
canvas.width = 760;

const keys = [];

const player = {
    posX: -6,
    posY: 30,
    ancho: 64,
    alto: 64,
    frameX: 0,
    frameY: 0,
    velocidad: 5,
    moving: false
}
const playerSprite = new Image();
playerSprite.src = "img/player2.png";
const imagenFondo = new Image();
imagenFondo.src = "img/fondo.png";
const pasto = new Image();
pasto.src = "img/pasto.png";

// Personaje, Movimiento E Imagen de fondo

function drawSprite (img, sX, sY, sW, sH, dX, dY, dW, dH) {
    context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
    player.moving = true;
})
window.addEventListener("keyup", function (e) {
    delete keys[e.keyCode];
    player.moving = false;
})

function movePlayer () {  // W S A D (en ese orden)
    if (keys[87]) {
        player.frameY = 3;
        if (player.posY > 28) {
            player.posY -= player.velocidad;
        }    
    }
    if (keys[83]) {
        player.frameY = 0;
        if (player.posY < canvas.height - player.alto/1.8) {
            player.posY += player.velocidad;
        }
    }
    if (keys[65]) {
        player.frameY = 1;
        if (player.posX > -6) {
            player.posX -= player.velocidad;
        }
    }
    if (keys[68]) {
        player.frameY = 2;
        if (player.posX < canvas.width - player.ancho/2.1) {
            player.posX += player.velocidad;
        }
    }
}

function handlePlayerFrame () {
    (player.frameX < 3 && player.moving) ? 
    player.frameX++ : player.frameX = 0;
}

let fps, fpsInterval, startTime, now, then, elapsed;

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
        creaPasto(300, 100, 5, 3);
        creaPasto(600,50, 6, 2);
        creaPasto(50, 250, 6, 4);
        drawSprite(playerSprite, player.ancho * player.frameX, player.alto * player.frameY, player.ancho, player.alto, player.posX, player.posY, player.ancho/1.8, player.alto/1.8);
        requestAnimationFrame(animate);
        movePlayer();
        handlePlayerFrame();    
    }
}

startAnimating(22);

// Pasto y sus funcionalidades
// Funcion que crea seccion de pasto como matriz rectangular
function creaPasto (posX, posY, nHorizontal, nVertical) {
    for (let x = posX; x < posX + nHorizontal * 21; x += 21) {
        for (let y = posY; y < posY + nVertical * 21; y += 21) {
            context.drawImage(pasto, x, y, 21, 21);
        }
    }
}

// Funcion que da info de los pixeles que ocupa cada seccion de pasto (manual):
// Con esta info se le puede dar funcionalidad despues
function infoPasto (posX, posY, nHorizontal, nVertical) {
    console.log(`Seccion de pasto iniciada en x: ${posX} y: ${posY}`)
    console.log("Pos Inicial X: " + posX + " | Pos Final X: " + (posX + nHorizontal * 21))
    console.log("Pos Inicial Y: " + posY + " | Pos Final Y: " + (posY + nVertical * 21))
}
// infoPasto(300,100,5,3);

/*function move (e) {
    // var keyCode = (window.event) ? e.which : e.keyCode;
    // alert(keyCode);
}
document.onkeydown = move; */
