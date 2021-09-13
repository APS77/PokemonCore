let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let window_height = window.innerHeight;
let window_width = window.innerWidth;

canvas.height = 400;
canvas.width = 761;

const keys = [];

//------------------------------------------------------------------------------------------
const player = {
    posX: 0,
    posY: 38,
    ancho: 123.75,
    alto: 128.75,
    frameX: 0,
    frameY: 0,
    velocidad: 4,
    moving: false
}
const playerSprite = new Image();
playerSprite.src = "img/player.png";
const imagenFondo = new Image();
imagenFondo.src = "img/fondo.png";

function drawSprite (img, sX, sY, sW, sH, dX, dY, dW, dH) {
    context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}
function animate () {
    context.drawImage(imagenFondo, 0, 0, canvas.width, canvas.height)
    drawSprite(playerSprite, player.ancho * player.frameX, player.alto * player.frameY, player.ancho, player.alto, player.posX, player.posY, player.ancho/4, player.alto/4);
    requestAnimationFrame(animate);
    movePlayer();
}
animate();

window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
})
window.addEventListener("keyup", function (e) {
    delete keys[e.keyCode];
})

function movePlayer () {
    if (keys[87]) {
        player.frameY = 3;
        if (player.posY > 38) {
            player.posY -= player.velocidad;
        }    
    }
    if (keys[83]) {
        player.frameY = 0;
        if (player.posY < canvas.height - player.alto/4) {
            player.posY += player.velocidad;
        }
    }
    if (keys[65]) {
        player.frameY = 1;
        if (player.posX > 0) {
            player.posX -= player.velocidad;
        }
    }
    if (keys[68]) {
        player.frameY = 2;
        if (player.posX < canvas.width - player.ancho/4) {
            player.posX += player.velocidad;
        }
    }
}

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
