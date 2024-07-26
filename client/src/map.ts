class MapObject{
    data: string
    constructor(data: string) {
        this.data = data
    }
    isEmpty() : boolean {
        return this.data == ""
    }
}

const Empt: MapObject = new MapObject("")
const Wall: MapObject = new MapObject("Wall")

// let map: MapObject[][] = [
//     [Wall,Wall,Wall,Wall,Wall],
//     [Wall,Empt,Empt,Empt,Wall],
//     [Wall,Empt,Wall,Empt,Wall],
//     [Wall,Empt,Empt,Empt,Wall],
//     [Wall,Wall,Wall,Wall,Wall],
// ] 

let map: number[][] = [
        [1,1,1,1,1],
        [1,0,0,0,1],
        [1,0,0,1,1],
        [1,0,0,0,1],
        [1,1,1,1,1],
    ] 

const fov = 80
let angle = 0.0
let y = 2
let x = 1

export function distantToWall(rayCount:number ): number[]{
    let angleStep = fov/rayCount
    let step = 0.5
    let lAngle = angle - fov/2
    let lengths: number[] = []
    for(let x = 0; x < rayCount; x++){
        try{
            let lx = x, ly = y, totalDist = 0
            let lMapObject = map[ly][lx]    
            while (lMapObject != 1){
                ly += step * Math.sin(lAngle)
                lx += step * Math.cos(lAngle)
                lMapObject = map[ly][lx]  
                totalDist += step
            }
            lengths.push(totalDist)
        }
        catch (e) {
            console.error("failed to calculate distance: " + e)
            lengths.push(100)
        }
    }
    return lengths   
} 