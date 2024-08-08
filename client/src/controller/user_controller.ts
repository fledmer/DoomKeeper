import { User } from '../model/entity.js';


export class UserController{
    user: User

    constructor(user: User){
        this.user = user
    }

    SetUser(user: User){
        this.user = user
    }
}