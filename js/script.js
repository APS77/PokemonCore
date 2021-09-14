let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let window_height = window.innerHeight;
let window_width = window.innerWidth;

let fps, fpsInterval, startTime, now, then, elapsed;

canvas.height = 400;
canvas.width = 760;

// Imagenes
const playerSprite = new Image();
playerSprite.src = "img/player2.png";
const imagenFondo = new Image();
imagenFondo.src = "img/fondo.png";
const pasto = new Image();
pasto.src = "img/pasto.png";

let keys = [];

// Player
const player = {
    posX: 14,
    posY: 55,
    width: 64,
    height: 64,
    frameX: 0,
    frameY: 0,
    speed: 2.5,
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
        if (player.posX > -6) {
            player.posX -= player.speed;
        }
    }
    if (keys[0] == 68 && keys.length == 1) {
        player.frameY = 2;
        if (player.posX < canvas.width - player.width/2.1) {
            player.posX += player.speed;
        }
    }
    if (keys[keys.length - 1] == 87 || keys[0] == 87 || keys[0] == 83 && keys[1] == 87 || keys[0] == 87 && keys[1] == 83) {
        player.frameY = 3;
        if (player.posY > 28) {
            player.posY -= player.speed;
        }    
    }
    if (keys[keys.length - 1] == 83 && keys[0] != 87 || keys[0] == 83 && keys[1] != 87) {
        player.frameY = 0;
        if (player.posY < canvas.height - player.height/1.8) {
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
        creaPasto(20, 200, 6, 7);
        creaPasto(260, 80, 9, 5);
        creaPasto(540, 280, 9, 3);
        creaPasto(600, 55, 6, 3);
        drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY,
        player.width, player.height, player.posX, player.posY, player.width/1.8, player.height/1.8);
        requestAnimationFrame(animate);
        movePlayer();
        handlePlayerFrame();  
        //rectPlayer(player.posX, player.posY, player.width, player.height);  
        // SOLUCIONAR CONSUME MUCHA MEMORIA
        colissionDetect(rectPlayer(player.posX, player.posY), rectPasto1);
        colissionDetect(rectPlayer(player.posX, player.posY), rectPasto2);
    }
}

function rectPlayer(posX, posY) {
    return [posX, posY, posX + 20, posY + 20];
}
// Pasto y sus funcionalidades

// Funcion que da info de los pixeles que ocupa cada seccion de pasto (manual):
// Con esta info se le puede dar funcionalidad despues
function infoPasto (posX, posY, nHorizontal, nVertical) {
    //console.log(`Seccion de pasto iniciada en x: ${posX} y: ${posY}`)
    //console.log("Pos Inicial X: " + posX + " | Pos Final X: " + (posX + nHorizontal * 20))
    //console.log("Pos Inicial Y: " + posY + " | Pos Final Y: " + (posY + nVertical * 20))
    return [posX , posY - 10, posX + 5 + (nHorizontal - 1) * 20, posY + nVertical * 20 - 10];
}

let rectPasto1 = infoPasto(20, 200, 6, 7);
let rectPasto2 = infoPasto(260, 80, 9, 5);
let rectPasto3 = infoPasto(540, 280, 9, 3);
let rectPasto4 = infoPasto(600, 55, 6, 3);

function colissionDetect(rectPlayer, rectPasto) {
    let p = rectPasto,
        j = rectPlayer;
    if (j[0] > p[2] ||
        j[2] < p[0] ||
        j[3] < p[1] ||
        j[3] > p[3]
    ) {
        // no colission
        console.log(p);
        console.log(j);
    } else {
        console.log("Colision detectada");
    }
}

// Funcion que crea seccion de pasto como matriz rectangular
function creaPasto (posX, posY, nHorizontal, nVertical) {
    for (let x = posX; x < posX + nHorizontal * 20; x += 20) {
        for (let y = posY; y < posY + nVertical * 20; y += 20) {
            context.drawImage(pasto, x, y, 20, 20);
        }
    }
}

startAnimating(100);


/*function move (e) {
    // var keyCode = (window.event) ? e.which : e.keyCode;
    // alert(keyCode);
}
document.onkeydown = move; */