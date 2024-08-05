export class User {
    constructor(PossX, PossY) {
        this.PlayerID = (Math.random() + 1).toString(36).substring(7);
        this.PossX = PossX;
        this.PossY = PossY;
    }
    PlayerID;
    Nickname;
    Color;
    PossX;
    PossY;
}
//# sourceMappingURL=entity.js.map