import { User } from '../model/entity';


export class UserController{
    user: User
    fov = 60
    angle = 0.0
    y = 1
    x = 1

    constructor(user: User){
        this.user = user
    }

    SetUser(user: User){
        this.user = user
    }
}