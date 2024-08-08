import { UserController } from './controller/user_controller.js';
import {DrawContoller} from "./controller/draw_controller.js"
import * as input from "./controller/input_controller.js"
import * as server from "./server/client.js" 
import { User } from './model/entity.js';
//let socketUrl = "ws://"+window.location.hostname+":8080"+"/api/data_stream"  
let socketUrl = "ws://"+"localhost"+":8080"+"/api/data_stream" 


var canvas : HTMLCanvasElement | null = document.getElementById('mainCanvas') as HTMLCanvasElement
if (!canvas){
    console.error("failed to create canvas");
}   


window.addEventListener('DOMContentLoaded', () => {
    var uc: UserController = new UserController(new User(1,1))
    new server.ClientServer(socketUrl,uc).Connect()
    var ic = new input.InputController(uc)
    var dc = new DrawContoller(canvas)
    dc.animate()
})
// requestAnimationFrame(animate)