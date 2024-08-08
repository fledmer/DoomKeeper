import { degreesToRad } from "../utils.js";
class MapObject {
    data;
    constructor(data) {
        this.data = data;
    }
    isEmpty() {
        return this.data == "";
    }
}
export class WorldController {
    mapValue = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    fov = 60;
    angle = 0.0;
    y = 1;
    x = 1;
    step = 0.01;
    users = new Map();
    distantToWall(rayCount) {
        var mv = this.mapValue;
        let angleStep = this.fov / rayCount;
        let lAngle = this.angle - this.fov / 2;
        let lengths = [];
        for (let ray = 0; ray < rayCount; ray++) {
            let lx = this.x, ly = this.y, totalDist = 0;
            let lMapObject = 0;
            do {
                ly += this.step * Math.sin(degreesToRad(lAngle));
                lx += this.step * Math.cos(degreesToRad(lAngle));
                lMapObject = mv[Math.trunc(ly)][Math.trunc(lx)];
                totalDist += this.step;
            } while (lMapObject !== undefined && lMapObject != 1);
            lengths.push(totalDist * fishEyeCoef(lAngle, this.angle, this.fov));
            lAngle += angleStep;
        }
        return lengths;
    }
}
export let actualWorld = new WorldController();
let fishEyeCoef = (curAngle, baseAngle, fov) => (Math.sin(degreesToRad(Math.abs(90 - Math.abs(baseAngle - curAngle))))
// 1
);
//# sourceMappingURL=map_controller.js.map