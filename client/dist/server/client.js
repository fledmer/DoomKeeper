import * as events from "../model/external_events.js";
import * as game from "../map.js";
import * as entity from "../model/entity.js";
export var currentServer;
export class ClientServer {
    serverURL;
    socket;
    user;
    constructor(serverURL) {
        this.serverURL = serverURL;
        currentServer = this;
    }
    Connect() {
        this.socket = new WebSocket(this.serverURL);
        this.socket.onmessage = (ev) => {
            this.OnMessage(ev);
        };
        this.socket.onerror = (ev) => {
            console.error("Get error from server: ", ev);
        };
        this.socket.onclose = (ev) => {
            console.info("server close the connection", ev);
        };
        this.socket.onopen = () => {
            this.user = new entity.User(game.actualWorld.x, game.actualWorld.y);
            var pcE = new events.PlayerConnect(this.user);
            this.socket.send(JSON.stringify(new events.ExternalEvent("player_connect", pcE)));
        };
    }
    Move(x, y) {
        var pm = new events.PlayerMove(this.user.PlayerID, x, y);
        var ee = new events.ExternalEvent("player_move", pm);
        this.socket.send(JSON.stringify(ee));
    }
    OnMessage(ev) {
        console.log("get event from server: ", ev);
        var event = JSON.parse(ev.data);
        console.log("parse event: ", event);
        switch (event.Name) {
            case "player_move":
                var pm = events.ExtractEvent(event);
                var user = game.actualWorld.users.get(pm.PlayerID);
                if (user == null) {
                    user = new entity.User(pm.NewX, pm.NewY);
                }
                user.PossX = pm.NewX;
                user.PossY = pm.NewY;
                game.actualWorld.users.set(pm.PlayerID, user);
        }
        //pubsub.publish(event.Name,event)
    }
}
//# sourceMappingURL=client.js.map