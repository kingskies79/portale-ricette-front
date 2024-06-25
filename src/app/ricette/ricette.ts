import { Ingrediente } from "../ingrediente/ingrediente";
import { UserRegister } from "../user/userRegister";



export class Ricette {
    constructor(public id: number, public nome: string, public descrizione:string, public durata:number, public numeroIngredienti:number, public pubblica:boolean , public ingredienti:Array<Ingrediente>, public user:UserRegister) {}
}
