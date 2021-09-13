let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let window_height = window.innerHeight;
let window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#784212";

class Rectangulo {
    constructor (posX, posY, ancho, alto, color, grosor, texto) {
        this.posX = posX;
        this.posY = posY;
        this.ancho = ancho;
        this.alto = alto;
        this.color = color;
        this.grosor = grosor;
        this.texto = texto;
    }

    draw (context) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.lineWidth = this.grosor;
        context.font = "15px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(this.texto, (this.posX + this.ancho/2)  , (this.posY + this.alto/2));
        context.rect(this.posX, this.posY, this.ancho, this.alto);
        context.stroke();
    }
}


// PLAYER
let posX = 100;
let posY = 50;
let anchoPlayer = 50;
let altoPlayer = 50;
let colorPlayer = "blue";
let player = new Rectangulo (posX, posY, anchoPlayer, altoPlayer, colorPlayer, 2, "Player");
player.draw(context);
// PARED
let pared = new Rectangulo (400, 10, 100, 400, "black", 2, "Pared");
pared.draw(context);

function move (e) {
    // var keyCode = (window.event) ? e.which : e.keyCode;
    // alert(keyCode);
    let velocidad = 10;
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
    let player = new Rectangulo (posX, posY, anchoPlayer, altoPlayer, colorPlayer, 2, "Player");
    player.draw(context);
    let pared = new Rectangulo (400, 0, 100, 400, "black", 2, "Pared");
    pared.draw(context);
    console.log("posX: "+ posX + " | posY: " + posY)

}

document.onkeydown = move;
