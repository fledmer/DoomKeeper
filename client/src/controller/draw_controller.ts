import {actualWorld} from "./map_controller"
import { degreesToRad } from "../utils";

export class DrawContoller{
    canvas: HTMLCanvasElement
    canvasContext: any
    constructor(canvas: HTMLCanvasElement){
        window.addEventListener('resize', ()=>{this.resizeCanvas()})
        this.canvasContext = canvas.getContext('2d')
        this.canvas = canvas
    }

    animate(){
        this.draw()
        requestAnimationFrame(()=>{this.animate()})
    }

    draw(){
        this.canvasContext.clearRect(0,0, this.canvas.width, this.canvas.height)
        this.canvasContext.drawImage(background,0,0, this.canvas.width, this.canvas.height)
        // canvasContext.drawImage(land,0, canvas.height/2, canvas.width, canvas.height/2)
        let distances = actualWorld.distantToWall(this.canvas.width-1)
        for (var x = 0; x < this.canvas.width-1; x++){
            let h = Math.min(this.canvas.height,this.canvas.height/((distances[x])))
            let sh = (this.canvas.height - h) / 2
            drawBorderLine(this.canvasContext, x, sh, x+1, h + sh, getColorByDistance(distances[x]), 2)
            // drawSolidLine(canvasContext, x, sh, x+1, h + sh, getColorByDistance(distances[x]))
            drawSolidLine(this.canvasContext, x, h + sh, x+1, this.canvas.height, 'rgb(117,92,72)')
        }
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}

export function drawSolidLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string) {
    ctx.fillStyle = color;
    ctx.fillRect(x1,y1,x2-x1,y2-y1)
}

function drawBorderLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string, radius: number){
    drawSolidLine(ctx,x1,y1,x2,y2,color)
    ctx.fillStyle = 'black';
    ctx.fillRect(x1, y1, radius, radius);
    ctx.fillRect(x2, y2, radius, radius);
}

function getColorByDistance(distance:number): string{
    let c = 50
    const r = Math.floor(250 - distance * c)
    const g = Math.floor(250 - distance * c)
    const b = Math.floor(250 - distance * c)
    return `rgb(${r}, ${g}, ${b}, 1.0)`;
}

export function getRandomColor(): string {
    const r = Math.floor(Math.random() * 256); // Случайное значение для красного компонента (от 0 до 255)
    const g = Math.floor(Math.random() * 256); // Случайное значение для зеленого компонента (от 0 до 255)
    const b = Math.floor(Math.random() * 256); // Случайное значение для синего компонента (от 0 до 255)
    return `rgbа(${r}, ${g}, ${b}, 1)`; // Возвращает строку цвета в формате 'rgb(r, g, b)'
}

let background = new Image()
background.src = "./resources/skybox.jpg";
let land = new Image()
land.src = "./resources/dirt.png";

//TODO: continue refactoring