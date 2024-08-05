export class User{
    constructor(PossX: number, PossY: number){
        this.PlayerID = (Math.random() + 1).toString(36).substring(7);
        this.PossX = PossX
        this.PossY = PossY
    }

    PlayerID: string
    Nickname: string
    Color:    string
    PossX:    number
    PossY:    number
}