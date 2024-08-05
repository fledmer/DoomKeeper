export class ExternalEvent {
    Name;
    RawEvent;
    constructor(name, event) {
        this.Name = name;
        this.RawEvent = JSON.stringify(event);
    }
}
export function ExtractEvent(ee) {
    switch (ee.Name) {
        case "player_connect":
            var pcEvent = JSON.parse(ee.RawEvent);
            return pcEvent;
        case "player_move":
            var pmEvent = JSON.parse(ee.RawEvent);
            return pmEvent;
    }
    return null;
}
export class PlayerConnect {
    User;
    constructor(user) {
        this.User = user;
    }
}
export class PlayerMove {
    constructor(PlayerID, NewX, NewY) {
        this.PlayerID = PlayerID;
        this.NewX = NewX;
        this.NewY = NewY;
    }
    PlayerID;
    NewX;
    NewY;
}
//# sourceMappingURL=external_events.js.map