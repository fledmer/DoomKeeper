import * as entity from "./entity.js"

export class ExternalEvent{
    Name: string
    RawEvent: string

    ExtractEvent(): any{
        switch (this.Name){
            case "player_connect":
                var pcEvent:PlayerConnect = JSON.parse(this.RawEvent)
                return pcEvent
            case "player_move":
                var pmEvent:PlayerMove = JSON.parse(this.RawEvent)
                return pmEvent
        }
    } 
}

export class PlayerConnect{
    User: entity.User
}

export class PlayerMove{
    playerID: string
    new_x: number
    new_y: number
}