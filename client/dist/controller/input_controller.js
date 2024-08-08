import { actualWorld } from "./map_controller.js";
import { degreesToRad } from "../utils.js";
import * as server from "../server/client.js";
let speed = 0.1;
let playerController;
export class InputController {
    playerController;
    constructor(playerController) {
        this.playerController = playerController;
        document.addEventListener('keydown', (event) => {
            switch (event.code) {
                case 'ArrowRight':
                    actualWorld.angle += 10;
                    actualWorld.angle = actualWorld.angle % 360;
                    break;
                case 'ArrowLeft':
                    actualWorld.angle -= 10;
                    actualWorld.angle = actualWorld.angle % 360;
                    break;
                case 'KeyW':
                    actualWorld.x += speed * Math.cos(degreesToRad(actualWorld.angle));
                    actualWorld.y += speed * Math.sin(degreesToRad(actualWorld.angle));
                    server.currentServer.Move(actualWorld.x, actualWorld.y);
                    break;
                case 'KeyS':
                    actualWorld.x -= speed * Math.cos(degreesToRad(actualWorld.angle));
                    actualWorld.y -= speed * Math.sin(degreesToRad(actualWorld.angle));
                    server.currentServer.Move(actualWorld.x, actualWorld.y);
                    break;
                case 'KeyD':
                    actualWorld.x += speed * Math.cos(degreesToRad(actualWorld.angle + 90));
                    actualWorld.y += speed * Math.sin(degreesToRad(actualWorld.angle + 90));
                    break;
                case 'KeyA':
                    actualWorld.x += speed * Math.cos(degreesToRad(actualWorld.angle - 90));
                    actualWorld.y += speed * Math.sin(degreesToRad(actualWorld.angle - 90));
                    break;
            }
        });
    }
}
//# sourceMappingURL=input_controller.js.map