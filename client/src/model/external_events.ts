import * as entity from "./entity.js"

export class ExternalEvent{
    Name: string
    RawEvent: string
    constructor(name:  string, event: any){
        this.Name = name
        this.RawEvent = JSON.stringify(event)
    }
}

export function ExtractEvent(ee: ExternalEvent): any{
    switch (ee.Name){
        case "player_connect":
            var pcEvent:PlayerConnect = JSON.parse(ee.RawEvent)
            return pcEvent
        case "player_move":
            var pmEvent:PlayerMove = JSON.parse(ee.RawEvent)
            return pmEvent
    }
    return null
} 

export class PlayerConnect{
    User: entity.User
    constructor(user: entity.User){
        this.User = user
    }
}

export class PlayerMove{
    constructor(PlayerID: string, NewX: number, NewY: number){
        this.PlayerID = PlayerID
        this.NewX = NewX
        this.NewY = NewY
    }
    PlayerID: string
    NewX: number
    NewY: number
}