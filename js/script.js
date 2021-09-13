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

let miRectangulo = new Rectangulo (100, 50, 100, 100, "blue", 5, "Player");
miRectangulo.draw(context);