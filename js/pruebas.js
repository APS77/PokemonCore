let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let window_height = window.innerHeight;
let window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#784212";

// Rectángulo fillRect(ejex,ejey,ancho,alto)
context.fillStyle = "blue";
context.fillRect(10, 10, 100, 100);

context.fillStyle = "purple";
context.fillRect(25, 200, 80, 100);

// Circulo 
context.beginPath();
context.strokeStyle = "red";
context.lineWidth = 10
context.arc(200,160,30,0,Math.PI * 2, false) // arc(ejex, ejey, radio, circulo completo, 2pi, falso = antihorario)
context.stroke();
context.closePath();

class Circulo {
    constructor (posX, posY, radio, color, grosor, texto) {
        this.posX = posX;
        this.posY = posY;
        this.radio = radio;
        this.color = color;
        this.grosor = grosor;
        this.texto = texto;
    }

    draw(context) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.lineWidth = this.grosor;
        // Texto
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.texto, this.posX, this.posY);

        context.arc(this.posX, this.posY, this.radio, 0, Math.PI*2, false);
        context.stroke();
        context.closePath();
    }
}

let miCirculo = new Circulo(100, 100, 40, "blue", 10, "Player");
miCirculo.draw(context);