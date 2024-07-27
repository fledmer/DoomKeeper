import { actualMap } from "./map.js";
var canvas = document.getElementById('mainCanvas');
if (!canvas) {
    console.error("failed to create canvas");
}
var canvasContext = canvas.getContext('2d');
export function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
}
export function drawLine(ctx, x1, y1, x2, y2, color) {
    ctx.setLineDash([1, 1, 1, 1]);
    ctx.beginPath(); // Начало нового пути
    ctx.moveTo(x1, y1); // Перемещение пера к начальной точке (x1, y1)
    ctx.lineTo(x2, y2); // Проведение линии к конечной точке (x2, y2)
    ctx.strokeStyle = color; // Установка цвета линии 
    ctx.stroke(); // Рисование линии
}
function getColorByDistance(v) {
    let c = 50;
    const r = Math.floor(200 - v * c);
    const g = Math.floor(200 - v * c);
    const b = Math.floor(200 - v * c);
    return `rgb(${r}, ${g}, ${b})`;
}
export function getRandomColor() {
    const r = Math.floor(Math.random() * 256); // Случайное значение для красного компонента (от 0 до 255)
    const g = Math.floor(Math.random() * 256); // Случайное значение для зеленого компонента (от 0 до 255)
    const b = Math.floor(Math.random() * 256); // Случайное значение для синего компонента (от 0 до 255)
    return `rgb(${r}, ${g}, ${b})`; // Возвращает строку цвета в формате 'rgb(r, g, b)'
}
export function draw() {
    let distances = actualMap.distantToWall(canvas.width - 1);
    for (var x = 0; x < canvas.width - 1; x++) {
        let h = Math.min(canvas.height, canvas.height / ((distances[x])));
        let sh = (canvas.height - h) / 2;
        drawLine(canvasContext, x, 0, x + 1, sh, 'Red');
        drawLine(canvasContext, x, sh, x + 1, h + sh, getColorByDistance(distances[x]));
        drawLine(canvasContext, x, h + sh, x + 1, canvas.height, 'Blue');
    }
}
//# sourceMappingURL=draw.js.map