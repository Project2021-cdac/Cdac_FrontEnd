
import { IUserAccount } from "./User-Interface";

export interface IGuide extends IUserAccount{
    id:number;
    inSession:boolean;
    user:number;
    technologies:Array<string>;
    

}