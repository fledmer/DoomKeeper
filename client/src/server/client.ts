import { UserController } from './../controller/user_controller';
import * as events from "../model/external_events"
import * as game from "../controller/map_controller"
import * as entity from "../model/entity"

export var currentServer: ClientServer

enum ConnectionState{
    Disconnected = 1,
    Connected
}

export class ClientServer{
    serverURL: string
    socket: WebSocket
    state: ConnectionState
    user: entity.User

    constructor(serverURL: string, userController: UserController){
        this.serverURL = serverURL
        currentServer = this
    }

    Connect(){
        this.socket = new WebSocket(this.serverURL)

        this.socket.onmessage = (ev: MessageEvent) =>{
            this.OnMessage(ev)
        }
        this.socket.onerror = (ev: Event) => {
            console.error("Get error from server: ", ev)
        }
        this.socket.onclose = (ev: Event) => {
            console.info("server close the connection", ev)
        }
        this.socket.onopen = () =>{
            this.state = ConnectionState.Connected
            var pcE = new events.PlayerConnect(this.user)
            this.socket.send(JSON.stringify(new events.ExternalEvent("player_connect",pcE)))
        }
    }

    Move(x: number, y: number){
        if (!(this.state == ConnectionState.Connected)){
            return
        }
        var pm = new events.PlayerMove(this.user.PlayerID, x, y)
        var ee = new events.ExternalEvent("player_move", pm)
        this.socket.send(JSON.stringify(ee))
    }

    OnMessage(ev: MessageEvent){
        console.log("get event from server: ", ev)
        var event:events.ExternalEvent = JSON.parse(ev.data) as events.ExternalEvent
        console.log("parse event: ", event)
        switch (event.Name){
            case "player_move":
                var pm: events.PlayerMove = events.ExtractEvent(event)
                var user = game.actualWorld.users.get(pm.PlayerID)
                if (user == null){
                    user = new entity.User(pm.NewX, pm.NewY)
                }
                user.PossX = pm.NewX
                user.PossY = pm.NewY
                game.actualWorld.users.set(pm.PlayerID,user)
        }
        //pubsub.publish(event.Name,event)
    }
}