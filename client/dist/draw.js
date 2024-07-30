import { actualMap } from "./map.js";
var canvas = document.getElementById('mainCanvas');
if (!canvas) {
    console.error("failed to create canvas");
}
var canvasContext = canvas.getContext('2d');
export function init() {
    resizeCanvas();
    // canvasContext.globalCompositeOperation = "overlay"
    canvasContext.globalAlpha = 1;
}
export function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
export function drawSolidLine(ctx, x1, y1, x2, y2, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
}
function drawBorderLine(ctx, x1, y1, x2, y2, color, radius) {
    drawSolidLine(ctx, x1, y1, x2, y2, color);
    ctx.fillStyle = 'black';
    ctx.fillRect(x1, y1, radius, radius);
    ctx.fillRect(x2, y2, radius, radius);
}
function getColorByDistance(distance) {
    let c = 50;
    const r = Math.floor(250 - distance * c);
    const g = Math.floor(250 - distance * c);
    const b = Math.floor(250 - distance * c);
    return `rgb(${r}, ${g}, ${b}, 1.0)`;
}
export function getRandomColor() {
    const r = Math.floor(Math.random() * 256); // Случайное значение для красного компонента (от 0 до 255)
    const g = Math.floor(Math.random() * 256); // Случайное значение для зеленого компонента (от 0 до 255)
    const b = Math.floor(Math.random() * 256); // Случайное значение для синего компонента (от 0 до 255)
    return `rgbа(${r}, ${g}, ${b}, 1)`; // Возвращает строку цвета в формате 'rgb(r, g, b)'
}
let background = new Image();
background.src = "./resources/skybox.jpg";
let land = new Image();
land.src = "./resources/dirt.png";
export function draw() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.drawImage(background, 0, 0, canvas.width, canvas.height);
    // canvasContext.drawImage(land,0, canvas.height/2, canvas.width, canvas.height/2)
    let distances = actualMap.distantToWall(canvas.width - 1);
    for (var x = 0; x < canvas.width - 1; x++) {
        let h = Math.min(canvas.height, canvas.height / ((distances[x])));
        let sh = (canvas.height - h) / 2;
        drawBorderLine(canvasContext, x, sh, x + 1, h + sh, getColorByDistance(distances[x]), 2);
        // drawSolidLine(canvasContext, x, sh, x+1, h + sh, getColorByDistance(distances[x]))
        drawSolidLine(canvasContext, x, h + sh, x + 1, canvas.height, 'rgb(117,92,72)');
    }
}
//# sourceMappingURL=draw.js.map