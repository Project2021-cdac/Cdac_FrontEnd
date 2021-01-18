
import { UserAccount } from "./User-Interface";

export interface Guide extends UserAccount{
    id:number;
    inSession:boolean;
    userAccount:number;
    technologies:Array<string>;
    

}