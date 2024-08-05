import { degreesToRad } from "./utils.js"
import * as entity from "./model/entity.js"

class MapObject{
    data: string
    constructor(data: string) {
        this.data = data
    }
    isEmpty() : boolean {
        return this.data == ""
    }
}

export class World{
    mapValue = [
        [1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,1,0,0,0,1,0,1],
        [1,0,0,1,1,1,0,0,0,0,1],
        [1,0,0,0,1,0,0,0,1,0,1],
        [1,0,0,0,0,0,0,1,1,0,1],
        [1,0,0,0,1,1,0,0,1,0,1],
        [1,1,1,0,0,0,0,0,1,0,1],
        [1,0,1,0,1,1,1,0,0,0,1],
        [1,0,1,1,0,0,1,0,1,0,1],
        [1,0,0,0,1,1,1,1,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1]
    ]
    fov = 60
    angle = 0.0
    y = 1
    x = 1
    step = 0.01
    users = new Map<string, entity.User>();
    distantToWall(rayCount:number ): number[]{
        var mv = [...this.mapValue]
        this.users.forEach(user => {
            mv[Math.trunc(user.PossY)][Math.trunc(user.PossX)] = 1
        });
        let angleStep = this.fov/rayCount
        let lAngle = this.angle - this.fov/2
        let lengths: number[] = []
        for(let ray = 0; ray < rayCount; ray++){
            let lx = this.x, ly = this.y, totalDist = 0
            let lMapObject = 0
            do{
                ly += this.step * Math.sin(degreesToRad(lAngle))
                lx += this.step * Math.cos(degreesToRad(lAngle))
                lMapObject = mv[Math.trunc(ly)][Math.trunc(lx)]
                totalDist += this.step
            } while(lMapObject !== undefined && lMapObject != 1)  
            lengths.push(totalDist * fishEyeCoef(lAngle, this.angle, this.fov))
            lAngle+=angleStep
        }
        this.users.forEach(user => {
            mv[Math.trunc(user.PossY)][Math.trunc(user.PossX)] = 0
        });
        return lengths   
    } 
}

export let actualWorld = new World()
const Empt: MapObject = new MapObject("")
const Wall: MapObject = new MapObject("Wall")

// let map: MapObject[][] = [
//     [Wall,Wall,Wall,Wall,Wall],
//     [Wall,Empt,Empt,Empt,Wall],
//     [Wall,Empt,Wall,Empt,Wall],
//     [Wall,Empt,Empt,Empt,Wall],
//     [Wall,Wall,Wall,Wall,Wall],
// ] 

let fishEyeCoef = (curAngle: number, baseAngle: number, fov: number) => (
    Math.sin(degreesToRad(Math.abs(90-Math.abs(baseAngle-curAngle))))
    // 1
)

