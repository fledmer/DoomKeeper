import pubsub from 'pubsub-js'
import * as event from "../model/external_events.js"

pubsub.subscribe

class ClientServer{
    serverURL: string
    socket: WebSocket

    constructor(serverURL: string){
        this.serverURL = serverURL
    }

    Connect(){
        this.socket.onmessage = this.OnMessage
        this.socket.onerror = (ev: Event) => {
            console.error("Get error from server: ", ev)
        }
        this.socket.onclose = (ev: Event) => {
            console.info("server close the connection", ev)
        }
    }

    OnMessage(ev: MessageEvent){
        console.log("get event from server: ", ev)
        var event:event.ExternalEvent = JSON.parse(ev.data)
        console.log("parse event: ", event)
        pubsub.publish(event.Name,event)
    }
}