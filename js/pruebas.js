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