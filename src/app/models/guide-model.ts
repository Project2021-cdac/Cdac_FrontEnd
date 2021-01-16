
import { UserAccount } from "./User-Interface";

export interface Guide extends UserAccount{
    id:number;
    inSession:boolean;
    user:number;
    technologies:Array<string>;
    

}