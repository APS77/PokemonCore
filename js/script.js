let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let window_height = window.innerHeight;
let window_width = window.innerWidth;

canvas.height = 400;
canvas.width = 760;

const keys = [];

//------------------------------------------------------------------------------------------
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
        if (player.posX < canvas.width - player.ancho/2) {
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
        context.drawImage(imagenFondo, 0, 0, canvas.width, canvas.height)
        drawSprite(playerSprite, player.ancho * player.frameX, player.alto * player.frameY, player.ancho, player.alto, player.posX, player.posY, player.ancho/1.8, player.alto/1.8);
        requestAnimationFrame(animate);
        movePlayer();
        handlePlayerFrame();    
    }
}

startAnimating(22);


/*class Player {
    constructor (posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.ancho = 123.75;
        this.alto = 128.75;
    }
    draw (context) {
        context.beginPath();
        context.strokeStyle = "blue";
        context.lineWidth = 2;
        context.font = "15px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText("Player", (this.posX + 50/2)  , (this.posY + 50/2));
        context.rect(this.posX, this.posY, 50, 50);
        context.stroke();
    }
}
let posX = 20;
let posY = 20;
let player1 = new Player (posX, posY);
player1.draw(context);
*/
//------------------------------------------------------------------------------------------
/*function move (e) {
    // var keyCode = (window.event) ? e.which : e.keyCode;
    // alert(keyCode);
    let velocidad = 15;
    // ARRIBA = W
    if (e.keyCode  == 87) {
        posY -= velocidad;
    }
    // ABAJO = S
    if (e.keyCode  == 83) {
        posY += velocidad;
    }
    // IZQUIERDA = A
    if (e.keyCode  == 65) {
        posX -= velocidad;
    }
    // DERECHA = D
    if (e.keyCode  == 68) {
        posX += velocidad;
    }

    canvas.width = canvas.width;
    let player1 = new Player (posX, posY);
    player1.draw(context);
    console.log("posX: "+ posX + " | posY: " + posY)

}

document.onkeydown = move; */
