import {actualMap} from "./map.js"
import { degreesToRad } from "./utils.js"

let speed = 0.1

export function init(){
    document.addEventListener('keydown', (event)=>{
        switch (event.code){
            case 'ArrowRight':
                actualMap.angle += 10
                actualMap.angle = actualMap.angle % 360
                break
            case 'ArrowLeft':
                actualMap.angle -= 10
                actualMap.angle = actualMap.angle % 360
                break
            case 'ArrowUp':
                actualMap.x += speed * Math.cos(degreesToRad(actualMap.angle))
                actualMap.y += speed * Math.sin(degreesToRad(actualMap.angle))
                break
        }
    })
}