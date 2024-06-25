import { Ingrediente } from "../ingrediente/ingrediente";
import { User } from "../user/user";
import { UserRegister } from "../user/userRegister";

export class ListaSpesa {
    constructor(public id:number, public ingredienti:Array<Ingrediente>, public user:UserRegister) {}
}
