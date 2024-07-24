var canvas : HTMLCanvasElement | null = document.getElementById('mainCanvas') as HTMLCanvasElement
if (!canvas){
    console.error("failed to create canvas");
}
var canvasContext = canvas.getContext('2d')

export function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw()
}

export function drawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string) {
    ctx.beginPath(); // Начало нового пути
    ctx.moveTo(x1, y1); // Перемещение пера к начальной точке (x1, y1)
    ctx.lineTo(x2, y2); // Проведение линии к конечной точке (x2, y2)
    ctx.strokeStyle = color; // Установка цвета линии
    ctx.stroke(); // Рисование линии
}

export function getRandomColor(): string {
    const r = Math.floor(Math.random() * 256); // Случайное значение для красного компонента (от 0 до 255)
    const g = Math.floor(Math.random() * 256); // Случайное значение для зеленого компонента (от 0 до 255)
    const b = Math.floor(Math.random() * 256); // Случайное значение для синего компонента (от 0 до 255)
    return `rgb(${r}, ${g}, ${b})`; // Возвращает строку цвета в формате 'rgb(r, g, b)'
}

export function draw(){
    for (var x = 0; x < canvas.width-1; x++){
        drawLine(canvasContext, x, 0, x+1, canvas.height, getRandomColor())
    }
}
