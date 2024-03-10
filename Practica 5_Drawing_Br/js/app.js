const SHAPES_AMOUNT = 36;
const SHAPE_SIZE = 20;


const container = document.querySelector(".container");
const containerWidth = container.offsetWidth;
const containerHeight = container.offsetHeight;

function createShape(type) {
 
  const shape = document.createElement("div");
  shape.classList.add("shape", type);
  
  
  const x = Math.random() * (containerWidth - SHAPE_SIZE); 
  const y = Math.random() * (containerHeight - SHAPE_SIZE);
  shape.style.top = `${y}px`;
  shape.style.left = `${x}px`;

 
  container.appendChild(shape);
}

// Crear las formas
for (let i = 0; i < SHAPES_AMOUNT; i++) {
  createShape("circle");
  createShape("square");
  createShape("triangle");
  const canvas = document.getElementById('canvas');
const btnIncrementar = document.getElementById('btnMas');
const btnReducir = document.getElementById('btnMenos');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const limpiarEl = document.getElementById('limpiar');

const contexto = canvas.getContext('2d');
let size = 10;
let EsPresionado = false;
let BorrarManualmente = false; 
colorEl.value = '#000000'; 
let color = colorEl.value;
let x;
let y;

canvas.addEventListener('mousedown', (e) => {
    EsPresionado = true;
    x = e.offsetX;
    y = e.offsetY;
});

document.addEventListener('mouseup', () => {
    EsPresionado = false;
    x = undefined;
    y = undefined;
});

function dibujarCirculo(x, y) {
    contexto.beginPath();
    contexto.arc(x, y, size, 0, Math.PI * 2);
    contexto.fillStyle = color;
    contexto.fill();
}

function dibujarLinea(x1, y1, x2, y2) {
    contexto.beginPath();
    contexto.moveTo(x1, y1);
    contexto.lineTo(x2, y2);
    contexto.strokeStyle = color;
    contexto.lineWidth = size * 2;
    contexto.stroke();
}

canvas.addEventListener('mousemove', (e) => {
    if (EsPresionado && !BorrarManualmente) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;
        dibujarCirculo(x2, y2);
        dibujarLinea(x, y, x2, y2);
        x = x2;
        y = y2;
    }
});

colorEl.addEventListener('input', (e) => {
    color = e.target.value;
});

btnIncrementar.addEventListener('click', () => {
    size += 1;
    if (size > 50) {
        size = 50;
    }
    sizeEl.innerText = size; 
});

btnReducir.addEventListener('click', () => {
    size -= 1;
    if (size < 1) {
        size = 1;
    }
    sizeEl.innerText = size; 
});



limpiarEl.addEventListener('click', () => {
    BorrarManualmente = !BorrarManualmente; 
    if (!BorrarManualmente) {
        contexto.beginPath();
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (EsPresionado) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        if (BorrarManualmente) {
            
            contexto.globalCompositeOperation = 'destination-out'; 
            dibujarCirculo(x2, y2); 
            contexto.globalCompositeOperation = 'source-over'; 
        } else {
            
            dibujarCirculo(x2, y2);
            dibujarLinea(x, y, x2, y2);
        }

        x = x2;
        y = y2;
    }
});



}
function activarModoDibujo() {
    canvas.classList.remove('canvas-erase');
    canvas.classList.add('canvas-draw'); // Asegúrate de que esta clase define el cursor predeterminado para dibujar
}


canvas.addEventListener('mousedown', (e) => {
    isPressed = true;
    x = e.offsetX;
    y = e.offsetY;
    canvas.classList.add('canvas-painting'); // Cambia el cursor al empezar a pintar
});

canvas.addEventListener('mouseup', () => {
    isPressed = false;
    x = undefined;
    y = undefined;
    canvas.classList.remove('canvas-painting'); // Vuelve al cursor predeterminado al dejar de pintar
});

canvas.addEventListener('mouseleave', () => {
    isPressed = false;
    canvas.classList.remove('canvas-painting'); // Asegúrate de quitar el cursor de pintura si el mouse sale del canvas
});
